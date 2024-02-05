import Queue from "bull";
import { BULL_KEY } from "../../constants";
import logger from "../../logger";
import global from "../../global";
import turnDelayProcess from "../process/turnDelayProcess";
import botTurn from "../../bot/botTurn";

let botTurnTimer = new Queue(BULL_KEY.BOT_TURN_TIMER, {
  redis: global.redisData,
});

const botTurnTimerQueue = async (data: any) => {
  try {
    let options = {
      attempts: 1,
      delay: 2000,
      jobId: String(data.tableId),
      removeOnComplete: true,
    };

    await botTurnTimer.add(data, options);
  } catch (error) {
    logger.error(`CATCH ERROR in botTurnTimerQueue : ${error}`);
  }
};

botTurnTimer.process(async (job: any) => {
  await botTurn(job.data.tableId);
});

export { botTurnTimerQueue, botTurnTimer };
