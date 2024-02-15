import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, currentLine } from "../../utils";

const possibleBishopkillMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  // FOR KILL WHITE TO +7 MOVE
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
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) + 7)
  ) {
    if (
      Number(chooseTurnItem.id) + 14 <= 63 &&
      board[Number(chooseTurnItem.id) + 14]?.name.includes("WHITE")
    ) {
      return {
        move: 14,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      Number(chooseTurnItem.id) + 14 <= 63 &&
      board[Number(chooseTurnItem.id) + 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 14)
    ) {
      if (
        Number(chooseTurnItem.id) + 21 <= 63 &&
        board[Number(chooseTurnItem.id) + 21]?.name.includes("WHITE")
      ) {
        return {
          move: 21,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        Number(chooseTurnItem.id) + 21 <= 63 &&
        board[Number(chooseTurnItem.id) + 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 21)
      ) {
        if (
          Number(chooseTurnItem.id) + 28 <= 63 &&
          board[Number(chooseTurnItem.id) + 28]?.name.includes("WHITE")
        ) {
          return {
            move: 28,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) + 28 <= 63 &&
          board[Number(chooseTurnItem.id) + 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 28)
        ) {
          if (
            Number(chooseTurnItem.id) + 35 <= 63 &&
            board[Number(chooseTurnItem.id) + 35]?.name.includes("WHITE")
          ) {
            return {
              move: 35,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            Number(chooseTurnItem.id) + 35 <= 63 &&
            board[Number(chooseTurnItem.id) + 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 35)
          ) {
            if (
              Number(chooseTurnItem.id) + 42 <= 63 &&
              board[Number(chooseTurnItem.id) + 42]?.name.includes("WHITE")
            ) {
              return {
                move: 42,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              Number(chooseTurnItem.id) + 42 <= 63 &&
              board[Number(chooseTurnItem.id) + 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 42)
            ) {
              if (
                Number(chooseTurnItem.id) + 49 <= 63 &&
                board[Number(chooseTurnItem.id) + 49]?.name.includes("WHITE")
              ) {
                return {
                  move: 49,
                  chooseTurnItemId: chooseTurnItem,
                };
              } else if (
                Number(chooseTurnItem.id) + 49 <= 63 &&
                board[Number(chooseTurnItem.id) + 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) + 49)
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
    logger.info("=============BISHOP NOT - KILL WHITE TO +7 MOVE =======");
  }

  // FOR KILL WHITE TO +9 MOVE
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    currentLineBetween &&
    Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
  ) {
    return {
      move: 9,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    currentLineBetween &&
    Number(chooseTurnItem.id) + 9 <= currentLineBetween[1] + 8 &&
    board[Number(chooseTurnItem.id) + 9] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) + 9)
  ) {
    if (
      Number(chooseTurnItem.id) + 18 <= 63 &&
      board[Number(chooseTurnItem.id) + 18]?.name.includes("WHITE")
    ) {
      return {
        move: 18,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      Number(chooseTurnItem.id) + 18 <= 63 &&
      board[Number(chooseTurnItem.id) + 18] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 18)
    ) {
      if (
        Number(chooseTurnItem.id) + 27 <= 63 &&
        board[Number(chooseTurnItem.id) + 27]?.name.includes("WHITE")
      ) {
        return {
          move: 27,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        Number(chooseTurnItem.id) + 27 <= 63 &&
        board[Number(chooseTurnItem.id) + 27] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 27)
      ) {
        if (
          Number(chooseTurnItem.id) + 36 <= 63 &&
          board[Number(chooseTurnItem.id) + 36]?.name.includes("WHITE")
        ) {
          return {
            move: 36,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) + 36 <= 63 &&
          board[Number(chooseTurnItem.id) + 36] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 36)
        ) {
          if (
            Number(chooseTurnItem.id) + 45 <= 63 &&
            board[Number(chooseTurnItem.id) + 45]?.name.includes("WHITE")
          ) {
            return {
              move: 45,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            Number(chooseTurnItem.id) + 45 <= 63 &&
            board[Number(chooseTurnItem.id) + 45] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 45)
          ) {
            if (
              Number(chooseTurnItem.id) + 54 <= 63 &&
              board[Number(chooseTurnItem.id) + 54]?.name.includes("WHITE")
            ) {
              return {
                move: 54,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              Number(chooseTurnItem.id) + 54 <= 63 &&
              board[Number(chooseTurnItem.id) + 54] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 54)
            ) {
              if (
                Number(chooseTurnItem.id) + 63 <= 63 &&
                board[Number(chooseTurnItem.id) + 63]?.name.includes("WHITE")
              ) {
                return {
                  move: 63,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            }
          }
        }
      }
    }
    logger.info("=============BISHOP NOT - KILL WHITE TO +9 MOVE =======");
  }

  // FOR KILL WHITE TO -7 MOVE
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
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) - 7)
  ) {
    if (
      Number(chooseTurnItem.id) - 14 >= 0 &&
      board[Number(chooseTurnItem.id) - 14]?.name.includes("WHITE")
    ) {
      return {
        move: -14,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      Number(chooseTurnItem.id) - 14 >= 0 &&
      board[Number(chooseTurnItem.id) - 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) - 14)
    ) {
      if (
        Number(chooseTurnItem.id) - 21 >= 0 &&
        board[Number(chooseTurnItem.id) - 21]?.name.includes("WHITE")
      ) {
        return {
          move: -21,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        Number(chooseTurnItem.id) - 21 >= 0 &&
        board[Number(chooseTurnItem.id) - 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) - 21)
      ) {
        if (
          Number(chooseTurnItem.id) - 28 >= 0 &&
          board[Number(chooseTurnItem.id) - 28]?.name.includes("WHITE")
        ) {
          return {
            move: -28,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) - 28 >= 0 &&
          board[Number(chooseTurnItem.id) - 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) - 28)
        ) {
          if (
            Number(chooseTurnItem.id) - 35 >= 0 &&
            board[Number(chooseTurnItem.id) - 35]?.name.includes("WHITE")
          ) {
            return {
              move: -35,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            Number(chooseTurnItem.id) - 35 >= 0 &&
            board[Number(chooseTurnItem.id) - 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) - 35)
          ) {
            if (
              Number(chooseTurnItem.id) - 42 >= 0 &&
              board[Number(chooseTurnItem.id) - 42]?.name.includes("WHITE")
            ) {
              return {
                move: -42,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              Number(chooseTurnItem.id) - 42 >= 0 &&
              board[Number(chooseTurnItem.id) - 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) - 42)
            ) {
              if (
                Number(chooseTurnItem.id) - 49 >= 0 &&
                board[Number(chooseTurnItem.id) - 49]?.name.includes("WHITE")
              ) {
                return {
                  move: -49,
                  chooseTurnItemId: chooseTurnItem,
                };
              } else if (
                Number(chooseTurnItem.id) - 49 >= 0 &&
                board[Number(chooseTurnItem.id) - 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) - 49)
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
    logger.info("=============BISHOP NOT - KILL WHITE TO -7 MOVE =======");
  }

  // FOR KILL WHITE TO -9 MOVE
  if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    currentLineBetween &&
    Number(chooseTurnItem.id) - 9 >= currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 9]?.name.includes("WHITE")
  ) {
    return {
      move: -9,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    currentLineBetween &&
    Number(chooseTurnItem.id) - 9 >= currentLineBetween[0] - 8 &&
    board[Number(chooseTurnItem.id) - 9] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) - 9)
  ) {
    if (
      Number(chooseTurnItem.id) - 18 >= 0 &&
      board[Number(chooseTurnItem.id) - 18]?.name.includes("WHITE")
    ) {
      return {
        move: -18,
        chooseTurnItemId: chooseTurnItem,
      };
    } else if (
      Number(chooseTurnItem.id) - 18 >= 0 &&
      board[Number(chooseTurnItem.id) - 18] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) - 18)
    ) {
      if (
        Number(chooseTurnItem.id) - 27 >= 0 &&
        board[Number(chooseTurnItem.id) - 27]?.name.includes("WHITE")
      ) {
        return {
          move: -27,
          chooseTurnItemId: chooseTurnItem,
        };
      } else if (
        Number(chooseTurnItem.id) - 27 >= 0 &&
        board[Number(chooseTurnItem.id) - 27] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) - 27)
      ) {
        if (
          Number(chooseTurnItem.id) - 36 >= 0 &&
          board[Number(chooseTurnItem.id) - 36]?.name.includes("WHITE")
        ) {
          return {
            move: -36,
            chooseTurnItemId: chooseTurnItem,
          };
        } else if (
          Number(chooseTurnItem.id) - 36 >= 0 &&
          board[Number(chooseTurnItem.id) - 36] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) - 36)
        ) {
          if (
            Number(chooseTurnItem.id) - 45 >= 0 &&
            board[Number(chooseTurnItem.id) - 45]?.name.includes("WHITE")
          ) {
            return {
              move: -45,
              chooseTurnItemId: chooseTurnItem,
            };
          } else if (
            Number(chooseTurnItem.id) - 45 >= 0 &&
            board[Number(chooseTurnItem.id) - 45] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) - 45)
          ) {
            if (
              Number(chooseTurnItem.id) - 54 >= 0 &&
              board[Number(chooseTurnItem.id) - 54]?.name.includes("WHITE")
            ) {
              return {
                move: -54,
                chooseTurnItemId: chooseTurnItem,
              };
            } else if (
              Number(chooseTurnItem.id) - 54 >= 0 &&
              board[Number(chooseTurnItem.id) - 54] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) - 54)
            ) {
              if (
                Number(chooseTurnItem.id) - 63 >= 0 &&
                board[Number(chooseTurnItem.id) - 63]?.name.includes("WHITE")
              ) {
                return {
                  move: -63,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            }
          }
        }
      }
    }
    logger.info("=============BISHOP NOT - KILL WHITE TO -9 MOVE =======");
  }

  logger.error("===================BISHOP NOT KILL WHITE===========");
};
export default possibleBishopkillMove;
