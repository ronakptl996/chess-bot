import { IBoardObject } from "../interface";
import logger from "../logger";
import { cornerNumber, currentLine } from "../utils";

const kingCheckmate = async (board: (IBoardObject | null)[]) => {
  logger.info("===================== kingCheckMate =======================");
  const blackKing = board.find((item) => {
    if (item) {
      return item.name == "BLACK_KING";
    }
  });

  if (blackKing) {
    let kingId = Number(blackKing.id);
    let currentLineBetween;
    currentLineBetween = currentLine.find((arr) => Number(kingId) <= arr[1]);

    if (currentLineBetween) {
      if (
        kingId + 1 <= 63 &&
        kingId + 1 <= currentLineBetween[1] &&
        board[kingId + 1]?.name.includes("WHITE")
      ) {
        return {
          move: 1,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      } else if (
        kingId - 1 >= 0 &&
        kingId - 1 >= currentLineBetween[0] &&
        board[kingId - 1]?.name.includes("WHITE")
      ) {
        return {
          move: 1,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      }

      if (
        kingId + 7 > currentLineBetween[1] &&
        kingId + 7 <= 63 &&
        board[kingId + 7]?.name.includes("WHITE")
      ) {
        return {
          move: 7,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      } else if (
        kingId - 7 < currentLineBetween[0] &&
        kingId - 7 >= 0 &&
        board[kingId - 7]?.name.includes("WHITE")
      ) {
        return {
          move: 7,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      }

      if (
        kingId + 9 <= currentLineBetween[1] + 8 &&
        kingId + 9 <= 63 &&
        board[kingId + 9]?.name.includes("WHITE")
      ) {
        return {
          move: 9,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      } else if (
        kingId - 9 <= currentLineBetween[0] - 8 &&
        kingId - 9 >= 0 &&
        board[kingId - 9]?.name.includes("WHITE")
      ) {
        return {
          move: 9,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      }
    }
    if (kingId - 8 >= 0 && board[kingId - 8]?.name.includes("WHITE")) {
      return {
        move: -8,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    }
    if (kingId + 8 <= 63 && board[kingId + 8]?.name.includes("WHITE")) {
      return {
        move: 8,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    }

    // SO CHECK FOR KNIGHT ===
    // FOR KILL WHITE 15 MOVE
    if (
      currentLineBetween &&
      kingId + 15 <= 63 &&
      kingId + 15 > currentLineBetween[1] + 8 &&
      board[kingId + 15]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: 15,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE 6 MOVE
    else if (
      currentLineBetween &&
      kingId + 6 <= 63 &&
      kingId + 6 > currentLineBetween[1] &&
      board[kingId + 6]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: 6,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE 10 MOVE
    else if (
      currentLineBetween &&
      kingId + 10 <= 63 &&
      kingId + 10 <= currentLineBetween[1] + 8 &&
      board[kingId + 10]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: 10,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE 17 MOVE
    else if (
      currentLineBetween &&
      kingId + 17 <= 63 &&
      kingId + 17 <= currentLineBetween[1] + 16 &&
      board[kingId + 17]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: 17,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE -15 MOVE
    else if (
      currentLineBetween &&
      kingId - 15 >= 0 &&
      kingId - 15 < currentLineBetween[0] - 8 &&
      board[kingId - 15]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: -15,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE -6 MOVE
    else if (
      currentLineBetween &&
      kingId - 6 >= 0 &&
      kingId - 6 < currentLineBetween[0] &&
      board[kingId - 6]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: -6,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE -10 MOVE
    else if (
      currentLineBetween &&
      kingId - 10 >= 0 &&
      kingId - 10 >= currentLineBetween[0] - 8 &&
      board[kingId - 10]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: -10,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR KILL WHITE -17 MOVE
    else if (
      currentLineBetween &&
      kingId - 17 >= 0 &&
      kingId - 17 >= currentLineBetween[0] - 16 &&
      board[kingId - 17]?.name.includes("WHITE_KNIGHT")
    ) {
      return {
        move: -17,
        chooseTurnItemId: blackKing,
        kill: false,
      };
    }

    // FOR CHECK FROM ROOK & QUEEN

    logger.info(
      "=========== CHECKMATE && FOR CHECK FROM ROOK & QUEEN ================"
    );
    // FOR +1 CHECK ROOK || QUEEN
    if (
      currentLineBetween &&
      kingId + 1 <= currentLineBetween[1] &&
      board[kingId + 1] &&
      (board[kingId + 1]?.name.includes("WHITE_ROOK") ||
        board[kingId + 1]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: 1,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (
      currentLineBetween &&
      kingId + 1 <= currentLineBetween[1] &&
      board[kingId + 1] == null
    ) {
      if (
        currentLineBetween &&
        kingId + 2 <= currentLineBetween[1] &&
        board[kingId + 2] &&
        (board[kingId + 2]?.name.includes("WHITE_ROOK") ||
          board[kingId + 2]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: 2,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (
        currentLineBetween &&
        kingId + 2 <= currentLineBetween[1] &&
        board[kingId + 2] == null
      ) {
        if (
          currentLineBetween &&
          kingId + 3 <= currentLineBetween[1] &&
          board[kingId + 3] &&
          (board[kingId + 3]?.name.includes("WHITE_ROOK") ||
            board[kingId + 3]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: 3,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (
          currentLineBetween &&
          kingId + 3 <= currentLineBetween[1] &&
          board[kingId + 3] == null
        ) {
          if (
            currentLineBetween &&
            kingId + 4 <= currentLineBetween[1] &&
            board[kingId + 4] &&
            (board[kingId + 4]?.name.includes("WHITE_ROOK") ||
              board[kingId + 4]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: 4,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (
            currentLineBetween &&
            kingId + 4 <= currentLineBetween[1] &&
            board[kingId + 4] == null
          ) {
            if (
              currentLineBetween &&
              kingId + 5 <= currentLineBetween[1] &&
              board[kingId + 5] &&
              (board[kingId + 5]?.name.includes("WHITE_ROOK") ||
                board[kingId + 5]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: 5,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (
              currentLineBetween &&
              kingId + 5 <= currentLineBetween[1] &&
              board[kingId + 5] == null
            ) {
              if (
                currentLineBetween &&
                kingId + 6 <= currentLineBetween[1] &&
                board[kingId + 6] &&
                (board[kingId + 6]?.name.includes("WHITE_ROOK") ||
                  board[kingId + 6]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: 6,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (
                currentLineBetween &&
                kingId + 6 <= currentLineBetween[1] &&
                board[kingId + 6] == null
              ) {
                if (
                  currentLineBetween &&
                  kingId + 7 <= currentLineBetween[1] &&
                  board[kingId + 7] &&
                  (board[kingId + 7]?.name.includes("WHITE_ROOK") ||
                    board[kingId + 7]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: 7,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                }
              }
            }
          }
        }
      }
    }

    // FOR +8 CHECK ROOK || QUEEN
    if (
      kingId + 8 <= 63 &&
      (board[kingId + 8]?.name.includes("WHITE_ROOK") ||
        board[kingId + 8]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: 8,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (kingId + 8 <= 63 && board[kingId + 8] == null) {
      if (
        kingId + 16 <= 63 &&
        (board[kingId + 16]?.name.includes("WHITE_ROOK") ||
          board[kingId + 16]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: 16,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (kingId + 16 <= 63 && board[kingId + 16] == null) {
        if (
          kingId + 24 <= 63 &&
          (board[kingId + 24]?.name.includes("WHITE_ROOK") ||
            board[kingId + 24]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: 24,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (kingId + 24 <= 63 && board[kingId + 24] == null) {
          if (
            kingId + 32 <= 63 &&
            (board[kingId + 32]?.name.includes("WHITE_ROOK") ||
              board[kingId + 32]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: 32,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (kingId + 32 <= 63 && board[kingId + 32] == null) {
            if (
              kingId + 40 <= 63 &&
              (board[kingId + 40]?.name.includes("WHITE_ROOK") ||
                board[kingId + 40]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: 40,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (kingId + 40 <= 63 && board[kingId + 40] == null) {
              if (
                kingId + 48 <= 63 &&
                (board[kingId + 48]?.name.includes("WHITE_ROOK") ||
                  board[kingId + 48]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: 48,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (kingId + 48 <= 63 && board[kingId + 48] == null) {
                if (
                  kingId + 56 <= 63 &&
                  (board[kingId + 56]?.name.includes("WHITE_ROOK") ||
                    board[kingId + 56]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: 56,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                }
              }
            }
          }
        }
      }
    }

    // FOR -1 CHECK ROOK || QUEEN
    if (
      currentLineBetween &&
      kingId - 1 >= currentLineBetween[0] &&
      (board[kingId - 1]?.name.includes("WHITE_ROOK") ||
        board[kingId - 1]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: -1,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (
      currentLineBetween &&
      kingId - 1 >= currentLineBetween[0] &&
      board[kingId - 1] == null
    ) {
      if (
        currentLineBetween &&
        kingId - 2 >= currentLineBetween[0] &&
        (board[kingId - 2]?.name.includes("WHITE_ROOK") ||
          board[kingId - 2]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: -2,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (
        currentLineBetween &&
        kingId - 2 >= currentLineBetween[0] &&
        board[kingId - 2] == null
      ) {
        if (
          currentLineBetween &&
          kingId - 3 >= currentLineBetween[0] &&
          (board[kingId - 3]?.name.includes("WHITE_ROOK") ||
            board[kingId - 3]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: -3,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (
          currentLineBetween &&
          kingId - 3 >= currentLineBetween[0] &&
          board[kingId - 3] == null
        ) {
          if (
            currentLineBetween &&
            kingId - 4 >= currentLineBetween[0] &&
            (board[kingId - 4]?.name.includes("WHITE_ROOK") ||
              board[kingId - 4]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: -4,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (
            currentLineBetween &&
            kingId - 4 >= currentLineBetween[0] &&
            board[kingId - 4] == null
          ) {
            if (
              currentLineBetween &&
              kingId - 5 >= currentLineBetween[0] &&
              (board[kingId - 5]?.name.includes("WHITE_ROOK") ||
                board[kingId - 5]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: -5,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (
              currentLineBetween &&
              kingId - 5 >= currentLineBetween[0] &&
              board[kingId - 5] == null
            ) {
              if (
                currentLineBetween &&
                kingId - 6 >= currentLineBetween[0] &&
                (board[kingId - 6]?.name.includes("WHITE_ROOK") ||
                  board[kingId - 6]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: -6,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (
                currentLineBetween &&
                kingId - 6 >= currentLineBetween[0] &&
                board[kingId - 6] == null
              ) {
                if (
                  currentLineBetween &&
                  kingId - 7 >= currentLineBetween[0] &&
                  (board[kingId - 7]?.name.includes("WHITE_ROOK") ||
                    board[kingId - 7]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: -7,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                }
              }
            }
          }
        }
      }
    }

    // FOR -8 CHECK ROOK || QUEEN
    if (
      kingId - 8 >= 0 &&
      (board[kingId - 8]?.name.includes("WHITE_ROOK") ||
        board[kingId - 8]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: -8,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (kingId - 8 >= 0 && board[kingId - 8] == null) {
      if (
        kingId - 16 >= 0 &&
        (board[kingId - 16]?.name.includes("WHITE_ROOK") ||
          board[kingId - 16]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: -16,
          chooseTurnItemId: blackKing,
          kill: true,
        };
      } else if (kingId - 16 >= 0 && board[kingId - 16] == null) {
        if (
          kingId - 24 >= 0 &&
          (board[kingId - 24]?.name.includes("WHITE_ROOK") ||
            board[kingId - 24]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: -24,
            chooseTurnItemId: blackKing,
            kill: true,
          };
        } else if (kingId - 24 >= 0 && board[kingId - 24] == null) {
          if (
            kingId - 32 >= 0 &&
            (board[kingId - 32]?.name.includes("WHITE_ROOK") ||
              board[kingId - 32]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: -32,
              chooseTurnItemId: blackKing,
              kill: true,
            };
          } else if (kingId - 32 >= 0 && board[kingId - 32] == null) {
            if (
              kingId - 40 >= 0 &&
              (board[kingId - 40]?.name.includes("WHITE_ROOK") ||
                board[kingId - 40]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: -40,
                chooseTurnItemId: blackKing,
                kill: true,
              };
            } else if (kingId - 40 >= 0 && board[kingId - 40] == null) {
              if (
                kingId - 48 >= 0 &&
                (board[kingId - 48]?.name.includes("WHITE_ROOK") ||
                  board[kingId - 48]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: -48,
                  chooseTurnItemId: blackKing,
                  kill: true,
                };
              } else if (kingId - 48 >= 0 && board[kingId - 48] == null) {
                if (
                  kingId - 56 >= 0 &&
                  (board[kingId - 56]?.name.includes("WHITE_ROOK") ||
                    board[kingId - 56]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: -56,
                    chooseTurnItemId: blackKing,
                    kill: true,
                  };
                }
              }
            }
          }
        }
      }
    }

    // FOR 7 CHECK BISHOP || QUEEN
    if (
      currentLineBetween &&
      kingId + 7 > currentLineBetween[1] &&
      kingId + 7 <= 63 &&
      (board[kingId + 7]?.name.includes("WHITE_BISHOP") ||
        board[kingId + 7]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: 7,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (
      currentLineBetween &&
      kingId + 7 > currentLineBetween[1] &&
      kingId + 7 <= 63 &&
      board[kingId + 7] == null &&
      !cornerNumber.includes(kingId + 7)
    ) {
      if (
        kingId + 14 <= 63 &&
        (board[kingId + 14]?.name.includes("WHITE_BISHOP") ||
          board[kingId + 14]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: 14,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (
        kingId + 14 <= 63 &&
        board[kingId + 14] == null &&
        !cornerNumber.includes(kingId + 14)
      ) {
        if (
          kingId + 21 <= 63 &&
          (board[kingId + 21]?.name.includes("WHITE_BISHOP") ||
            board[kingId + 21]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: 21,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (
          kingId + 21 <= 63 &&
          board[kingId + 21] == null &&
          !cornerNumber.includes(kingId + 21)
        ) {
          if (
            kingId + 28 <= 63 &&
            (board[kingId + 28]?.name.includes("WHITE_BISHOP") ||
              board[kingId + 28]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: 28,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (
            kingId + 28 <= 63 &&
            board[kingId + 28] == null &&
            !cornerNumber.includes(kingId + 28)
          ) {
            if (
              kingId + 35 <= 63 &&
              (board[kingId + 35]?.name.includes("WHITE_BISHOP") ||
                board[kingId + 35]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: 35,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (
              kingId + 35 <= 63 &&
              board[kingId + 35] == null &&
              !cornerNumber.includes(kingId + 35)
            ) {
              if (
                kingId + 42 <= 63 &&
                (board[kingId + 42]?.name.includes("WHITE_BISHOP") ||
                  board[kingId + 42]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: 42,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (
                kingId + 42 <= 63 &&
                board[kingId + 42] == null &&
                !cornerNumber.includes(kingId + 42)
              ) {
                if (
                  kingId + 49 <= 63 &&
                  (board[kingId + 49]?.name.includes("WHITE_BISHOP") ||
                    board[kingId + 49]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: 49,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                } else if (
                  kingId + 49 <= 63 &&
                  board[kingId + 49] == null &&
                  !cornerNumber.includes(kingId + 49)
                ) {
                  if (
                    kingId + 56 <= 63 &&
                    (board[kingId + 56]?.name.includes("WHITE_BISHOP") ||
                      board[kingId + 56]?.name.includes("WHITE_QUREEN"))
                  ) {
                    return {
                      move: 56,
                      chooseTurnItemId: blackKing,
                      kill: false,
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

    // FOR 9 CHECK BISHOP || QUEEN
    if (
      kingId + 9 <= 63 &&
      (board[kingId + 9]?.name.includes("WHITE_BISHOP") ||
        board[kingId + 9]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: 9,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (
      kingId + 9 <= 63 &&
      board[kingId + 9] == null &&
      !cornerNumber.includes(kingId + 9)
    ) {
      if (
        kingId + 18 <= 63 &&
        (board[kingId + 18]?.name.includes("WHITE_BISHOP") ||
          board[kingId + 18]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: 18,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (
        kingId + 18 <= 63 &&
        board[kingId + 18] == null &&
        !cornerNumber.includes(kingId + 18)
      ) {
        if (
          kingId + 27 <= 63 &&
          (board[kingId + 27]?.name.includes("WHITE_BISHOP") ||
            board[kingId + 27]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: 27,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (
          kingId + 27 <= 63 &&
          board[kingId + 27] == null &&
          !cornerNumber.includes(kingId + 27)
        ) {
          if (
            kingId + 36 <= 63 &&
            (board[kingId + 36]?.name.includes("WHITE_BISHOP") ||
              board[kingId + 36]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: 36,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (
            kingId + 36 <= 63 &&
            board[kingId + 36] == null &&
            !cornerNumber.includes(kingId + 36)
          ) {
            if (
              kingId + 45 <= 63 &&
              (board[kingId + 45]?.name.includes("WHITE_BISHOP") ||
                board[kingId + 45]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: 45,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (
              kingId + 45 <= 63 &&
              board[kingId + 45] == null &&
              !cornerNumber.includes(kingId + 45)
            ) {
              if (
                kingId + 54 <= 63 &&
                (board[kingId + 54]?.name.includes("WHITE_BISHOP") ||
                  board[kingId + 54]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: 54,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (
                kingId + 54 <= 63 &&
                board[kingId + 54] == null &&
                !cornerNumber.includes(kingId + 54)
              ) {
                if (
                  kingId + 63 <= 63 &&
                  (board[kingId + 63]?.name.includes("WHITE_BISHOP") ||
                    board[kingId + 63]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: 63,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                }
              }
            }
          }
        }
      }
      logger.info("=============BISHOP NOT - KILL WHITE TO +9 MOVE =======");
    }

    // FOR -7 CHECK BISHOP || QUEEN
    if (
      currentLineBetween &&
      kingId - 7 < currentLineBetween[0] &&
      kingId - 7 >= 0 &&
      (board[kingId - 7]?.name.includes("WHITE_BISHOP") ||
        board[kingId - 7]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: -7,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (
      currentLineBetween &&
      kingId - 7 < currentLineBetween[0] &&
      kingId - 7 >= 0 &&
      board[kingId - 7] == null &&
      !cornerNumber.includes(kingId - 7)
    ) {
      if (
        kingId - 14 >= 0 &&
        (board[kingId - 14]?.name.includes("WHITE_BISHOP") ||
          board[kingId - 14]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: -14,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (
        kingId - 14 >= 0 &&
        board[kingId - 14] == null &&
        !cornerNumber.includes(kingId - 14)
      ) {
        if (
          kingId - 21 >= 0 &&
          (board[kingId - 21]?.name.includes("WHITE_BISHOP") ||
            board[kingId - 21]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: -21,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (
          kingId - 21 >= 0 &&
          board[kingId - 21] == null &&
          !cornerNumber.includes(kingId - 21)
        ) {
          if (
            kingId - 28 >= 0 &&
            (board[kingId - 28]?.name.includes("WHITE_BISHOP") ||
              board[kingId - 28]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: -28,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (
            kingId - 28 >= 0 &&
            board[kingId - 28] == null &&
            !cornerNumber.includes(kingId - 28)
          ) {
            if (
              kingId - 35 >= 0 &&
              (board[kingId - 35]?.name.includes("WHITE_BISHOP") ||
                board[kingId - 35]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: -35,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (
              kingId - 35 >= 0 &&
              board[kingId - 35] == null &&
              !cornerNumber.includes(kingId - 35)
            ) {
              if (
                kingId - 42 >= 0 &&
                (board[kingId - 42]?.name.includes("WHITE_BISHOP") ||
                  board[kingId - 42]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: -42,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (
                kingId - 42 >= 0 &&
                board[kingId - 42] == null &&
                !cornerNumber.includes(kingId - 42)
              ) {
                if (
                  kingId - 49 >= 0 &&
                  (board[kingId - 49]?.name.includes("WHITE_BISHOP") ||
                    board[kingId - 49]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: -49,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                } else if (
                  kingId - 49 >= 0 &&
                  board[kingId - 49] == null &&
                  !cornerNumber.includes(kingId - 49)
                ) {
                  if (
                    kingId - 56 >= 0 &&
                    (board[kingId - 56]?.name.includes("WHITE_BISHOP") ||
                      board[kingId - 56]?.name.includes("WHITE_QUREEN"))
                  ) {
                    return {
                      move: -56,
                      chooseTurnItemId: blackKing,
                      kill: false,
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

    // FOR -9 CHECK BISHOP || QUEEN
    if (
      currentLineBetween &&
      kingId - 9 <= currentLineBetween[0] - 8 &&
      kingId - 9 >= 0 &&
      (board[kingId - 9]?.name.includes("WHITE_BISHOP") ||
        board[kingId - 9]?.name.includes("WHITE_QUREEN"))
    ) {
      return {
        move: -9,
        chooseTurnItemId: blackKing,
        kill: true,
      };
    } else if (
      kingId - 9 >= 0 &&
      board[kingId - 9] == null &&
      !cornerNumber.includes(kingId - 9)
    ) {
      if (
        kingId - 18 >= 0 &&
        (board[kingId - 18]?.name.includes("WHITE_BISHOP") ||
          board[kingId - 18]?.name.includes("WHITE_QUREEN"))
      ) {
        return {
          move: -18,
          chooseTurnItemId: blackKing,
          kill: false,
        };
      } else if (
        kingId - 18 >= 0 &&
        board[kingId - 18] == null &&
        !cornerNumber.includes(kingId - 18)
      ) {
        if (
          kingId - 27 >= 0 &&
          (board[kingId - 27]?.name.includes("WHITE_BISHOP") ||
            board[kingId - 27]?.name.includes("WHITE_QUREEN"))
        ) {
          return {
            move: -27,
            chooseTurnItemId: blackKing,
            kill: false,
          };
        } else if (
          kingId - 27 >= 0 &&
          board[kingId - 27] == null &&
          !cornerNumber.includes(kingId - 27)
        ) {
          if (
            kingId - 36 >= 0 &&
            (board[kingId - 36]?.name.includes("WHITE_BISHOP") ||
              board[kingId - 36]?.name.includes("WHITE_QUREEN"))
          ) {
            return {
              move: -36,
              chooseTurnItemId: blackKing,
              kill: false,
            };
          } else if (
            kingId - 36 >= 0 &&
            board[kingId - 36] == null &&
            !cornerNumber.includes(kingId - 36)
          ) {
            if (
              kingId - 45 >= 0 &&
              (board[kingId - 45]?.name.includes("WHITE_BISHOP") ||
                board[kingId - 45]?.name.includes("WHITE_QUREEN"))
            ) {
              return {
                move: -45,
                chooseTurnItemId: blackKing,
                kill: false,
              };
            } else if (
              kingId - 45 >= 0 &&
              board[kingId - 45] == null &&
              !cornerNumber.includes(kingId - 45)
            ) {
              if (
                kingId - 54 >= 0 &&
                (board[kingId - 54]?.name.includes("WHITE_BISHOP") ||
                  board[kingId - 54]?.name.includes("WHITE_QUREEN"))
              ) {
                return {
                  move: -54,
                  chooseTurnItemId: blackKing,
                  kill: false,
                };
              } else if (
                kingId - 54 >= 0 &&
                board[kingId - 54] == null &&
                !cornerNumber.includes(kingId - 54)
              ) {
                if (
                  kingId - 63 >= 0 &&
                  (board[kingId - 63]?.name.includes("WHITE_BISHOP") ||
                    board[kingId - 63]?.name.includes("WHITE_QUREEN"))
                ) {
                  return {
                    move: -63,
                    chooseTurnItemId: blackKing,
                    kill: false,
                  };
                }
              }
            }
          }
        }
      }
      logger.info("=============BISHOP NOT - KILL WHITE TO -9 MOVE =======");
    }

    // END BLACKKING
  }
};

export default kingCheckmate;
