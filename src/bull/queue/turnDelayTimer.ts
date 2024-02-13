import Queue from "bull";
import { BULL_KEY } from "../../constants";
import logger from "../../logger";
import global from "../../global";
import turnDelayProcess from "../process/turnDelayProcess";

let turnTimer = new Queue(BULL_KEY.TURN_DELAY_QUEUE, {
  redis: global.redisData,
});

const turnTimerDelay = async (data: any) => {
  console.log("USER TIMER DELAY");
  console.log("data JOBID >>", data.data);

  try {
    let options = {
      attempts: 1,
      delay: 10000,
      jobId: String(data.data.nextTurn),
      removeOnComplete: true,
    };

    await turnTimer.add(data, options);
  } catch (error) {
    logger.error(`CATCH ERROR in turnTimerDelay : ${error}`);
  }
};

turnTimer.process(async (job: any) => {
  console.log("JOB DATA >>>>");
  console.log(job);
  await turnDelayProcess(job);
});

export { turnTimerDelay, turnTimer };
