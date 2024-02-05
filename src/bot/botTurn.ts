import { REDIS_KEY } from "../constants";
import { IChess } from "../interface";
import logger from "../logger";
import { Get } from "../redisOperation";
import botPossibleMove from "./botPossibleMove";

const botTurn = async (tableId: string) => {
  logger.error("========================BOT TURN-======================");
  const tableData: IChess = await Get(`${REDIS_KEY.TABLES}:${tableId}`);

  const board = tableData.board;

  // board.forEach((el: { id: String; name: String; isFirstMove: boolean }) => {
  //   console.log(el);
  // });

  // Random Move
  await botPossibleMove(tableData);
};

export default botTurn;
