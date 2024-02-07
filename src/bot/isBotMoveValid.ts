import { IBoardObject, IChess } from "../interface";
import logger from "../logger";

const isBotMoveValid = (
  board: (IBoardObject | null)[],
  chooseTurnItem: IBoardObject
): boolean => {
  logger.error("==================isBotMoveValid=============");
  // console.log(board);
  // console.log("chooseTurnItem >>", chooseTurnItem);

  const cornerNumber = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56,
    57, 58, 59, 60, 61, 62, 63,
  ];

  if (chooseTurnItem.name.includes("BLACK_ROOK")) {
    if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) >= 0 &&
      Number(chooseTurnItem.id) <= 7
    ) {
      if (
        Number(chooseTurnItem.id) == 0 &&
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK")
      )
        return false;
      else if (
        Number(chooseTurnItem.id) == 7 &&
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK")
      )
        return false;
      else if (
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK")
      )
        return false;
    } else if (
      board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK")
    )
      return false;
  }

  if (chooseTurnItem.name.includes("BLACK_KNIGHT")) {
    if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) >= 0 &&
      Number(chooseTurnItem.id) <= 7
    ) {
      if (Number(chooseTurnItem.id) == 0) {
        if (
          board[Number(chooseTurnItem.id) + 10]?.name.includes("BLACK") &&
          board[Number(chooseTurnItem.id) + 17]?.name.includes("BLACK")
        ) {
          return false;
        }
      } else if (Number(chooseTurnItem.id) == 7) {
        if (
          board[Number(chooseTurnItem.id) + 6]?.name.includes("BLACK") &&
          board[Number(chooseTurnItem.id) + 15]?.name.includes("BLACK")
        ) {
          return false;
        }
      } else if (
        board[Number(chooseTurnItem.id) + 15]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 17]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 10]?.name.includes("BLACK")
      )
        return false;
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 == 0
    ) {
      if (
        board[Number(chooseTurnItem.id) + 17]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 10]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 6]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 15]?.name.includes("BLACK")
      )
        return false;
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 != 0
    ) {
      if (
        board[Number(chooseTurnItem.id) + 15]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 6]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 10]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 17]?.name.includes("BLACK")
      )
        return false;
    } else if (
      board[Number(chooseTurnItem.id) + 15]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 15]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 17]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 17]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 10]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 10]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 6]?.name.includes("BLACK")
    )
      return false;
  }

  if (chooseTurnItem.name.includes("BLACK_BISHOP")) {
    logger.error("=================BLACK_BISHOP MOVE %%%%%%%%%%%%%");
    if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) >= 0 &&
      Number(chooseTurnItem.id) <= 7
    ) {
      if (
        Number(chooseTurnItem.id) == 0 &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      } else if (
        Number(chooseTurnItem.id) == 7 &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK")
      ) {
        return false;
      } else if (
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 == 0 &&
      board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
    )
      return false;
    else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 != 0 &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK")
    )
      return false;
    else if (
      board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 9]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK")
    )
      return false;
  }

  if (chooseTurnItem.name.includes("BLACK_QUREEN")) {
    if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) >= 0 &&
      Number(chooseTurnItem.id) <= 7
    ) {
      if (
        Number(chooseTurnItem.id) == 0 &&
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      } else if (
        Number(chooseTurnItem.id) == 7 &&
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK")
      ) {
        return false;
      } else if (
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 == 0
    ) {
      if (
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 7]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 != 0
    ) {
      if (
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 9]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK")
      ) {
        return false;
      }
    } else if (
      board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 9]?.name.includes("BLACK")
    )
      return false;
  }

  if (chooseTurnItem.name.includes("BLACK_KING")) {
    if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) >= 0 &&
      Number(chooseTurnItem.id) <= 7
    ) {
      if (
        Number(chooseTurnItem.id) == 0 &&
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      } else if (
        Number(chooseTurnItem.id) == 7 &&
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK")
      ) {
        return false;
      } else if (
        board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
      ) {
        return false;
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 == 0 &&
      board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK")
    )
      return false;
    else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 != 0 &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 9]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK")
    )
      return false;
    else if (
      board[Number(chooseTurnItem.id) + 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) + 9]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 7]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 8]?.name.includes("BLACK") &&
      board[Number(chooseTurnItem.id) - 9]?.name.includes("BLACK")
    )
      return false;
  }

  if (chooseTurnItem.name.includes("BLACK_PAWN")) {
    if (board[Number(chooseTurnItem.id)]?.isFirstMove) {
      if (board[Number(chooseTurnItem.id) + 8] != null) return false;
      else if (
        board[Number(chooseTurnItem.id) + 8] == null &&
        board[Number(chooseTurnItem.id) + 16] != null
      )
        return false;
    }
    if (board[Number(chooseTurnItem.id) + 8] != null) return false;
  }

  return true;
};

export default isBotMoveValid;
