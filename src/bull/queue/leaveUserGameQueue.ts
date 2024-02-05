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
import { disconnect } from "../../playing";

const leaveUserGameTimer = new Queue(BULL_KEY.LEAVE_USER_GAME_QUEUE, {
  redis: global.redisData,
});

const leaveUserGameQueue = async (data: any) => {
  try {
    let options = {
      attempts: 1,
      delay: NUMBER.SIXTY * 1000,
      jobId: String(data.userId),
      removeOnComplete: true,
    };

    await leaveUserGameTimer.add(data, options);
  } catch (err) {
    logger.error(`Error in lockInGameStateQueue ${err}`);
  }
};

leaveUserGameTimer.process(async (job: any) => {
  const { tableId, userId } = job.data;
  const tableData: IChess = await Get(`${REDIS_KEY.TABLES}:${tableId}`);
  tableData.status = TABLE_STATE.GAME_WIN;

  await Set(`${REDIS_KEY.TABLES}:${tableData._id}`, tableData);
  logger.error("================== leaveUserGameTimer win");
  const winData = {
    eventName: EVENT_NAME.WIN,
    data: {
      winnerId:
        tableData.playerInfo[0]._id == userId
          ? tableData.playerInfo[1]._id
          : tableData.playerInfo[0]._id,
    },
  };

  Event.sendToRoom(tableData._id, winData);
  await disconnect(tableId);
});

export { leaveUserGameQueue, leaveUserGameTimer };
