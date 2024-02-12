import { IBoardObject, IChess } from "../interface";
import { currentLine } from "../utils";

const botCheckMateMoveForKing = (
  tableData: IChess,
  checkForKing: {
    move: number;
    chooseTurnItemId: IBoardObject;
    kill: boolean;
  }
) => {
  const chooseTurnItem = checkForKing.chooseTurnItemId;
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  if (checkForKing.move % 7 == 0) {
    if (
      Number(chooseTurnItem.id) + 8 <= 63 &&
      board[Number(chooseTurnItem.id) + 8] == null
    ) {
      return {
        move: 8,
      };
    }
    if (
      Number(chooseTurnItem.id) - 8 >= 0 &&
      board[Number(chooseTurnItem.id) - 8] == null
    ) {
      return {
        move: -8,
      };
    }
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      currentLineBetween &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      return {
        move: 1,
      };
    }
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      currentLineBetween &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1] == null
    ) {
      return {
        move: 1,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
      Number(chooseTurnItem.id) + 9 <= 63 &&
      board[Number(chooseTurnItem.id) + 9] == null
    ) {
      return {
        move: 9,
      };
    }
  }

  if (checkForKing.move % 8 == 0) {
    if (checkForKing.move == 16) {
      if (
        currentLineBetween &&
        Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
        Number(chooseTurnItem.id) - 7 >= 0 &&
        board[Number(chooseTurnItem.id) - 7] == null
      ) {
        return {
          move: -7,
        };
      }
      if (
        Number(chooseTurnItem.id) + 1 <= 63 &&
        currentLineBetween &&
        Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 1] == null
      ) {
        return {
          move: 1,
        };
      }
      if (
        Number(chooseTurnItem.id) - 1 >= 0 &&
        currentLineBetween &&
        Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 1] == null
      ) {
        return {
          move: 1,
        };
      }
      if (
        currentLineBetween &&
        Number(chooseTurnItem.id) - 9 <= currentLineBetween[0] - 8 &&
        Number(chooseTurnItem.id) - 9 >= 0 &&
        board[Number(chooseTurnItem.id) - 9] == null
      ) {
        return {
          move: -9,
        };
      }
    }

    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      currentLineBetween &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      return {
        move: 1,
      };
    }
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      currentLineBetween &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1] == null
    ) {
      return {
        move: 1,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
      Number(chooseTurnItem.id) + 9 <= 63 &&
      board[Number(chooseTurnItem.id) + 9] == null
    ) {
      return {
        move: 9,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
      Number(chooseTurnItem.id) - 7 >= 0 &&
      board[Number(chooseTurnItem.id) - 7] == null
    ) {
      return {
        move: -7,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 9 <= currentLineBetween[0] - 8 &&
      Number(chooseTurnItem.id) - 9 >= 0 &&
      board[Number(chooseTurnItem.id) - 9] == null
    ) {
      return {
        move: -9,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
      Number(chooseTurnItem.id) + 7 <= 63 &&
      board[Number(chooseTurnItem.id) + 7] == null
    ) {
      return {
        move: 7,
      };
    }
  }

  if (checkForKing.move % 9 == 0) {
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      currentLineBetween &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      return {
        move: 1,
      };
    }
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      currentLineBetween &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1] == null
    ) {
      return {
        move: 1,
      };
    }
    if (
      Number(chooseTurnItem.id) + 8 <= 63 &&
      board[Number(chooseTurnItem.id) + 8] == null
    ) {
      return {
        move: 8,
      };
    }
    if (
      Number(chooseTurnItem.id) - 8 >= 0 &&
      board[Number(chooseTurnItem.id) - 8] == null
    ) {
      return {
        move: -8,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
      Number(chooseTurnItem.id) - 7 >= 0 &&
      board[Number(chooseTurnItem.id) - 7] == null
    ) {
      return {
        move: -7,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
      Number(chooseTurnItem.id) + 7 <= 63 &&
      board[Number(chooseTurnItem.id) + 7] == null
    ) {
      return {
        move: 7,
      };
    }
  }

  if (
    currentLineBetween &&
    checkForKing.move >= currentLineBetween[0] &&
    checkForKing.move <= currentLineBetween[1]
  ) {
    if (
      Number(chooseTurnItem.id) + 8 <= 63 &&
      board[Number(chooseTurnItem.id) + 8] == null
    ) {
      return {
        move: 8,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
      Number(chooseTurnItem.id) + 9 <= 63 &&
      board[Number(chooseTurnItem.id) + 9] == null
    ) {
      return {
        move: 9,
      };
    }
    if (
      Number(chooseTurnItem.id) - 8 >= 0 &&
      board[Number(chooseTurnItem.id) - 8] == null
    ) {
      return {
        move: -8,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 9 <= currentLineBetween[0] - 8 &&
      Number(chooseTurnItem.id) - 9 >= 0 &&
      board[Number(chooseTurnItem.id) - 9] == null
    ) {
      return {
        move: -9,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
      Number(chooseTurnItem.id) + 7 <= 63 &&
      board[Number(chooseTurnItem.id) + 7] == null
    ) {
      return {
        move: 7,
      };
    }
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
      Number(chooseTurnItem.id) - 7 >= 0 &&
      board[Number(chooseTurnItem.id) - 7] == null
    ) {
      return {
        move: -7,
      };
    }
  }

  // RANDOM TURN FOR CHECKMATE
  if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8] == null
  ) {
    return {
      move: 8,
    };
  }
  if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8] == null
  ) {
    return {
      move: -8,
    };
  }
  if (
    Number(chooseTurnItem.id) + 1 <= 63 &&
    currentLineBetween &&
    Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 1] == null
  ) {
    return {
      move: 1,
    };
  }
  if (
    Number(chooseTurnItem.id) - 1 >= 0 &&
    currentLineBetween &&
    Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 1] == null
  ) {
    return {
      move: 1,
    };
  }
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9] == null
  ) {
    return {
      move: 9,
    };
  }
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 9 <= currentLineBetween[0] - 8 &&
    Number(chooseTurnItem.id) - 9 >= 0 &&
    board[Number(chooseTurnItem.id) - 9] == null
  ) {
    return {
      move: -9,
    };
  }
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7] == null
  ) {
    return {
      move: 7,
    };
  }
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7] == null
  ) {
    return {
      move: -7,
    };
  }
};

export default botCheckMateMoveForKing;
