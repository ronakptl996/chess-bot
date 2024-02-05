import { EVENT_NAME, NUMBER, REDIS_KEY, TABLE_STATE } from "../constants";
import {
  gameTableDefaultFormat,
  userProfileDefaultFormat,
} from "../defaultFormat";
import {
  roomValidate,
  socketValidate,
} from "../validation/responseValidation/joinResVal";
import { Get, Set } from "../redisOperation";
import { IUser, IChess, IJoinUser, JoinData } from "../interface";
import { joinValidate } from "../validation/requestValidation";
import logger from "../logger";
import Events from "../eventEmitter";
import global from "../global";
import disconnect from "./disconnect";
import { startGameQueue } from "../bull/queue/startGameQueue";
import { lockInGameStateQueue } from "../bull/queue/lockInGameStateQueue";
import { leaveUserGameTimer } from "../bull/queue/leaveUserGameQueue";
import { turnTimer } from "../bull/queue/turnDelayTimer";
import { remainTimeCalculation } from "../utils";
import botSignUp from "../bot/botSignUp";

const joinTable = async (data: JoinData, socket: any) => {
  if (data.tableId && data.userId) {
    let tableData = await Get(`${REDIS_KEY.TABLES}:${data.tableId}`);

    if (tableData && tableData.activePlayer != 2) {
      disconnect(tableData._id);
      Events.sendToSocket(data.userId, {
        eventName: EVENT_NAME.LEAVE_TABLE,
        data: {
          messsage: "You left the table",
        },
      });
      return;
    } else {
      // console.log(data);
      const leaveUserJob = await leaveUserGameTimer.getJob(data.userId);
      logger.error("REJOINB --==========");
      // console.log(tableData);

      let user1 = tableData?.playerInfo[0]._id;
      let user2 = tableData?.playerInfo[1]._id;
      let remainTime: number | undefined;
      const turnTimerJob1 = await turnTimer.getJob(user1);
      if (turnTimerJob1) {
        remainTime = await remainTimeCalculation(turnTimerJob1);
      } else {
        const turnTimerJob2 = await turnTimer.getJob(user2);
        if (turnTimerJob2) {
          remainTime = await remainTimeCalculation(turnTimerJob2);
        }
      }

      if (leaveUserJob) {
        await leaveUserJob.remove();
        socket.join(data.tableId);
        socket.tableId = data.tableId;
        socket.userId = data.userId;
        let updateData = {
          eventName: EVENT_NAME.REJOIN,
          data: { tableData, remainTime },
        };
        if (tableData) {
          Events.sendToSocket(socket.id, updateData);
        }
      }
    }
  } else {
    let lock = await global.lock.acquire([data], 12000);
    try {
      let validateJoinData = await joinValidate(data);
      logger.info(`join data============ ${JSON.stringify(data)}`);
      if (validateJoinData) {
        let userDefault: IUser = await userProfileDefaultFormat(
          validateJoinData
        );
        await Set(`${REDIS_KEY.PLAYERS}:${userDefault._id}`, userDefault);

        // socket.userId = userDefault._id;
        let getData = await Get(`${REDIS_KEY.PLAYERS}:${userDefault._id}`);

        let tableIdsQueue: any = await Get(`${REDIS_KEY.QUEUE}`);

        let newTable = false;
        if (tableIdsQueue && tableIdsQueue.tableIds.length > 0) {
          let board: any = await Get(
            `${REDIS_KEY.TABLES}:${
              tableIdsQueue.tableIds[tableIdsQueue.tableIds.length - 1]
            }`
          );

          if (board.activePlayer === 2) {
            newTable = true;
          }
        }

        if (
          tableIdsQueue &&
          tableIdsQueue.tableIds.length > 0 &&
          newTable === false
        ) {
          logger.error("^^^^ Condition FOr SECOND USER ^^^^^^");
          let board: any = await Get(
            `${REDIS_KEY.TABLES}:${
              tableIdsQueue.tableIds[tableIdsQueue.tableIds.length - 1]
            }`
          );
          // socket.tableId = board._id;
          board.playerInfo.push(getData);
          board.activePlayer = 2;
          board.status = TABLE_STATE.ROUND_TIMER_START;
          board.currentTurn = board.playerInfo[0]._id;
          getData.pieceColor = "black";

          await Set(`${REDIS_KEY.TABLES}:${board._id}`, board);
          let chessBoard: IChess = await Get(
            `${REDIS_KEY.TABLES}:${board._id}`
          );

          // socket.join(chessBoard._id);
          let validateData: any = {
            eventName: EVENT_NAME.JOIN,
            data: {
              playerInfo: chessBoard.playerInfo,
              board: chessBoard.board,
              pieceColor: getData.pieceColor,
              tableId: chessBoard._id,
            },
          };
          validateData = await socketValidate(validateData);

          if (validateData) {
            Events.sendToSocket(socket.id, validateData);
          } else {
            logger.info("please send proper data");
          }

          let turnMessage =
            getData.pieceColor == "white"
              ? `${chessBoard.playerInfo[1].playername} Turn`
              : `${chessBoard.playerInfo[0].playername} Turn`;

          let roomValidateData = {
            eventName: EVENT_NAME.START,
            data: {
              currentturn: board.playerInfo[0]._id,
              pieceColor: board.playerInfo[0].pieceColor,
              turnMessage,
              tableId: chessBoard._id,
              roundTimer: NUMBER.TEN,
            },
          };

          roomValidateData = await roomValidate(roomValidateData);

          if (roomValidateData) {
            Events.sendToRoom(chessBoard._id, roomValidateData);
            await lockInGameStateQueue({
              tableId: roomValidateData.data.tableId,
            });
            await startGameQueue({
              currentTurn: roomValidateData.data.currentturn,
              tableId: roomValidateData.data.tableId,
            });
          } else {
            let errorMessage = "Enter proper data";

            Events.sendToSocket(socket.id, {
              eventName: EVENT_NAME.ERROR,
              data: { errorMessage },
            });
          }
        } else {
          logger.error("^^^^ Condition FOr FIRST USER ^^^^^^");
          getData.pieceColor = "white";
          let gameTableFormat: IChess = await gameTableDefaultFormat(getData);

          gameTableFormat.status = TABLE_STATE.WAITING_FOR_PLAYER;
          socket.tableId = gameTableFormat._id;
          await Set(
            `${REDIS_KEY.TABLES}:${gameTableFormat._id}`,
            gameTableFormat
          );

          let chessBoard: IChess = await Get(
            `${REDIS_KEY.TABLES}:${gameTableFormat._id}`
          );
          let tableIdsQueue: any = await Get(`${REDIS_KEY.QUEUE}`);
          console.log(
            "^^^^ Condition FOr FIRST USER ^^^^^^ tableIdsQueue",
            tableIdsQueue
          );

          if (!tableIdsQueue) {
            let queue = await Set(REDIS_KEY.QUEUE, {
              tableIds: [chessBoard._id],
            });
            queue = await Get(REDIS_KEY.QUEUE);
            // await Set(REDIS_KEY.QUEUE, tableIdsQueue);
          } else {
            tableIdsQueue.tableIds.push(chessBoard._id);
            await Set(REDIS_KEY.QUEUE, tableIdsQueue);
          }

          socket.join(chessBoard._id);
          let joinResData = {
            eventName: EVENT_NAME.JOIN,
            data: {
              playerInfo: chessBoard.playerInfo,
              board: chessBoard.board,
              pieceColor: getData.pieceColor,
              tableId: chessBoard._id,
            },
          };
          joinResData = await socketValidate(joinResData);
          if (joinResData) {
            Events.sendToSocket(socket.id, joinResData);
          }

          // BOT SignUp
          if (chessBoard.maxPlayer != chessBoard.activePlayer) {
            await botSignUp();
          }
        }
      } else {
        logger.error("Error");
        let errorMessage = "Enter proper data";

        Events.sendToSocket(socket.id, {
          eventName: EVENT_NAME.ERROR,
          data: { errorMessage },
        });
      }
    } catch (error) {
      logger.error("CATCH ERROR in joinTable: ", error);
    } finally {
      try {
        if (lock) {
          await lock.release();
        }
      } catch (err) {
        logger.error("CATCH_ERROR in release lock: ", err);
      }
    }
  }
};

export default joinTable;
