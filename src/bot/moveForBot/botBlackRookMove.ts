import { IBoardObject, IChess } from "../../interface";
import { cornerNumber, makeBotBoard } from "../../utils";
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

  // FOR CORNER NUMBER ID
  if (cornerNumber.includes(Number(chooseTurnItem.id))) {
    // FOR INDEX 0 to 7
    if (Number(chooseTurnItem.id) >= 0 && Number(chooseTurnItem.id) <= 7) {
      // FOR 0
      if (Number(chooseTurnItem.id) == 0) {
        // TO UPWARD
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
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                      return;
                    } else if (
                      Number(chooseTurnItem.id) + 56 <= 63 &&
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                      return;
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                      botMoveChange(tableData);
                      return;
                    }
                  } else if (
                    Number(chooseTurnItem.id) + 48 <= 63 &&
                    board[Number(chooseTurnItem.id) + 48]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  Number(chooseTurnItem.id) + 40 <= 63 &&
                  board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) + 32 <= 63 &&
                board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 24);
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) + 24 <= 63 &&
              board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 16);
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) + 16 <= 63 &&
            board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 8);
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) + 8 <= 63 &&
          Number(chooseTurnItem.id) + 8 <= 63 &&
          board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
          return;
        }

        // Going To Right
        if (
          Number(chooseTurnItem.id) + 1 <= 63 &&
          board[Number(chooseTurnItem.id) + 1] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 2 <= 63 &&
            board[Number(chooseTurnItem.id) + 2] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 3 <= 63 &&
              board[Number(chooseTurnItem.id) + 3] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 4 <= 63 &&
                board[Number(chooseTurnItem.id) + 4] == null
              ) {
                if (
                  Number(chooseTurnItem.id) + 5 <= 63 &&
                  board[Number(chooseTurnItem.id) + 5] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 6 <= 63 &&
                    board[Number(chooseTurnItem.id) + 6] == null
                  ) {
                    if (
                      Number(chooseTurnItem.id) + 7 <= 63 &&
                      board[Number(chooseTurnItem.id) + 7] == null
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                      botMoveChange(tableData);
                    } else if (
                      Number(chooseTurnItem.id) + 7 <= 63 &&
                      board[Number(chooseTurnItem.id) + 7]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                      botMoveChange(tableData);
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                      botMoveChange(tableData);
                    }
                  } else if (
                    Number(chooseTurnItem.id) + 6 <= 63 &&
                    board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                    botMoveChange(tableData);
                  }
                } else if (
                  Number(chooseTurnItem.id) + 5 <= 63 &&
                  board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                  botMoveChange(tableData);
                }
              } else if (
                Number(chooseTurnItem.id) + 4 <= 63 &&
                board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 3);
                botMoveChange(tableData);
              }
            } else if (
              Number(chooseTurnItem.id) + 3 <= 63 &&
              board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 3);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 2);
              botMoveChange(tableData);
            }
          } else if (
            Number(chooseTurnItem.id) + 2 <= 63 &&
            board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 2);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 1);
            botMoveChange(tableData);
          }
        } else if (
          Number(chooseTurnItem.id) + 1 <= 63 &&
          board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 1);
          botMoveChange(tableData);
        }
      }

      // FOR 7
      if (Number(chooseTurnItem.id) == 7) {
        // TO UPWARD
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
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                      return;
                    } else if (
                      Number(chooseTurnItem.id) + 56 <= 63 &&
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                      return;
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                      botMoveChange(tableData);
                      return;
                    }
                  } else if (
                    Number(chooseTurnItem.id) + 48 <= 63 &&
                    board[Number(chooseTurnItem.id) + 48]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  Number(chooseTurnItem.id) + 40 <= 63 &&
                  board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) + 32 <= 63 &&
                board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 24);
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) + 24 <= 63 &&
              board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 16);
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) + 16 <= 63 &&
            board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 8);
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) + 8 <= 63 &&
          board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
          return;
        }

        // Going To Left
        if (
          board[Number(chooseTurnItem.id) - 1] == null &&
          Number(chooseTurnItem.id) - 1 >= 0
        ) {
          if (
            board[Number(chooseTurnItem.id) - 2] == null &&
            Number(chooseTurnItem.id) - 2 >= 0
          ) {
            if (
              board[Number(chooseTurnItem.id) - 3] == null &&
              Number(chooseTurnItem.id) - 3 >= 0
            ) {
              if (
                board[Number(chooseTurnItem.id) - 4] == null &&
                Number(chooseTurnItem.id) - 4 >= 0
              ) {
                if (
                  board[Number(chooseTurnItem.id) - 5] == null &&
                  Number(chooseTurnItem.id) - 5 >= 0
                ) {
                  if (
                    board[Number(chooseTurnItem.id) - 6] == null &&
                    Number(chooseTurnItem.id) - 6 >= 0
                  ) {
                    if (
                      board[Number(chooseTurnItem.id) - 7] == null &&
                      Number(chooseTurnItem.id) - 7 >= 0
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                      botMoveChange(tableData);
                    } else if (
                      board[Number(chooseTurnItem.id) - 7]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                      botMoveChange(tableData);
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                      botMoveChange(tableData);
                    }
                  } else if (
                    board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -4);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -4);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -3);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -3);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -2);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -2);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -1);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -1);
          botMoveChange(tableData);
        }
      }

      // For 1 to 6
      if (Number(chooseTurnItem.id)) {
        // TO UPWARD
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
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                      return;
                    } else if (
                      Number(chooseTurnItem.id) + 56 <= 63 &&
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                      return;
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                      botMoveChange(tableData);
                      return;
                    }
                  } else if (
                    Number(chooseTurnItem.id) + 48 <= 63 &&
                    board[Number(chooseTurnItem.id) + 48]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  Number(chooseTurnItem.id) + 40 <= 63 &&
                  board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                Number(chooseTurnItem.id) + 32 <= 63 &&
                board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 24);
                botMoveChange(tableData);
                return;
              }
            } else if (
              Number(chooseTurnItem.id) + 24 <= 63 &&
              board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 16);
              botMoveChange(tableData);
              return;
            }
          } else if (
            Number(chooseTurnItem.id) + 16 <= 63 &&
            board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 8);
            botMoveChange(tableData);
            return;
          }
        } else if (
          Number(chooseTurnItem.id) + 8 <= 63 &&
          board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
          return;
        }

        // Going To Left
        if (
          board[Number(chooseTurnItem.id) - 1] == null &&
          Number(chooseTurnItem.id) - 1 >= 0
        ) {
          if (
            board[Number(chooseTurnItem.id) - 2] == null &&
            Number(chooseTurnItem.id) - 2 >= 0
          ) {
            if (
              board[Number(chooseTurnItem.id) - 3] == null &&
              Number(chooseTurnItem.id) - 3 >= 0
            ) {
              if (
                board[Number(chooseTurnItem.id) - 4] == null &&
                Number(chooseTurnItem.id) - 4 >= 0
              ) {
                if (
                  board[Number(chooseTurnItem.id) - 5] == null &&
                  Number(chooseTurnItem.id) - 5 >= 0
                ) {
                  if (
                    board[Number(chooseTurnItem.id) - 6] == null &&
                    Number(chooseTurnItem.id) - 6 >= 0
                  ) {
                    if (
                      board[Number(chooseTurnItem.id) - 7] == null &&
                      Number(chooseTurnItem.id) - 7 >= 0
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                      botMoveChange(tableData);
                      return;
                    } else if (
                      board[Number(chooseTurnItem.id) - 7]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                      botMoveChange(tableData);
                      return;
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                      botMoveChange(tableData);
                      return;
                    }
                  } else if (
                    board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -4);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -4);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -3);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -3);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -2);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -2);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -1);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -1);
          botMoveChange(tableData);
          return;
        }

        // Going To Right
        if (
          Number(chooseTurnItem.id) + 1 <= 63 &&
          board[Number(chooseTurnItem.id) + 1] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 2 <= 63 &&
            board[Number(chooseTurnItem.id) + 2] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 3 <= 63 &&
              board[Number(chooseTurnItem.id) + 3] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 4 <= 63 &&
                board[Number(chooseTurnItem.id) + 4] == null
              ) {
                if (
                  Number(chooseTurnItem.id) + 5 <= 63 &&
                  board[Number(chooseTurnItem.id) + 5] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 6 <= 63 &&
                    board[Number(chooseTurnItem.id) + 6] == null
                  ) {
                    if (
                      Number(chooseTurnItem.id) + 7 <= 63 &&
                      board[Number(chooseTurnItem.id) + 7] == null
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                      botMoveChange(tableData);
                      return;
                    } else if (
                      board[Number(chooseTurnItem.id) + 7]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                      botMoveChange(tableData);
                      return;
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                      botMoveChange(tableData);
                      return;
                    }
                  } else if (
                    board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 3);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 3);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 2);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 2);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 1);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 1);
          botMoveChange(tableData);
          return;
        }
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 == 0
    ) {
      // TO UPWORD
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
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                    return;
                  } else if (
                    board[Number(chooseTurnItem.id) + 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 32);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 24);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 16);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
        return;
      }

      // Going To Right
      if (
        Number(chooseTurnItem.id) + 1 <= 63 &&
        board[Number(chooseTurnItem.id) + 1] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 2 <= 63 &&
          board[Number(chooseTurnItem.id) + 2] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 3 <= 63 &&
            board[Number(chooseTurnItem.id) + 3] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 4 <= 63 &&
              board[Number(chooseTurnItem.id) + 4] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 5 <= 63 &&
                board[Number(chooseTurnItem.id) + 5] == null
              ) {
                if (
                  Number(chooseTurnItem.id) + 6 <= 63 &&
                  board[Number(chooseTurnItem.id) + 6] == null
                ) {
                  if (
                    Number(chooseTurnItem.id) + 7 <= 63 &&
                    board[Number(chooseTurnItem.id) + 7] == null
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                    botMoveChange(tableData);
                    return;
                  } else if (
                    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 4);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 3);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 3);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 2);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 2);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 1);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 1);
        botMoveChange(tableData);
        return;
      }

      // TO DOWN
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
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                    return;
                  } else if (
                    board[Number(chooseTurnItem.id) - 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -32);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -32);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -24);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -24);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -16);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -16);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -8);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -8);
        botMoveChange(tableData);
        return;
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 != 0
    ) {
      // TO UPWORD
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
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                    return;
                  } else if (
                    board[Number(chooseTurnItem.id) + 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 32);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 24);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 16);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
        return;
      }

      // Going To Left
      if (
        board[Number(chooseTurnItem.id) - 1] == null &&
        Number(chooseTurnItem.id) - 1 >= 0
      ) {
        if (
          board[Number(chooseTurnItem.id) - 2] == null &&
          Number(chooseTurnItem.id) - 2 >= 0
        ) {
          if (
            board[Number(chooseTurnItem.id) - 3] == null &&
            Number(chooseTurnItem.id) - 3 >= 0
          ) {
            if (
              board[Number(chooseTurnItem.id) - 4] == null &&
              Number(chooseTurnItem.id) - 4 >= 0
            ) {
              if (
                board[Number(chooseTurnItem.id) - 5] == null &&
                Number(chooseTurnItem.id) - 5 >= 0
              ) {
                if (
                  board[Number(chooseTurnItem.id) - 6] == null &&
                  Number(chooseTurnItem.id) - 6 >= 0
                ) {
                  if (
                    board[Number(chooseTurnItem.id) - 7] == null &&
                    Number(chooseTurnItem.id) - 7 >= 0
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                    botMoveChange(tableData);
                    return;
                  } else if (
                    board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -4);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -4);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -3);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -3);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -2);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -2);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -1);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -1);
        botMoveChange(tableData);
        return;
      }

      // TO DOWN
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
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                    return;
                  } else if (
                    board[Number(chooseTurnItem.id) - 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                    return;
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                    botMoveChange(tableData);
                    return;
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -32);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -32);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -24);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -24);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -16);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -16);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -8);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -8);
        botMoveChange(tableData);
        return;
      }
    }
  } else if (Number(chooseTurnItem.id)) {
    // GOING TO UPWARD
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
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                  return;
                } else if (
                  board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 40);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 32);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 32);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 24);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 24);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 16);
          botMoveChange(tableData);
          return;
        }
      } else if (
        board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 16);
        botMoveChange(tableData);
        return;
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
        return;
      }
    } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 8);
      botMoveChange(tableData);
      return;
    }

    // Going To Right
    else if (
      Number(chooseTurnItem.id) + 1 <= 63 &&
      board[Number(chooseTurnItem.id) + 1] == null
    ) {
      if (
        Number(chooseTurnItem.id) + 2 <= 63 &&
        board[Number(chooseTurnItem.id) + 2] == null
      ) {
        if (
          Number(chooseTurnItem.id) + 3 <= 63 &&
          board[Number(chooseTurnItem.id) + 3] == null
        ) {
          if (
            Number(chooseTurnItem.id) + 4 <= 63 &&
            board[Number(chooseTurnItem.id) + 4] == null
          ) {
            if (
              Number(chooseTurnItem.id) + 5 <= 63 &&
              board[Number(chooseTurnItem.id) + 5] == null
            ) {
              if (
                Number(chooseTurnItem.id) + 6 <= 63 &&
                board[Number(chooseTurnItem.id) + 6] == null
              ) {
                if (
                  Number(chooseTurnItem.id) + 7 <= 63 &&
                  board[Number(chooseTurnItem.id) + 7] == null
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                  botMoveChange(tableData);
                  return;
                } else if (
                  board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 5);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 4);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 4);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 3);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 3);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 2);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 2);
        botMoveChange(tableData);
        return;
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 1);
        botMoveChange(tableData);
        return;
      }
    } else if (board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 1);
      botMoveChange(tableData);
      return;
    }

    // TO DOWN
    else if (
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
                  tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                  botMoveChange(tableData);
                  return;
                } else if (
                  board[Number(chooseTurnItem.id) - 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -40);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -32);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -32);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -24);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -24);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -16);
          botMoveChange(tableData);
          return;
        }
      } else if (
        board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -16);
        botMoveChange(tableData);
        return;
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, -8);
        botMoveChange(tableData);
        return;
      }
    } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -8);
      botMoveChange(tableData);
      return;
    }

    // GOING TO LEFT
    else if (
      board[Number(chooseTurnItem.id) - 1] == null &&
      Number(chooseTurnItem.id) - 1 >= 0
    ) {
      if (
        board[Number(chooseTurnItem.id) - 2] == null &&
        Number(chooseTurnItem.id) - 2 >= 0
      ) {
        if (
          board[Number(chooseTurnItem.id) - 3] == null &&
          Number(chooseTurnItem.id) - 3 >= 0
        ) {
          if (
            board[Number(chooseTurnItem.id) - 4] == null &&
            Number(chooseTurnItem.id) - 4 >= 0
          ) {
            if (
              board[Number(chooseTurnItem.id) - 5] == null &&
              Number(chooseTurnItem.id) - 5 >= 0
            ) {
              if (
                board[Number(chooseTurnItem.id) - 6] == null &&
                Number(chooseTurnItem.id) - 6 >= 0
              ) {
                if (
                  board[Number(chooseTurnItem.id) - 7] == null &&
                  Number(chooseTurnItem.id) - 7 >= 0
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                  botMoveChange(tableData);
                  return;
                } else if (
                  board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                  botMoveChange(tableData);
                  return;
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                  botMoveChange(tableData);
                  return;
                }
              } else if (
                board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -6);
                botMoveChange(tableData);
                return;
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -5);
                botMoveChange(tableData);
                return;
              }
            } else if (
              board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -5);
              botMoveChange(tableData);
              return;
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -4);
              botMoveChange(tableData);
              return;
            }
          } else if (
            board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -4);
            botMoveChange(tableData);
            return;
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -3);
            botMoveChange(tableData);
            return;
          }
        } else if (
          board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -3);
          botMoveChange(tableData);
          return;
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -2);
          botMoveChange(tableData);
          return;
        }
      } else if (board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -2);
        botMoveChange(tableData);
        return;
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, -1);
        botMoveChange(tableData);
        return;
      }
    } else if (board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -1);
      botMoveChange(tableData);
      return;
    }
  }
};

export default botBlackRookMove;
