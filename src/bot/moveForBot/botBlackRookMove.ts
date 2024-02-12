import { IBoardObject, IChess } from "../../interface";
import { cornerNumber, currentLine, makeBotBoard } from "../../utils";
import logger from "../../logger";
import botMoveChange from "../botMoveChange";

const botBlackRookMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error(
    "===========================botBlackRookMove=========================="
  );
  //   console.log(chooseTurnItem);
  //   console.log(board);
  const board = tableData.board;

  let currentLineBetween;
  currentLineBetween = currentLine.find(
    (arr) => Number(chooseTurnItem.id) <= arr[1]
  );

  // FOR WHITE KILL +8 MOVE
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

  // Going To Right // FOR WHITE KILL +1 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
    Number(chooseTurnItem.id) + 1 <= 63 &&
    board[Number(chooseTurnItem.id) + 1] == null
  ) {
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
      Number(chooseTurnItem.id) + 2 <= 63 &&
      board[Number(chooseTurnItem.id) + 2] == null
    ) {
      if (
        currentLineBetween &&
        Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
        Number(chooseTurnItem.id) + 3 <= 63 &&
        board[Number(chooseTurnItem.id) + 3] == null
      ) {
        if (
          currentLineBetween &&
          Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
          Number(chooseTurnItem.id) + 4 <= 63 &&
          board[Number(chooseTurnItem.id) + 4] == null
        ) {
          if (
            currentLineBetween &&
            Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
            Number(chooseTurnItem.id) + 5 <= 63 &&
            board[Number(chooseTurnItem.id) + 5] == null
          ) {
            if (
              currentLineBetween &&
              Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
              Number(chooseTurnItem.id) + 6 <= 63 &&
              board[Number(chooseTurnItem.id) + 6] == null
            ) {
              if (
                currentLineBetween &&
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
              currentLineBetween &&
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
            currentLineBetween &&
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
          currentLineBetween &&
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
        currentLineBetween &&
        Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 3, tableData._id);
        botMoveChange(tableData);
        return;
      }
    } else if (
      currentLineBetween &&
      Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 2, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
    board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 1, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // TO DOWN  // FOR WHITE KILL -8 MOVE
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

  // GOING TO LEFT // FOR WHITE KILL -1 MOVE
  if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 1] == null &&
    Number(chooseTurnItem.id) - 1 >= 0
  ) {
    if (
      currentLineBetween &&
      Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 2] == null &&
      Number(chooseTurnItem.id) - 2 >= 0
    ) {
      if (
        currentLineBetween &&
        Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 3] == null &&
        Number(chooseTurnItem.id) - 3 >= 0
      ) {
        if (
          currentLineBetween &&
          Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 4] == null &&
          Number(chooseTurnItem.id) - 4 >= 0
        ) {
          if (
            currentLineBetween &&
            Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 5] == null &&
            Number(chooseTurnItem.id) - 5 >= 0
          ) {
            if (
              currentLineBetween &&
              Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) - 6] == null &&
              Number(chooseTurnItem.id) - 6 >= 0
            ) {
              if (
                currentLineBetween &&
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
              currentLineBetween &&
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
            currentLineBetween &&
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
          currentLineBetween &&
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
        currentLineBetween &&
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
      currentLineBetween &&
      Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
    ) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -2, tableData._id);
      botMoveChange(tableData);
      return;
    }
  } else if (
    currentLineBetween &&
    Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
    board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -1, tableData._id);
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

export default botBlackRookMove;
