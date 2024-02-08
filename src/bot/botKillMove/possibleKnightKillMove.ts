import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, currentLine } from "../../utils";

const possibleKnightKillMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  // FOR KILL WHITE 15 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 15 <= 63 &&
    Number(chooseTurnItem.id) + 15 > currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
  ) {
    return {
      move: 15,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE 6 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 6 <= 63 &&
    Number(chooseTurnItem.id) + 6 > currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
  ) {
    return {
      move: 6,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE 10 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 10 <= 63 &&
    Number(chooseTurnItem.id) + 10 <= currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")
  ) {
    return {
      move: 10,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE 17 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 17 <= 63 &&
    Number(chooseTurnItem.id) + 17 <= currentLineBetween[1] + 16 &&
    board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
  ) {
    return {
      move: 17,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE -15 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 15 >= 0 &&
    Number(chooseTurnItem.id) - 15 < currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 15]?.name.includes("WHITE")
  ) {
    return {
      move: -15,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE -6 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 6 >= 0 &&
    Number(chooseTurnItem.id) - 6 < currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
  ) {
    return {
      move: -6,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE -10 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 10 >= 0 &&
    Number(chooseTurnItem.id) - 10 >= currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 10]?.name.includes("WHITE")
  ) {
    return {
      move: -10,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL WHITE -17 MOVE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 17 >= 0 &&
    Number(chooseTurnItem.id) - 17 >= currentLineBetween[0] - 16 &&
    board[Number(chooseTurnItem.id) - 17]?.name.includes("WHITE")
  ) {
    return {
      move: -17,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  logger.error("===================KNIGHT NOT KILL WHITE===========");
};
export default possibleKnightKillMove;
