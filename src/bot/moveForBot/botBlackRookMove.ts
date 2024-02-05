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
        if (board[Number(chooseTurnItem.id) + 8] == null) {
          if (board[Number(chooseTurnItem.id) + 16] == null) {
            if (board[Number(chooseTurnItem.id) + 24] == null) {
              if (board[Number(chooseTurnItem.id) + 32] == null) {
                if (board[Number(chooseTurnItem.id) + 40] == null) {
                  if (board[Number(chooseTurnItem.id) + 48] == null) {
                    if (board[Number(chooseTurnItem.id) + 56] == null) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                    } else if (
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                      botMoveChange(tableData);
                    }
                  } else if (
                    board[Number(chooseTurnItem.id) + 48]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 24);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 16);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 8);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
        }

        // Going To Right
        if (board[Number(chooseTurnItem.id) + 1] == null) {
          if (board[Number(chooseTurnItem.id) + 2] == null) {
            if (board[Number(chooseTurnItem.id) + 3] == null) {
              if (board[Number(chooseTurnItem.id) + 4] == null) {
                if (board[Number(chooseTurnItem.id) + 5] == null) {
                  if (board[Number(chooseTurnItem.id) + 6] == null) {
                    if (board[Number(chooseTurnItem.id) + 7] == null) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                      botMoveChange(tableData);
                    } else if (
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
                    board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 3);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 3);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 2);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 2);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 1);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 1);
          botMoveChange(tableData);
        }
      }

      // FOR 7
      if (Number(chooseTurnItem.id) == 7) {
        // TO UPWARD
        if (board[Number(chooseTurnItem.id) + 8] == null) {
          if (board[Number(chooseTurnItem.id) + 16] == null) {
            if (board[Number(chooseTurnItem.id) + 24] == null) {
              if (board[Number(chooseTurnItem.id) + 32] == null) {
                if (board[Number(chooseTurnItem.id) + 40] == null) {
                  if (board[Number(chooseTurnItem.id) + 48] == null) {
                    if (board[Number(chooseTurnItem.id) + 56] == null) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                    } else if (
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                      botMoveChange(tableData);
                    }
                  } else if (
                    board[Number(chooseTurnItem.id) + 48]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 24);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 16);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 8);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
        }

        // Going To Left
        if (board[Number(chooseTurnItem.id) - 1] == null) {
          if (board[Number(chooseTurnItem.id) - 2] == null) {
            if (board[Number(chooseTurnItem.id) - 3] == null) {
              if (board[Number(chooseTurnItem.id) - 4] == null) {
                if (board[Number(chooseTurnItem.id) - 5] == null) {
                  if (board[Number(chooseTurnItem.id) - 6] == null) {
                    if (board[Number(chooseTurnItem.id) - 7] == null) {
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
        if (board[Number(chooseTurnItem.id) + 8] == null) {
          if (board[Number(chooseTurnItem.id) + 16] == null) {
            if (board[Number(chooseTurnItem.id) + 24] == null) {
              if (board[Number(chooseTurnItem.id) + 32] == null) {
                if (board[Number(chooseTurnItem.id) + 40] == null) {
                  if (board[Number(chooseTurnItem.id) + 48] == null) {
                    if (board[Number(chooseTurnItem.id) + 56] == null) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                    } else if (
                      board[Number(chooseTurnItem.id) + 56]?.name.includes(
                        "WHITE"
                      )
                    ) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                      botMoveChange(tableData);
                    } else {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                      botMoveChange(tableData);
                    }
                  } else if (
                    board[Number(chooseTurnItem.id) + 48]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 24);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 16);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 8);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
        }

        // Going To Left
        if (board[Number(chooseTurnItem.id) - 1] == null) {
          if (board[Number(chooseTurnItem.id) - 2] == null) {
            if (board[Number(chooseTurnItem.id) - 3] == null) {
              if (board[Number(chooseTurnItem.id) - 4] == null) {
                if (board[Number(chooseTurnItem.id) - 5] == null) {
                  if (board[Number(chooseTurnItem.id) - 6] == null) {
                    if (board[Number(chooseTurnItem.id) - 7] == null) {
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

        // Going To Right
        if (board[Number(chooseTurnItem.id) + 1] == null) {
          if (board[Number(chooseTurnItem.id) + 2] == null) {
            if (board[Number(chooseTurnItem.id) + 3] == null) {
              if (board[Number(chooseTurnItem.id) + 4] == null) {
                if (board[Number(chooseTurnItem.id) + 5] == null) {
                  if (board[Number(chooseTurnItem.id) + 6] == null) {
                    if (board[Number(chooseTurnItem.id) + 7] == null) {
                      tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                      botMoveChange(tableData);
                    } else if (
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
                    board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 3);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 3);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 2);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 2);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 1);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 1);
          botMoveChange(tableData);
        }
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 == 0
    ) {
      // TO UPWORD
      if (board[Number(chooseTurnItem.id) + 8] == null) {
        if (board[Number(chooseTurnItem.id) + 16] == null) {
          if (board[Number(chooseTurnItem.id) + 24] == null) {
            if (board[Number(chooseTurnItem.id) + 32] == null) {
              if (board[Number(chooseTurnItem.id) + 40] == null) {
                if (board[Number(chooseTurnItem.id) + 48] == null) {
                  if (board[Number(chooseTurnItem.id) + 56] == null) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                  } else if (
                    board[Number(chooseTurnItem.id) + 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 32);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 24);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 16);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
        }
      } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
      }

      // Going To Right
      if (board[Number(chooseTurnItem.id) + 1] == null) {
        if (board[Number(chooseTurnItem.id) + 2] == null) {
          if (board[Number(chooseTurnItem.id) + 3] == null) {
            if (board[Number(chooseTurnItem.id) + 4] == null) {
              if (board[Number(chooseTurnItem.id) + 5] == null) {
                if (board[Number(chooseTurnItem.id) + 6] == null) {
                  if (board[Number(chooseTurnItem.id) + 7] == null) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                    botMoveChange(tableData);
                  } else if (
                    board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 4);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 4);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 3);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 3);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 2);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 2);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 1);
          botMoveChange(tableData);
        }
      } else if (board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 1);
        botMoveChange(tableData);
      }

      // TO DOWN
      if (board[Number(chooseTurnItem.id) - 8] == null) {
        if (board[Number(chooseTurnItem.id) - 16] == null) {
          if (board[Number(chooseTurnItem.id) - 24] == null) {
            if (board[Number(chooseTurnItem.id) - 32] == null) {
              if (board[Number(chooseTurnItem.id) - 40] == null) {
                if (board[Number(chooseTurnItem.id) - 48] == null) {
                  if (board[Number(chooseTurnItem.id) - 56] == null) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                  } else if (
                    board[Number(chooseTurnItem.id) - 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -32);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -32);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -24);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -24);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -16);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -16);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -8);
          botMoveChange(tableData);
        }
      } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -8);
        botMoveChange(tableData);
      }
    } else if (
      cornerNumber.includes(Number(chooseTurnItem.id)) &&
      Number(chooseTurnItem.id) % 2 != 0
    ) {
      // TO UPWORD
      if (board[Number(chooseTurnItem.id) + 8] == null) {
        if (board[Number(chooseTurnItem.id) + 16] == null) {
          if (board[Number(chooseTurnItem.id) + 24] == null) {
            if (board[Number(chooseTurnItem.id) + 32] == null) {
              if (board[Number(chooseTurnItem.id) + 40] == null) {
                if (board[Number(chooseTurnItem.id) + 48] == null) {
                  if (board[Number(chooseTurnItem.id) + 56] == null) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                  } else if (
                    board[Number(chooseTurnItem.id) + 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 32);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 32);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 24);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 24);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 16);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 16);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 8);
          botMoveChange(tableData);
        }
      } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
      }

      // Going To Left
      if (board[Number(chooseTurnItem.id) - 1] == null) {
        if (board[Number(chooseTurnItem.id) - 2] == null) {
          if (board[Number(chooseTurnItem.id) - 3] == null) {
            if (board[Number(chooseTurnItem.id) - 4] == null) {
              if (board[Number(chooseTurnItem.id) - 5] == null) {
                if (board[Number(chooseTurnItem.id) - 6] == null) {
                  if (board[Number(chooseTurnItem.id) - 7] == null) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                    botMoveChange(tableData);
                  } else if (
                    board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
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
      } else if (board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -1);
        botMoveChange(tableData);
      }

      // TO DOWN
      if (board[Number(chooseTurnItem.id) - 8] == null) {
        if (board[Number(chooseTurnItem.id) - 16] == null) {
          if (board[Number(chooseTurnItem.id) - 24] == null) {
            if (board[Number(chooseTurnItem.id) - 32] == null) {
              if (board[Number(chooseTurnItem.id) - 40] == null) {
                if (board[Number(chooseTurnItem.id) - 48] == null) {
                  if (board[Number(chooseTurnItem.id) - 56] == null) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                  } else if (
                    board[Number(chooseTurnItem.id) - 56]?.name.includes(
                      "WHITE"
                    )
                  ) {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                    botMoveChange(tableData);
                  } else {
                    tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                    botMoveChange(tableData);
                  }
                } else if (
                  board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -32);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -32);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -24);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -24);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -16);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -16);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -8);
          botMoveChange(tableData);
        }
      } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -8);
        botMoveChange(tableData);
      }
    }
  } else if (Number(chooseTurnItem.id)) {
    // GOING TO UPWARD
    if (board[Number(chooseTurnItem.id) + 8] == null) {
      if (board[Number(chooseTurnItem.id) + 16] == null) {
        if (board[Number(chooseTurnItem.id) + 24] == null) {
          if (board[Number(chooseTurnItem.id) + 32] == null) {
            if (board[Number(chooseTurnItem.id) + 40] == null) {
              if (board[Number(chooseTurnItem.id) + 48] == null) {
                if (board[Number(chooseTurnItem.id) + 56] == null) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                } else if (
                  board[Number(chooseTurnItem.id) + 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 56);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 48);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 40);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 40);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 32);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 32);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 24);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 24);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 16);
          botMoveChange(tableData);
        }
      } else if (
        board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 16);
        botMoveChange(tableData);
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 8);
        botMoveChange(tableData);
      }
    } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 8);
      botMoveChange(tableData);
    }

    // Going To Right
    else if (board[Number(chooseTurnItem.id) + 1] == null) {
      if (board[Number(chooseTurnItem.id) + 2] == null) {
        if (board[Number(chooseTurnItem.id) + 3] == null) {
          if (board[Number(chooseTurnItem.id) + 4] == null) {
            if (board[Number(chooseTurnItem.id) + 5] == null) {
              if (board[Number(chooseTurnItem.id) + 6] == null) {
                if (board[Number(chooseTurnItem.id) + 7] == null) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                  botMoveChange(tableData);
                } else if (
                  board[Number(chooseTurnItem.id) + 7]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 7);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, 6);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, 5);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, 5);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, 4);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, 4);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, 3);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, 3);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, 2);
          botMoveChange(tableData);
        }
      } else if (board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, 2);
        botMoveChange(tableData);
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, 1);
        botMoveChange(tableData);
      }
    } else if (board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, 1);
      botMoveChange(tableData);
    }

    // TO DOWN
    else if (board[Number(chooseTurnItem.id) - 8] == null) {
      if (board[Number(chooseTurnItem.id) - 16] == null) {
        if (board[Number(chooseTurnItem.id) - 24] == null) {
          if (board[Number(chooseTurnItem.id) - 32] == null) {
            if (board[Number(chooseTurnItem.id) - 40] == null) {
              if (board[Number(chooseTurnItem.id) - 48] == null) {
                if (board[Number(chooseTurnItem.id) - 56] == null) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                  botMoveChange(tableData);
                } else if (
                  board[Number(chooseTurnItem.id) - 56]?.name.includes("WHITE")
                ) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -56);
                  botMoveChange(tableData);
                } else {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                  botMoveChange(tableData);
                }
              } else if (
                board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
              ) {
                tableData.board = makeBotBoard(board, chooseTurnItem, -48);
                botMoveChange(tableData);
              } else {
                tableData.board = makeBotBoard(board, chooseTurnItem, -40);
                botMoveChange(tableData);
              }
            } else if (
              board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
            ) {
              tableData.board = makeBotBoard(board, chooseTurnItem, -40);
              botMoveChange(tableData);
            } else {
              tableData.board = makeBotBoard(board, chooseTurnItem, -32);
              botMoveChange(tableData);
            }
          } else if (
            board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
          ) {
            tableData.board = makeBotBoard(board, chooseTurnItem, -32);
            botMoveChange(tableData);
          } else {
            tableData.board = makeBotBoard(board, chooseTurnItem, -24);
            botMoveChange(tableData);
          }
        } else if (
          board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
        ) {
          tableData.board = makeBotBoard(board, chooseTurnItem, -24);
          botMoveChange(tableData);
        } else {
          tableData.board = makeBotBoard(board, chooseTurnItem, -16);
          botMoveChange(tableData);
        }
      } else if (
        board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
      ) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -16);
        botMoveChange(tableData);
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, -8);
        botMoveChange(tableData);
      }
    } else if (board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -8);
      botMoveChange(tableData);
    }

    // GOING TO LEFT
    else if (board[Number(chooseTurnItem.id) - 1] == null) {
      if (board[Number(chooseTurnItem.id) - 2] == null) {
        if (board[Number(chooseTurnItem.id) - 3] == null) {
          if (board[Number(chooseTurnItem.id) - 4] == null) {
            if (board[Number(chooseTurnItem.id) - 5] == null) {
              if (board[Number(chooseTurnItem.id) - 6] == null) {
                if (board[Number(chooseTurnItem.id) - 7] == null) {
                  tableData.board = makeBotBoard(board, chooseTurnItem, -7);
                  botMoveChange(tableData);
                } else if (
                  board[Number(chooseTurnItem.id) - 7]?.name.includes("WHITE")
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
      } else if (board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")) {
        tableData.board = makeBotBoard(board, chooseTurnItem, -2);
        botMoveChange(tableData);
      } else {
        tableData.board = makeBotBoard(board, chooseTurnItem, -1);
        botMoveChange(tableData);
      }
    } else if (board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")) {
      tableData.board = makeBotBoard(board, chooseTurnItem, -1);
      botMoveChange(tableData);
    }
  }
};

export default botBlackRookMove;
