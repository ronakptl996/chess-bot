import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, makeBotBoard, currentLine } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackQueenMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error(
    "====================botBlackQueenMove==========================="
  );

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  const board = tableData.board;

  // FOR KILL WHITE TO +7 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
    botMoveChange(tableData);
    return;
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
      tableData.board = makeBotBoard(board, chooseTurnItem, 14, tableData._id);
      botMoveChange(tableData);
      return;
    } else if (
      Number(chooseTurnItem.id) + 14 <= 63 &&
      board[Number(chooseTurnItem.id) + 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 14)
    ) {
      if (
        Number(chooseTurnItem.id) + 21 <= 63 &&
        board[Number(chooseTurnItem.id) + 21]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          21,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) + 21 <= 63 &&
        board[Number(chooseTurnItem.id) + 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 21)
      ) {
        if (
          Number(chooseTurnItem.id) + 28 <= 63 &&
          board[Number(chooseTurnItem.id) + 28]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            28,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) + 28 <= 63 &&
          board[Number(chooseTurnItem.id) + 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 28)
        ) {
          if (
            Number(chooseTurnItem.id) + 35 <= 63 &&
            board[Number(chooseTurnItem.id) + 35]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              35,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          } else if (
            Number(chooseTurnItem.id) + 35 <= 63 &&
            board[Number(chooseTurnItem.id) + 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 35)
          ) {
            if (
              Number(chooseTurnItem.id) + 42 <= 63 &&
              board[Number(chooseTurnItem.id) + 42]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                42,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            } else if (
              Number(chooseTurnItem.id) + 42 <= 63 &&
              board[Number(chooseTurnItem.id) + 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 42)
            ) {
              if (
                Number(chooseTurnItem.id) + 49 <= 63 &&
                board[Number(chooseTurnItem.id) + 49]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  49,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              } else if (
                Number(chooseTurnItem.id) + 49 <= 63 &&
                board[Number(chooseTurnItem.id) + 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) + 49)
              ) {
                if (
                  Number(chooseTurnItem.id) + 56 <= 63 &&
                  board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    56,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              }
            }
          }
        }
      }
    }
  }

  // FOR KILL WHITE TO +9 MOVE
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
    botMoveChange(tableData);
    return;
  } else if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) + 9)
  ) {
    if (
      Number(chooseTurnItem.id) + 18 <= 63 &&
      board[Number(chooseTurnItem.id) + 18]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 18, tableData._id);
      botMoveChange(tableData);
      return;
    } else if (
      Number(chooseTurnItem.id) + 18 <= 63 &&
      board[Number(chooseTurnItem.id) + 18] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 18)
    ) {
      if (
        Number(chooseTurnItem.id) + 27 <= 63 &&
        board[Number(chooseTurnItem.id) + 27]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          27,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) + 27 <= 63 &&
        board[Number(chooseTurnItem.id) + 27] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 27)
      ) {
        if (
          Number(chooseTurnItem.id) + 36 <= 63 &&
          board[Number(chooseTurnItem.id) + 36]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            36,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) + 36 <= 63 &&
          board[Number(chooseTurnItem.id) + 36] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 36)
        ) {
          if (
            Number(chooseTurnItem.id) + 45 <= 63 &&
            board[Number(chooseTurnItem.id) + 45]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              45,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          } else if (
            Number(chooseTurnItem.id) + 45 <= 63 &&
            board[Number(chooseTurnItem.id) + 45] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 45)
          ) {
            if (
              Number(chooseTurnItem.id) + 54 <= 63 &&
              board[Number(chooseTurnItem.id) + 54]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                54,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            } else if (
              Number(chooseTurnItem.id) + 54 <= 63 &&
              board[Number(chooseTurnItem.id) + 54] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 54)
            ) {
              if (
                Number(chooseTurnItem.id) + 63 <= 63 &&
                board[Number(chooseTurnItem.id) + 63]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  63,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            }
          }
        }
      }
    }
  }

  //  FOR KILL WHITE TO +8 MOVE
  if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8] == null
  ) {
    if (
      Number(chooseTurnItem.id) + 16 <= 63 &&
      board[Number(chooseTurnItem.id) + 16] == null
    ) {
      if (
        Number(chooseTurnItem.id) + 24 <= 63 &&
        board[Number(chooseTurnItem.id) + 24] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 32 <= 63 &&
          board[Number(chooseTurnItem.id) + 32] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 40 <= 63 &&
            board[Number(chooseTurnItem.id) + 40] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 48 <= 63 &&
              board[Number(chooseTurnItem.id) + 48] == null
            ) {
              if (
                board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  56,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                48,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              40,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            32,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          24,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 16, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 8, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR KILL WHITE TO +1 MOVE
  if (currentLineBetween) {
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      if (
        Number(chooseTurnItem.id) + 2 <= 63 &&
        Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 2] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 3 <= 63 &&
          Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 3] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 4 <= 63 &&
            Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
            board[Number(chooseTurnItem.id) + 4] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 5 <= 63 &&
              Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
              board[Number(chooseTurnItem.id) + 5] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 6 <= 63 &&
                Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
                board[Number(chooseTurnItem.id) + 6] == null
              ) {
                if (
                  Number(chooseTurnItem.id) + 7 <= currentLineBetween[1] &&
                  board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    7,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
                board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  6,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
              board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                5,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
            board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              4,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            3,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 2, tableData._id);
        botMoveChange(tableData);
        return;
      }
    } else if (
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 1, tableData._id);
      botMoveChange(tableData);
      return;
    }
  }

  // FOR KILL WHITE TO -1 MOVE
  if (currentLineBetween) {
    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1] == null
    ) {
      if (
        Number(chooseTurnItem.id) - 2 >= 0 &&
        Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 2] == null
      ) {
        if (
          Number(chooseTurnItem.id) - 3 >= 0 &&
          Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 3] == null
        ) {
          if (
            Number(chooseTurnItem.id) - 4 >= 0 &&
            Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 4] == null
          ) {
            if (
              Number(chooseTurnItem.id) - 5 >= 0 &&
              Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) - 5] == null
            ) {
              if (
                Number(chooseTurnItem.id) - 6 >= 0 &&
                Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
                board[Number(chooseTurnItem.id) - 6] == null
              ) {
                if (
                  Number(chooseTurnItem.id) - 7 >= currentLineBetween[0] &&
                  board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    -7,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
                board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -6,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -5,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -4,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -3,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -2,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -1, tableData._id);
      botMoveChange(tableData);
      return;
    }
  }

  // FOR KILL WHITE TO -7 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -7, tableData._id);
    botMoveChange(tableData);
    return;
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
      tableData.board = makeBotBoard(board, chooseTurnItem, -14, tableData._id);
      botMoveChange(tableData);
      return;
    } else if (
      Number(chooseTurnItem.id) - 14 >= 0 &&
      board[Number(chooseTurnItem.id) - 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) - 14)
    ) {
      if (
        Number(chooseTurnItem.id) - 21 >= 0 &&
        board[Number(chooseTurnItem.id) - 21]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -21,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) - 21 >= 0 &&
        board[Number(chooseTurnItem.id) - 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) - 21)
      ) {
        if (
          Number(chooseTurnItem.id) - 28 >= 0 &&
          board[Number(chooseTurnItem.id) - 28]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -28,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) - 28 >= 0 &&
          board[Number(chooseTurnItem.id) - 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) - 28)
        ) {
          if (
            Number(chooseTurnItem.id) - 35 >= 0 &&
            board[Number(chooseTurnItem.id) - 35]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -35,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          } else if (
            Number(chooseTurnItem.id) - 35 >= 0 &&
            board[Number(chooseTurnItem.id) - 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) - 35)
          ) {
            if (
              Number(chooseTurnItem.id) - 42 >= 0 &&
              board[Number(chooseTurnItem.id) - 42]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -42,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            } else if (
              Number(chooseTurnItem.id) - 42 >= 0 &&
              board[Number(chooseTurnItem.id) - 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) - 42)
            ) {
              if (
                Number(chooseTurnItem.id) - 49 >= 0 &&
                board[Number(chooseTurnItem.id) - 49]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -49,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              } else if (
                Number(chooseTurnItem.id) - 49 >= 0 &&
                board[Number(chooseTurnItem.id) - 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) - 49)
              ) {
                if (
                  Number(chooseTurnItem.id) - 56 >= 0 &&
                  board[Number(chooseTurnItem.id) - 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    -56,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              }
            }
          }
        }
      }
    }
  }

  // FOR KILL WHITE TO -9 MOVE
  if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    board[Number(chooseTurnItem.id) - 9]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -9, tableData._id);
    botMoveChange(tableData);
    return;
  } else if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    board[Number(chooseTurnItem.id) - 9] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) - 9)
  ) {
    if (
      Number(chooseTurnItem.id) - 18 >= 0 &&
      board[Number(chooseTurnItem.id) - 18]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -18, tableData._id);
      botMoveChange(tableData);
      return;
    } else if (
      Number(chooseTurnItem.id) - 18 >= 0 &&
      board[Number(chooseTurnItem.id) - 18] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) - 18)
    ) {
      if (
        Number(chooseTurnItem.id) - 27 >= 0 &&
        board[Number(chooseTurnItem.id) - 27]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -27,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) - 27 >= 0 &&
        board[Number(chooseTurnItem.id) - 27] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) - 27)
      ) {
        if (
          Number(chooseTurnItem.id) - 36 >= 0 &&
          board[Number(chooseTurnItem.id) - 36]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -36,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) - 36 >= 0 &&
          board[Number(chooseTurnItem.id) - 36] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) - 36)
        ) {
          if (
            Number(chooseTurnItem.id) - 45 >= 0 &&
            board[Number(chooseTurnItem.id) - 45]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -45,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          } else if (
            Number(chooseTurnItem.id) - 45 >= 0 &&
            board[Number(chooseTurnItem.id) - 45] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) - 45)
          ) {
            if (
              Number(chooseTurnItem.id) - 54 >= 0 &&
              board[Number(chooseTurnItem.id) - 54]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -54,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            } else if (
              Number(chooseTurnItem.id) - 54 >= 0 &&
              board[Number(chooseTurnItem.id) - 54] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) - 54)
            ) {
              if (
                Number(chooseTurnItem.id) - 63 >= 0 &&
                board[Number(chooseTurnItem.id) - 63]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -63,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            }
          }
        }
      }
    }
  }

  // FOR KILL WHITE TO -8 MOVE
  if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8] == null
  ) {
    if (
      Number(chooseTurnItem.id) - 16 >= 0 &&
      board[Number(chooseTurnItem.id) - 16] == null
    ) {
      if (
        Number(chooseTurnItem.id) - 24 >= 0 &&
        board[Number(chooseTurnItem.id) - 24] == null
      ) {
        if (
          Number(chooseTurnItem.id) - 32 >= 0 &&
          board[Number(chooseTurnItem.id) - 32] == null
        ) {
          if (
            Number(chooseTurnItem.id) - 40 >= 0 &&
            board[Number(chooseTurnItem.id) - 40] == null
          ) {
            if (
              Number(chooseTurnItem.id) - 48 >= 0 &&
              board[Number(chooseTurnItem.id) - 48] == null
            ) {
              if (
                board[Number(chooseTurnItem.id) - 56]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -56,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -48,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -40,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -32,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -24,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -16, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -8, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR +7 TO MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) + 7)
  ) {
    if (
      Number(chooseTurnItem.id) + 14 <= 63 &&
      board[Number(chooseTurnItem.id) + 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 14)
    ) {
      if (
        Number(chooseTurnItem.id) + 21 <= 63 &&
        board[Number(chooseTurnItem.id) + 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 21)
      ) {
        if (
          Number(chooseTurnItem.id) + 28 <= 63 &&
          board[Number(chooseTurnItem.id) + 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 28)
        ) {
          if (
            Number(chooseTurnItem.id) + 35 <= 63 &&
            board[Number(chooseTurnItem.id) + 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 35)
          ) {
            if (
              Number(chooseTurnItem.id) + 42 <= 63 &&
              board[Number(chooseTurnItem.id) + 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 42)
            ) {
              if (
                Number(chooseTurnItem.id) + 49 <= 63 &&
                board[Number(chooseTurnItem.id) + 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) + 49)
              ) {
                if (
                  Number(chooseTurnItem.id) + 56 <= 63 &&
                  board[Number(chooseTurnItem.id) + 56] == null
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    56,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) + 49 <= 63 &&
                board[Number(chooseTurnItem.id) + 49] == null
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  49,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) + 42 <= 63 &&
              board[Number(chooseTurnItem.id) + 42] == null
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                42,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) + 35 <= 63 &&
            board[Number(chooseTurnItem.id) + 35] == null
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              35,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) + 28 <= 63 &&
          board[Number(chooseTurnItem.id) + 28] == null
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            28,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        Number(chooseTurnItem.id) + 21 <= 63 &&
        board[Number(chooseTurnItem.id) + 21] == null
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          21,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (
      Number(chooseTurnItem.id) + 14 <= 63 &&
      board[Number(chooseTurnItem.id) + 14] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 14, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 7 > currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR +8 MOVE
  if (
    Number(chooseTurnItem.id) + 8 <= 63 &&
    board[Number(chooseTurnItem.id) + 8] == null
  ) {
    if (
      Number(chooseTurnItem.id) + 16 <= 63 &&
      board[Number(chooseTurnItem.id) + 16] == null
    ) {
      if (
        Number(chooseTurnItem.id) + 24 <= 63 &&
        board[Number(chooseTurnItem.id) + 24] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 32 <= 63 &&
          board[Number(chooseTurnItem.id) + 32] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 40 <= 63 &&
            board[Number(chooseTurnItem.id) + 40] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 48 <= 63 &&
              board[Number(chooseTurnItem.id) + 48] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 56 <= 63 &&
                board[Number(chooseTurnItem.id) + 56] == null
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  56,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  48,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                40,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              32,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            24,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          16,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else {
      tableData.board = makeBotBoard(board, chooseTurnItem, 8, tableData._id);
      botMoveChange(tableData);
      return;
    }
  }

  // FOR +9 TO MOVE
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) + 9)
  ) {
    if (
      Number(chooseTurnItem.id) + 18 <= 63 &&
      board[Number(chooseTurnItem.id) + 18] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) + 18)
    ) {
      if (
        Number(chooseTurnItem.id) + 27 <= 63 &&
        board[Number(chooseTurnItem.id) + 27] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) + 27)
      ) {
        if (
          Number(chooseTurnItem.id) + 36 <= 63 &&
          board[Number(chooseTurnItem.id) + 36] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) + 36)
        ) {
          if (
            Number(chooseTurnItem.id) + 45 <= 63 &&
            board[Number(chooseTurnItem.id) + 45] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) + 45)
          ) {
            if (
              Number(chooseTurnItem.id) + 54 <= 63 &&
              board[Number(chooseTurnItem.id) + 54] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) + 54)
            ) {
              if (
                Number(chooseTurnItem.id) + 63 <= 63 &&
                board[Number(chooseTurnItem.id) + 63] == null
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  63,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) + 54 <= 63 &&
              board[Number(chooseTurnItem.id) + 54] == null
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                54,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) + 45 <= 63 &&
            board[Number(chooseTurnItem.id) + 45] == null
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              45,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) + 36 <= 63 &&
          board[Number(chooseTurnItem.id) + 36] == null
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            36,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        Number(chooseTurnItem.id) + 27 <= 63 &&
        board[Number(chooseTurnItem.id) + 27] == null
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          27,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (
      Number(chooseTurnItem.id) + 18 <= 63 &&
      board[Number(chooseTurnItem.id) + 18] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 18, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -7 TO MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) - 7)
  ) {
    if (
      Number(chooseTurnItem.id) - 14 >= 0 &&
      board[Number(chooseTurnItem.id) - 14] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) - 14)
    ) {
      if (
        Number(chooseTurnItem.id) - 21 >= 0 &&
        board[Number(chooseTurnItem.id) - 21] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) - 21)
      ) {
        if (
          Number(chooseTurnItem.id) - 28 >= 0 &&
          board[Number(chooseTurnItem.id) - 28] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) - 28)
        ) {
          if (
            Number(chooseTurnItem.id) - 35 >= 0 &&
            board[Number(chooseTurnItem.id) - 35] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) - 35)
          ) {
            if (
              Number(chooseTurnItem.id) - 42 >= 0 &&
              board[Number(chooseTurnItem.id) - 42] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) - 42)
            ) {
              if (
                Number(chooseTurnItem.id) - 49 >= 0 &&
                board[Number(chooseTurnItem.id) - 49] == null &&
                !cornerNumber.includes(Number(chooseTurnItem.id) - 49)
              ) {
                if (
                  Number(chooseTurnItem.id) - 56 >= 0 &&
                  board[Number(chooseTurnItem.id) - 56] == null
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    -56,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) - 49 >= 0 &&
                board[Number(chooseTurnItem.id) - 49] == null
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -49,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) - 42 >= 0 &&
              board[Number(chooseTurnItem.id) - 42] == null
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -42,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) - 35 >= 0 &&
            board[Number(chooseTurnItem.id) - 35] == null
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -35,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) - 28 >= 0 &&
          board[Number(chooseTurnItem.id) - 28] == null
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -28,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        Number(chooseTurnItem.id) - 21 >= 0 &&
        board[Number(chooseTurnItem.id) - 21] == null
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -21,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (
      Number(chooseTurnItem.id) - 14 >= 0 &&
      board[Number(chooseTurnItem.id) - 14] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -14, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 7 < currentLineBetween[0] &&
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -8 MOVE
  if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8] == null
  ) {
    if (
      Number(chooseTurnItem.id) - 16 >= 0 &&
      board[Number(chooseTurnItem.id) - 16] == null
    ) {
      if (
        Number(chooseTurnItem.id) - 24 >= 0 &&
        board[Number(chooseTurnItem.id) - 24] == null
      ) {
        if (
          Number(chooseTurnItem.id) - 32 >= 0 &&
          board[Number(chooseTurnItem.id) - 32] == null
        ) {
          if (
            Number(chooseTurnItem.id) - 40 >= 0 &&
            board[Number(chooseTurnItem.id) - 40] == null
          ) {
            if (
              Number(chooseTurnItem.id) - 48 >= 0 &&
              board[Number(chooseTurnItem.id) - 48] == null
            ) {
              if (
                Number(chooseTurnItem.id) - 56 >= 0 &&
                board[Number(chooseTurnItem.id) - 56] == null
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -56,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -48,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -40,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -32,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -24,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -16,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else {
      tableData.board = makeBotBoard(board, chooseTurnItem, -8, tableData._id);
      botMoveChange(tableData);
      return;
    }
  }

  // FOR -9 TO MOVE
  if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    board[Number(chooseTurnItem.id) - 9] == null &&
    !cornerNumber.includes(Number(chooseTurnItem.id) - 9)
  ) {
    if (
      Number(chooseTurnItem.id) - 18 >= 0 &&
      board[Number(chooseTurnItem.id) - 18] == null &&
      !cornerNumber.includes(Number(chooseTurnItem.id) - 18)
    ) {
      if (
        Number(chooseTurnItem.id) - 27 >= 0 &&
        board[Number(chooseTurnItem.id) - 27] == null &&
        !cornerNumber.includes(Number(chooseTurnItem.id) - 27)
      ) {
        if (
          Number(chooseTurnItem.id) - 36 >= 0 &&
          board[Number(chooseTurnItem.id) - 36] == null &&
          !cornerNumber.includes(Number(chooseTurnItem.id) - 36)
        ) {
          if (
            Number(chooseTurnItem.id) - 45 >= 0 &&
            board[Number(chooseTurnItem.id) - 45] == null &&
            !cornerNumber.includes(Number(chooseTurnItem.id) - 45)
          ) {
            if (
              Number(chooseTurnItem.id) - 54 >= 0 &&
              board[Number(chooseTurnItem.id) - 54] == null &&
              !cornerNumber.includes(Number(chooseTurnItem.id) - 54)
            ) {
              if (
                Number(chooseTurnItem.id) - 63 >= 0 &&
                board[Number(chooseTurnItem.id) - 63] == null
              ) {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -63,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) - 54 >= 0 &&
              board[Number(chooseTurnItem.id) - 54] == null
            ) {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -54,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) - 45 >= 0 &&
            board[Number(chooseTurnItem.id) - 45] == null
          ) {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -45,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) - 36 >= 0 &&
          board[Number(chooseTurnItem.id) - 36] == null
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -36,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else if (
        Number(chooseTurnItem.id) - 27 >= 0 &&
        board[Number(chooseTurnItem.id) - 27] == null
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -27,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    } else if (
      Number(chooseTurnItem.id) - 18 >= 0 &&
      board[Number(chooseTurnItem.id) - 18] == null
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -18, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    board[Number(chooseTurnItem.id) - 9] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -9, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR +1 MOVE AND -1 MOVE
  if (currentLineBetween) {
    if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      if (
        Number(chooseTurnItem.id) + 2 <= 63 &&
        Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 2] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 3 <= 63 &&
          Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 3] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 4 <= 63 &&
            Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
            board[Number(chooseTurnItem.id) + 4] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 5 <= 63 &&
              Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
              board[Number(chooseTurnItem.id) + 5] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 6 <= 63 &&
                Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
                board[Number(chooseTurnItem.id) + 6] == null
              ) {
                if (
                  Number(chooseTurnItem.id) + 7 <= 63 &&
                  Number(chooseTurnItem.id) + 7 <= currentLineBetween[1] &&
                  board[Number(chooseTurnItem.id) + 7] == null
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    7,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    6,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  5,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                4,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              3,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            2,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 1, tableData._id);
        botMoveChange(tableData);
        return;
      }
    }

    if (
      Number(chooseTurnItem.id) - 1 >= 0 &&
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1] == null
    ) {
      if (
        Number(chooseTurnItem.id) - 2 >= 0 &&
        Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 2] == null
      ) {
        if (
          Number(chooseTurnItem.id) - 3 >= 0 &&
          Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 3] == null
        ) {
          if (
            Number(chooseTurnItem.id) - 4 >= 0 &&
            Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 4] == null
          ) {
            if (
              Number(chooseTurnItem.id) - 5 >= 0 &&
              Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) + 5] == null
            ) {
              if (
                Number(chooseTurnItem.id) - 6 >= 0 &&
                Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
                board[Number(chooseTurnItem.id) - 6] == null
              ) {
                if (
                  Number(chooseTurnItem.id) - 7 >= 0 &&
                  Number(chooseTurnItem.id) - 7 >= currentLineBetween[0] &&
                  board[Number(chooseTurnItem.id) - 7] == null
                ) {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    -7,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    -6,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  -5,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                -4,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              -3,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            -2,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      } else {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          -1,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      }
    }
  }
};

export default botBlackQueenMove;
