import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { currentLine } from "../../utils";

const possibleRookKillMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  // FOR +1 KILL WHITE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 1] &&
    board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
  ) {
    return {
      move: 1,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 1] == null
  ) {
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 2] &&
      board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
    ) {
      return {
        move: 2,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 2] == null
    ) {
      if (
        currentLineBetween &&
        Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 3] &&
        board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
      ) {
        return {
          move: 3,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        currentLineBetween &&
        Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 3] == null
      ) {
        if (
          currentLineBetween &&
          Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 4] &&
          board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
        ) {
          return {
            move: 4,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          currentLineBetween &&
          Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 4] == null
        ) {
          if (
            currentLineBetween &&
            Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
            board[Number(chooseTurnItem.id) + 5] &&
            board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
          ) {
            return {
              move: 5,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            currentLineBetween &&
            Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
            board[Number(chooseTurnItem.id) + 5] == null
          ) {
            if (
              currentLineBetween &&
              Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
              board[Number(chooseTurnItem.id) + 6] &&
              board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
            ) {
              return {
                move: 6,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              currentLineBetween &&
              Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
              board[Number(chooseTurnItem.id) + 6] == null
            ) {
              if (
                currentLineBetween &&
                Number(chooseTurnItem.id) + 7 <= currentLineBetween[1] &&
                board[Number(chooseTurnItem.id) + 7] &&
                board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
              ) {
                return {
                  move: 7,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            }
          }
        }
      }
    }
  }

  // FOR +8 KILL WHITE
  else if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
  ) {
    return {
      move: 8,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8] == null
  ) {
    if (
      Number(chooseTurnItem.id) + 16 <= 63 &&
      board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
    ) {
      return {
        move: 16,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      Number(chooseTurnItem.id) + 16 <= 63 &&
      board[Number(chooseTurnItem.id) + 16] == null
    ) {
      if (
        Number(chooseTurnItem.id) + 24 <= 63 &&
        board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
      ) {
        return {
          move: 24,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        Number(chooseTurnItem.id) + 24 <= 63 &&
        board[Number(chooseTurnItem.id) + 24] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 32 <= 63 &&
          board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
        ) {
          return {
            move: 32,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) + 32 <= 63 &&
          board[Number(chooseTurnItem.id) + 32] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 40 <= 63 &&
            board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
          ) {
            return {
              move: 40,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            Number(chooseTurnItem.id) + 40 <= 63 &&
            board[Number(chooseTurnItem.id) + 40] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 48 <= 63 &&
              board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
            ) {
              return {
                move: 48,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              Number(chooseTurnItem.id) + 48 <= 63 &&
              board[Number(chooseTurnItem.id) + 48] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 56 <= 63 &&
                board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
              ) {
                return {
                  move: 56,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            }
          }
        }
      }
    }
  }

  // FOR -1 KILL WHITE
  else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 1] &&
    board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
  ) {
    return {
      move: -1,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 1] == null
  ) {
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 2] &&
      board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
    ) {
      return {
        move: -2,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 2] == null
    ) {
      if (
        currentLineBetween &&
        Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 3] &&
        board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
      ) {
        return {
          move: -3,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        currentLineBetween &&
        Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 3] == null
      ) {
        if (
          currentLineBetween &&
          Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 4] &&
          board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
        ) {
          return {
            move: -4,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          currentLineBetween &&
          Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 4] == null
        ) {
          if (
            currentLineBetween &&
            Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 5] &&
            board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
          ) {
            return {
              move: -5,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            currentLineBetween &&
            Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 5] == null
          ) {
            if (
              currentLineBetween &&
              Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) - 6] &&
              board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
            ) {
              return {
                move: -6,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              currentLineBetween &&
              Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) - 6] == null
            ) {
              if (
                currentLineBetween &&
                Number(chooseTurnItem.id) - 7 >= currentLineBetween[0] &&
                board[Number(chooseTurnItem.id) - 7] &&
                board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
              ) {
                return {
                  move: -7,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            }
          }
        }
      }
    }
  }

  // FOR KILL -8 WHITE
  else if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")
  ) {
    return {
      move: -8,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8] == null
  ) {
    if (
      Number(chooseTurnItem.id) - 16 >= 0 &&
      board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
    ) {
      return {
        move: -16,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      Number(chooseTurnItem.id) - 16 >= 0 &&
      board[Number(chooseTurnItem.id) - 16] == null
    ) {
      if (
        Number(chooseTurnItem.id) - 24 >= 0 &&
        board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
      ) {
        return {
          move: -24,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        Number(chooseTurnItem.id) - 24 >= 0 &&
        board[Number(chooseTurnItem.id) - 24] == null
      ) {
        if (
          Number(chooseTurnItem.id) - 32 >= 0 &&
          board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
        ) {
          return {
            move: -32,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) - 32 >= 0 &&
          board[Number(chooseTurnItem.id) - 32] == null
        ) {
          if (
            Number(chooseTurnItem.id) - 40 >= 0 &&
            board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
          ) {
            return {
              move: -40,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            Number(chooseTurnItem.id) - 40 >= 0 &&
            board[Number(chooseTurnItem.id) - 40] == null
          ) {
            if (
              Number(chooseTurnItem.id) - 48 >= 0 &&
              board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
            ) {
              return {
                move: -48,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              Number(chooseTurnItem.id) - 48 >= 0 &&
              board[Number(chooseTurnItem.id) - 48] == null
            ) {
              if (
                Number(chooseTurnItem.id) - 56 >= 0 &&
                board[Number(chooseTurnItem.id) - 56]?.name.includes("WHITE")
              ) {
                return {
                  move: -56,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            }
          }
        }
      }
    }
  }

  logger.error("===================ROOK NOT KILL WHITE===========");
};
export default possibleRookKillMove;
