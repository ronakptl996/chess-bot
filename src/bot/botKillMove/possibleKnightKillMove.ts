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

  // FOR CORNER NUMBER ID
  if (cornerNumber.includes(Number(chooseTurnItem.id))) {
    // FOR INDEX 0 to 7
    if (Number(chooseTurnItem.id) >= 0 && Number(chooseTurnItem.id) <= 7) {
      // FOR 0
      if (Number(chooseTurnItem.id) == 0) {
        // TO UPWARD
        if (board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")) {
          return {
            move: 10,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
        ) {
          return {
            move: 17,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      }

      // FOR 7
      else if (Number(chooseTurnItem.id) == 7) {
        // TO UPWARD
        if (
          Number(chooseTurnItem.id) + 6 <= 63 &&
          board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
        ) {
          return {
            move: 6,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) + 15 <= 63 &&
          board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
        ) {
          return {
            move: 15,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      }

      // For 1
      else if (Number(chooseTurnItem.id) == 1) {
        // TO UPWARD
        if (
          Number(chooseTurnItem.id) + 10 <= 63 &&
          board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")
        ) {
          return {
            move: 10,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) + 15 <= 63 &&
          board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
        ) {
          return {
            move: 15,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) + 17 <= 63 &&
          board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
        ) {
          return {
            move: 17,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      }

      // For 2 to 6
      else {
        // TO UPWARD
        if (
          Number(chooseTurnItem.id) + 10 <= 63 &&
          Number(chooseTurnItem.id) != 6 &&
          board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")
        ) {
          return {
            move: 10,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          currentLineBetween &&
          Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
        ) {
          return {
            move: 6,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
        ) {
          return {
            move: 15,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
        ) {
          return {
            move: 17,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      }
    }

    // FOR ID % 2 == 0
    else if (Number(chooseTurnItem.id) % 2 == 0) {
      if (board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")) {
        return {
          move: 10,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")
      ) {
        return {
          move: 17,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        currentLineBetween &&
        Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
      ) {
        return {
          move: -6,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        board[Number(chooseTurnItem.id) - 15]?.name.includes("WHITE")
      ) {
        return {
          move: -15,
          chooseTurnItemId: chooseTurnItem,
        };
      }
    }

    // FOR ID % 2 != 0
    else if (Number(chooseTurnItem.id) % 2 != 0) {
      if (
        Number(chooseTurnItem.id) - 17 >= 0 &&
        board[Number(chooseTurnItem.id) - 17]?.name.includes("WHITE")
      ) {
        return {
          move: -17,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        board[Number(chooseTurnItem.id) - 10]?.name.includes("WHITE")
      ) {
        return {
          move: -10,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        currentLineBetween &&
        Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
      ) {
        return {
          move: 6,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")
      ) {
        return {
          move: 15,
          chooseTurnItemId: chooseTurnItem,
        };
      }
    }
  }

  // WITHOUT CORNER NUMBER ID
  else {
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 10 >= currentLineBetween[0] - 8 &&
      board[Number(chooseTurnItem.id) - 10]?.name.includes("WHITE")
    ) {
      return {
        move: -10,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (board[Number(chooseTurnItem.id) - 15]?.name.includes("WHITE")) {
      return {
        move: -15,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (board[Number(chooseTurnItem.id) - 17]?.name.includes("WHITE")) {
      return {
        move: -17,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 10 <= currentLineBetween[1] + 8 &&
      board[Number(chooseTurnItem.id) + 10]?.name.includes("WHITE")
    ) {
      return {
        move: 10,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (board[Number(chooseTurnItem.id) + 15]?.name.includes("WHITE")) {
      return {
        move: 15,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (board[Number(chooseTurnItem.id) + 17]?.name.includes("WHITE")) {
      return {
        move: 17,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
    ) {
      return {
        move: 6,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
    ) {
      return {
        move: -6,
        chooseTurnItemId: chooseTurnItem,
      };
    }
  }

  logger.error("===================KNIGHT NOT KILL WHITE===========");
};
export default possibleKnightKillMove;
