import { IBoardObject, IChess } from "../../interface";
import { currentLine } from "../../utils";

const possibleKingKillMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  // FOR KILL WHITE TO +1 AND -1 MOVE
  if (currentLineBetween) {
    // KILL +1 MOVE
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
    ) {
      return {
        move: 1,
        chooseTurnItemId: chooseTurnItem,
      };
    }

    // KILL -1 MOVE
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
    ) {
      return {
        move: -1,
        chooseTurnItemId: chooseTurnItem,
      };
    }
  }

  // FOR KILL +7
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
  ) {
    return {
      move: 7,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL -7
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
  ) {
    return {
      move: -7,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL +8
  if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
  ) {
    return {
      move: 8,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL -8
  if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")
  ) {
    return {
      move: -8,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL +9
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
  ) {
    return {
      move: 9,
      chooseTurnItemId: chooseTurnItem,
    };
  }

  // FOR KILL -9
  if (
    Number(chooseTurnItem.id) - 9 >= 63 &&
    board[Number(chooseTurnItem.id) - 9]?.name.includes("WHITE")
  ) {
    return {
      move: -9,
      chooseTurnItemId: chooseTurnItem,
    };
  }
};

export default possibleKingKillMove;
