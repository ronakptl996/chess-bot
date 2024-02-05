import logger from "../logger";

const remainTimeCalculation = async (Job: any) => {
  try {
    if (!Job) {
      return 0;
    }
    logger.error(">>>>>>>>>>>======JOB TIMESTAMP");
    console.log(Job.timestamp);

    const RemainingTime: number = (Date.now() - Job.timestamp) / 1000;

    const FixedRemainingTime: number = Number(RemainingTime.toFixed(0));

    const JobDelayTimer: number = Job?.opts?.delay ? Job.opts.delay : 1;

    const JobDelayTimerInSecond: number = JobDelayTimer / 1000;

    const FixedJobDelayTimer: number = Number(JobDelayTimerInSecond.toFixed(0));

    const FinalRemainingTime: number =
      FixedJobDelayTimer - FixedRemainingTime * 1;

    const FixedFinalRemainingTime: number = Number(
      FinalRemainingTime.toFixed(0)
    );

    if (FixedFinalRemainingTime < 0) {
      return 0;
    }

    return FixedFinalRemainingTime;
  } catch (error: any) {
    logger.error(`Error in RemainTimeCalculation: ${error}`);
  }
};

const cornerNumber = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 57,
  58, 59, 60, 61, 62, 63,
];

const makeBotBoard = (board: any, chooseTurnItem: any, move: number) => {
  board[Number(chooseTurnItem.id)] = null;
  board[Number(chooseTurnItem.id) + move] = null;
  board[Number(chooseTurnItem.id) + move] = {
    id: Number(chooseTurnItem.id) + move,
    name: chooseTurnItem.name,
    isFirstMove: chooseTurnItem.isFirstMove,
  };

  return board;
};

export { remainTimeCalculation, cornerNumber, makeBotBoard };
