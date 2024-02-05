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
import { Get, Set } from "../../redisOperation";
import { IChess } from "../../interface";

const lockInGameStateTimer = new Queue(BULL_KEY.LOCK_IN_GAME_QUEUE, {
  redis: global.redisData,
});

const lockInGameStateQueue = async (data: any) => {
  try {
    let options = {
      attempts: 1,
      delay: NUMBER.FIVE * 1000,
      jobId: String(data.tableId),
      removeOnComplete: true,
    };

    await lockInGameStateTimer.add(data, options);
  } catch (err) {
    logger.error(`Error in lockInGameStateQueue ${err}`);
  }
};

lockInGameStateTimer.process(async (job: any) => {
  const { tableId } = job.data;
  const tableData: IChess = await Get(`${REDIS_KEY.TABLES}:${tableId}`);
  tableData.status = TABLE_STATE.LOCK_IN_STATE;
  await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);

  let lockInData = {
    eventName: EVENT_NAME.EVENT_LOCK_IN,
    data: { message: true },
  };

  Event.sendToRoom(tableId, lockInData);
});

export { lockInGameStateTimer, lockInGameStateQueue };
