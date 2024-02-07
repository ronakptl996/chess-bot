import { IBoardObject, IChess } from "../../interface";
import logger from "../../logger";
import { cornerNumber, makeBotBoard } from "../../utils";
import botMoveChange from "../botMoveChange";

const botBlackBishopMove = async (
  chooseTurnItem: IBoardObject,
  tableData: IChess
) => {
  logger.error(
    "====================botBlackBishopMove==========================="
  );

  const board = tableData.board;

  if (cornerNumber.includes(Number(chooseTurnItem.id))) {
    // FOR 0 WHITE KILL
    if (Number(chooseTurnItem.id) == 0) {
      // TO UPWARD
      if (
        Number(chooseTurnItem.id) + 9 <= 63 &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) + 9 <= 63 &&
        board[Number(chooseTurnItem.id) + 9] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 18 <= 63 &&
          board[Number(chooseTurnItem.id) + 18]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            18,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) + 18 <= 63 &&
          board[Number(chooseTurnItem.id) + 18] == null
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
            board[Number(chooseTurnItem.id) + 27] == null
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
              board[Number(chooseTurnItem.id) + 36] == null
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
                board[Number(chooseTurnItem.id) + 45] == null
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
                  board[Number(chooseTurnItem.id) + 54] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 63 <= 63 &&
                    board[Number(chooseTurnItem.id) + 63]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(
                      board,
                      chooseTurnItem,
                      63,
                      tableData._id
                    );
                    botMoveChange(tableData);
                    return;
                  } else if (
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
                  } else {
                    tableData.board = makeBotBoard(
                      board,
                      chooseTurnItem,
                      54,
                      tableData._id
                    );
                    botMoveChange(tableData);
                    return;
                  }
                } else {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    45,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  36,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                27,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              18,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            9,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      }
    }

    // FOR 7 WHITE KILL
    if (Number(chooseTurnItem.id) == 7) {
      // TO UPWARD
      if (
        Number(chooseTurnItem.id) + 7 <= 63 &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) + 7 <= 63 &&
        board[Number(chooseTurnItem.id) + 7] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 14 <= 63 &&
          board[Number(chooseTurnItem.id) + 14]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            14,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) + 14 <= 63 &&
          board[Number(chooseTurnItem.id) + 14] == null
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
            board[Number(chooseTurnItem.id) + 21] == null
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
              board[Number(chooseTurnItem.id) + 28] == null
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
                board[Number(chooseTurnItem.id) + 35] == null
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
                  board[Number(chooseTurnItem.id) + 42] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 49 <= 63 &&
                    board[Number(chooseTurnItem.id) + 49]?.name.includes(
                      "WHITE"
                    )
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
                    board[Number(chooseTurnItem.id) + 49] == null
                  ) {
                    if (
                      Number(chooseTurnItem.id) + 56 <= 63 &&
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(
                        board,
                        chooseTurnItem,
                        56,
                        tableData._id
                      );
                      botMoveChange(tableData);
                      return;
                    } else if (
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
                        49,
                        tableData._id
                      );
                      botMoveChange(tableData);
                      return;
                    }
                  } else {
                    tableData.board = makeBotBoard(
                      board,
                      chooseTurnItem,
                      42,
                      tableData._id
                    );
                    botMoveChange(tableData);
                    return;
                  }
                } else {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    35,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  28,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                21,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              14,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            7,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      }
    }

    if (
      Number(chooseTurnItem.id) % 2 == 0 &&
      Number(chooseTurnItem.id) > 7 &&
      Number(chooseTurnItem.id) < 49
    ) {
      if (
        Number(chooseTurnItem.id) + 9 <= 63 &&
        board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 9, tableData._id);
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) + 9 <= 63 &&
        board[Number(chooseTurnItem.id) + 9] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 18 <= 63 &&
          board[Number(chooseTurnItem.id) + 18]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            18,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) + 18 <= 63 &&
          board[Number(chooseTurnItem.id) + 18] == null
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
            board[Number(chooseTurnItem.id) + 27] == null
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
              board[Number(chooseTurnItem.id) + 36] == null
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
                board[Number(chooseTurnItem.id) + 45] == null
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
                  board[Number(chooseTurnItem.id) + 54] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 63 <= 63 &&
                    board[Number(chooseTurnItem.id) + 63]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(
                      board,
                      chooseTurnItem,
                      63,
                      tableData._id
                    );
                    botMoveChange(tableData);
                    return;
                  } else if (
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
                  } else {
                    tableData.board = makeBotBoard(
                      board,
                      chooseTurnItem,
                      54,
                      tableData._id
                    );
                    botMoveChange(tableData);
                    return;
                  }
                } else {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    45,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  36,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                27,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              18,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            9,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      }
    }

    if (
      Number(chooseTurnItem.id) % 2 != 0 &&
      Number(chooseTurnItem.id) > 14 &&
      Number(chooseTurnItem.id) < 56
    ) {
      logger.error(
        "====================Number(chooseTurnItem.id) % 2 != 0 &&Number(chooseTurnItem.id) > 14 &&Number(chooseTurnItem.id) < 56==========================="
      );
      if (
        Number(chooseTurnItem.id) + 7 <= 63 &&
        board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(
          board,
          chooseTurnItem,
          14,
          tableData._id
        );
        botMoveChange(tableData);
        return;
      } else if (
        Number(chooseTurnItem.id) + 7 <= 63 &&
        board[Number(chooseTurnItem.id) + 7] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 14 <= 63 &&
          board[Number(chooseTurnItem.id) + 14]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            14,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        } else if (
          Number(chooseTurnItem.id) + 14 <= 63 &&
          board[Number(chooseTurnItem.id) + 14] == null
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
            board[Number(chooseTurnItem.id) + 21] == null
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
              board[Number(chooseTurnItem.id) + 28] == null
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
                board[Number(chooseTurnItem.id) + 35] == null
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
                  board[Number(chooseTurnItem.id) + 42] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 49 <= 63 &&
                    board[Number(chooseTurnItem.id) + 49]?.name.includes(
                      "WHITE"
                    )
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
                    board[Number(chooseTurnItem.id) + 49] == null
                  ) {
                    if (
                      Number(chooseTurnItem.id) + 56 <= 63 &&
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(
                        board,
                        chooseTurnItem,
                        56,
                        tableData._id
                      );
                      botMoveChange(tableData);
                      return;
                    } else if (
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
                        49,
                        tableData._id
                      );
                      botMoveChange(tableData);
                      return;
                    }
                  } else {
                    tableData.board = makeBotBoard(
                      board,
                      chooseTurnItem,
                      42,
                      tableData._id
                    );
                    botMoveChange(tableData);
                    return;
                  }
                } else {
                  tableData.board = makeBotBoard(
                    board,
                    chooseTurnItem,
                    35,
                    tableData._id
                  );
                  botMoveChange(tableData);
                  return;
                }
              } else {
                tableData.board = makeBotBoard(
                  board,
                  chooseTurnItem,
                  28,
                  tableData._id
                );
                botMoveChange(tableData);
                return;
              }
            } else {
              tableData.board = makeBotBoard(
                board,
                chooseTurnItem,
                21,
                tableData._id
              );
              botMoveChange(tableData);
              return;
            }
          } else {
            tableData.board = makeBotBoard(
              board,
              chooseTurnItem,
              14,
              tableData._id
            );
            botMoveChange(tableData);
            return;
          }
        } else {
          tableData.board = makeBotBoard(
            board,
            chooseTurnItem,
            7,
            tableData._id
          );
          botMoveChange(tableData);
          return;
        }
      }
    }

    logger.error(
      "======================================NOT CHECK CORNER NUMBER++++++++++"
    );
  }

  // FOR KILL WHITE TO +7 MOVE
  if (
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
    botMoveChange(tableData);
    return;
  } else if (
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
              } else if (
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
            }
          }
        }
      }
    }
  }

  // FOR KILL WHITE TO -7 MOVE
  if (
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -7, tableData._id);
    botMoveChange(tableData);
    return;
  } else if (
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
              } else if (
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
            }
          }
        }
      }
    }
  }

  // FOR 7 EMPTY MOVE
  if (
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
    Number(chooseTurnItem.id) + 7 <= 63 &&
    board[Number(chooseTurnItem.id) + 7] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, 7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR 9 EMPTY MOVE
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

  // FOR -7 EMPTY MOVE
  if (
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
    Number(chooseTurnItem.id) - 7 >= 0 &&
    board[Number(chooseTurnItem.id) - 7] == null
  ) {
    tableData.board = makeBotBoard(board, chooseTurnItem, -7, tableData._id);
    botMoveChange(tableData);
    return;
  }

  // FOR -9 EMPTY MOVE
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
};

export default botBlackBishopMove;
