import Queue from "bull";
import global from "../../global";
import {
  BULL_KEY,
  EVENT_NAME,
  NUMBER,
  REDIS_KEY,
  TABLE_STATE,
} from "../../constants";
import logger from "../../logger";
import Event from "../../eventEmitter";
import { turnTimerDelay } from "./turnDelayTimer";
import { Get, Set } from "../../redisOperation";
import { IChess } from "../../interface";

const startGameTimer = new Queue(BULL_KEY.START_GAME_QUEUE, {
  redis: global.redisData,
});

const startGameQueue = async (data: any) => {
  try {
    let options = {
      attempts: 1,
      delay: NUMBER.TEN * 1000,
      jobId: String(data.tableId),
      removeOnComplete: true,
    };

    await startGameTimer.add(data, options);
  } catch (err) {
    logger.error(`Error in startGameQueue ${err}`);
  }
};

startGameTimer.process(async (job: any) => {
  const { currentTurn, tableId } = job.data;
  const tableData: IChess = await Get(`${REDIS_KEY.TABLES}:${tableId}`);
  tableData.status = TABLE_STATE.GAME_STARTED;
  await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);
  let startedData = {
    eventName: EVENT_NAME.GAME_STARTED,
    data: { message: "Game Started" },
  };

  Event.sendToRoom(tableId, startedData);

  await turnTimerDelay({
    data: {
      nextTurn: currentTurn,
    },
    tableId,
  });
});

export { startGameQueue, startGameTimer };
