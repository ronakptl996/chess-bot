import { EVENT_NAME, REDIS_KEY, TABLE_STATE } from "../constants";
import logger from "../logger";
import { Get, Set } from "../redisOperation";
import Events from "../eventEmitter";
import { IMoveBoard, IChess } from "../interface";
import moveValidate from "../validation/requestValidation/moveReqVal";
import moveRoomValidate from "../validation/responseValidation/moveResVal";
import { turnTimerDelay, turnTimer } from "../bull/queue/turnDelayTimer";
import botTurn from "../bot/botTurn";
import { botTurnTimerQueue } from "../bull/queue/botTurnTimer";

const movePieces = async (data: IMoveBoard, socket: any) => {
  console.log("movePiece tableId", socket.tableId);
  console.log("movePiece userId", socket.userId);

  // let lock = await global.lock.acquire([socket.tableId], 12000);
  try {
    if (socket.userId) {
      const job = await turnTimer.getJob(socket.userId);
      console.log(job);

      if (job) {
        await job.remove();
      }
    }

    data = await moveValidate(data);
    if (data) {
      let chessBoard: IChess = await Get(
        `${REDIS_KEY.TABLES}:${socket.tableId}`
      );
      let nextTurn: null | string = null;

      chessBoard.playerInfo.forEach((element: any) => {
        if (chessBoard.currentTurn !== element._id.toString()) {
          nextTurn = element._id;
          data.pieceColor = element.pieceColor;
        }
      });

      chessBoard.currentTurn = nextTurn;
      chessBoard.status = TABLE_STATE.CHOOSE_FIRST_TURN;
      chessBoard.pieceColor = data.pieceColor;
      await Set(`${REDIS_KEY.TABLES}:${socket.tableId}`, chessBoard);

      data.nextTurn = nextTurn;
      data.turnMessage =
        data.pieceColor == "white"
          ? `${chessBoard.playerInfo[0].playername} Turn`
          : `${chessBoard.playerInfo[1].playername} Turn`;

      let moveData = { eventName: EVENT_NAME.MOVE_PIECES, data: data };
      // console.log("moveData ::>", moveData);
      moveData = await moveRoomValidate(moveData);
      if (moveData) {
        Events.sendToRoom(socket.tableId, moveData);

        let isBot: boolean = false;
        chessBoard.playerInfo.forEach((el: any) => {
          if (el._id == chessBoard.currentTurn) {
            isBot = el.isBot;
          }
        });

        if (isBot) {
          // await botTurn(chessBoard._id);
          logger.error("==================== ISBOT =====================");
          console.log(isBot);
          await botTurnTimerQueue({ tableId: chessBoard._id });
        }
        // Timer Turn Bull
        // await turnTimerDelay({
        //   data: data,
        //   tableId: socket.tableId,
        // });
      } else {
        let errorMessage = "Move Invalid!!";

        Events.sendToSocket(socket.id, {
          eventName: EVENT_NAME.ERROR,
          data: { errorMessage },
        });
      }
    } else {
      let errorMessage = "Move Invalid!!";

      Events.sendToSocket(socket.id, {
        eventName: EVENT_NAME.ERROR,
        data: { errorMessage },
      });
    }
  } catch (error: any) {
    logger.error("CATCH_ERROR in movePieces : ", error);
  } finally {
    // try {
    //   if (lock) {
    //     await lock.release();
    //     logger.info("piece move successfully.");
    //   }
    // } catch (error) {
    //   logger.error("CATCH_ERROR in movePiece validation : ", error);
    // }
  }
};

export default movePieces;
