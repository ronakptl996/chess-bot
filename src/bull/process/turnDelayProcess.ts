import { EVENT_NAME, REDIS_KEY } from "../../constants";
import { IUser } from "../../interface";
import Event from "../../eventEmitter";
import { Get, Set } from "../../redisOperation";
import { disconnect } from "../../playing";
import { turnTimerDelay } from "../queue/turnDelayTimer";
import logger from "../../logger";
import { botTurnTimerQueue } from "../queue/botTurnTimer";

const turnDelayProcess = async (job: any) => {
  let userTurnData = await Get(
    `${REDIS_KEY.PLAYERS}:${job.data.data.nextTurn}`
  );

  let tableData = await Get(`${REDIS_KEY.TABLES}:${job.data.tableId}`);
  let currentTurn;
  let playerName;

  logger.info("=============turnDelayProcess TABLEDATA");
  console.log(tableData);

  if (userTurnData.missTurn < 3) {
    userTurnData.missTurn++;
    await Set(`${REDIS_KEY.PLAYERS}:${userTurnData._id}`, userTurnData);

    tableData.playerInfo.forEach((user: IUser) => {
      if (user._id == job.data.data.nextTurn) {
        if (user.missTurn) {
          user.missTurn++;
        }
      } else {
        currentTurn = user._id;
        tableData.pieceColor = user.pieceColor;
        playerName = user.playername;
      }
    });

    tableData.currentTurn = currentTurn;
    await Set(`${REDIS_KEY.TABLES}:${job.data.tableId}`, tableData);
    console.log("UPDATED TABLE DATA >>", tableData);

    if (playerName == "Bot") {
      logger.info("====================BOT TIMER START");
      // await botTurn(tableData._id);
      await botTurnTimerQueue({ tableId: tableData._id });
    }

    let sendData = {
      emptyBox: job.data.data.emptyBox,
      pieceId: undefined,
      selectChessItem: { indexofChesscheck: undefined },
      number: undefined,
      killPieceId: undefined,
      className: undefined,
      pieceColor: tableData.pieceColor,
      nextTurn: tableData.currentTurn,
      turnMessage: `${playerName} Turn`,
      timer: 10000,
    };

    let updateData = {
      eventName: EVENT_NAME.MOVE_PIECES,
      data: sendData,
    };

    Event.sendToRoom(tableData._id, updateData);

    await turnTimerDelay({
      data: {
        nextTurn: sendData.nextTurn,
      },
      tableId: tableData._id,
    });
  } else {
    let winnerId;
    tableData.playerInfo.filter((user: IUser) => {
      if (user._id != job.data.data.nextTurn) {
        winnerId = user._id;
      }
    });

    let winData = {
      eventName: EVENT_NAME.WIN,
      data: {
        winnerId,
      },
    };
    logger.error("================== turnDelay win");
    Event.sendToRoom(tableData._id, winData);
    disconnect(tableData._id);
  }
};

export default turnDelayProcess;
