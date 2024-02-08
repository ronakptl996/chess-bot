import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { currentLine } from "../../utils";

const possiblePawnKillMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 7] &&
    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
  ) {
    return {
      move: 7,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    board[Number(chooseTurnItem.id) + 9] &&
    board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
  ) {
    return {
      move: 9,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  logger.error("===================PAWN NOT KILL WHITE===========");
};

export default possiblePawnKillMove;
