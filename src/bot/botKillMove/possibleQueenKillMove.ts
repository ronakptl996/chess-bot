import { IBoardObject, IChess } from "../../interface";
import { cornerNumber, currentLine } from "../../utils";

const possibleQueenKillMove = async (
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
  }

  // FOR KILL WHITE TO +9 MOVE
  if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
    board[Number(chooseTurnItem.id) + 9]?.name.includes("WHITE")
  ) {
    return {
      move: 9,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    Number(chooseTurnItem.id) + 9 <= 63 &&
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
                return {
                  move: 56,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            } else if (
              board[Number(chooseTurnItem.id) + 48]?.name.includes("WHITE")
            ) {
              return {
                move: 48,
                chooseTurnItemId: chooseTurnItem,
              };
            }
          } else if (
            board[Number(chooseTurnItem.id) + 40]?.name.includes("WHITE")
          ) {
            return {
              move: 40,
              chooseTurnItemId: chooseTurnItem,
            };
          }
        } else if (
          board[Number(chooseTurnItem.id) + 32]?.name.includes("WHITE")
        ) {
          return {
            move: 32,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      } else if (
        board[Number(chooseTurnItem.id) + 24]?.name.includes("WHITE")
      ) {
        return {
          move: 24,
          chooseTurnItemId: chooseTurnItem,
        };
      }
    } else if (board[Number(chooseTurnItem.id) + 16]?.name.includes("WHITE")) {
      return {
        move: 16,
        chooseTurnItemId: chooseTurnItem,
      };
    }
  } else if (board[Number(chooseTurnItem.id) + 8]?.name.includes("WHITE")) {
    return {
      move: 8,
      chooseTurnItemId: chooseTurnItem,
    };
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
                  return {
                    move: 7,
                    chooseTurnItemId: chooseTurnItem,
                  };
                }
              } else if (
                Number(chooseTurnItem.id) + 6 <= currentLineBetween[1] &&
                board[Number(chooseTurnItem.id) + 6]?.name.includes("WHITE")
              ) {
                return {
                  move: 6,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            } else if (
              Number(chooseTurnItem.id) + 5 <= currentLineBetween[1] &&
              board[Number(chooseTurnItem.id) + 5]?.name.includes("WHITE")
            ) {
              return {
                move: 5,
                chooseTurnItemId: chooseTurnItem,
              };
            }
          } else if (
            Number(chooseTurnItem.id) + 4 <= currentLineBetween[1] &&
            board[Number(chooseTurnItem.id) + 4]?.name.includes("WHITE")
          ) {
            return {
              move: 4,
              chooseTurnItemId: chooseTurnItem,
            };
          }
        } else if (
          Number(chooseTurnItem.id) + 3 <= currentLineBetween[1] &&
          board[Number(chooseTurnItem.id) + 3]?.name.includes("WHITE")
        ) {
          return {
            move: 3,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      } else if (
        Number(chooseTurnItem.id) + 2 <= currentLineBetween[1] &&
        board[Number(chooseTurnItem.id) + 2]?.name.includes("WHITE")
      ) {
        return {
          move: 2,
          chooseTurnItemId: chooseTurnItem,
        };
      }
    } else if (
      Number(chooseTurnItem.id) + 1 <= currentLineBetween[1] &&
      board[Number(chooseTurnItem.id) + 1]?.name.includes("WHITE")
    ) {
      return {
        move: 1,
        chooseTurnItemId: chooseTurnItem,
      };
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
                  return {
                    move: -7,
                    chooseTurnItemId: chooseTurnItem,
                  };
                }
              } else if (
                Number(chooseTurnItem.id) - 6 >= currentLineBetween[0] &&
                board[Number(chooseTurnItem.id) - 6]?.name.includes("WHITE")
              ) {
                return {
                  move: -6,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            } else if (
              Number(chooseTurnItem.id) - 5 >= currentLineBetween[0] &&
              board[Number(chooseTurnItem.id) - 5]?.name.includes("WHITE")
            ) {
              return {
                move: -5,
                chooseTurnItemId: chooseTurnItem,
              };
            }
          } else if (
            Number(chooseTurnItem.id) - 4 >= currentLineBetween[0] &&
            board[Number(chooseTurnItem.id) - 4]?.name.includes("WHITE")
          ) {
            return {
              move: -4,
              chooseTurnItemId: chooseTurnItem,
            };
          }
        } else if (
          Number(chooseTurnItem.id) - 3 >= currentLineBetween[0] &&
          board[Number(chooseTurnItem.id) - 3]?.name.includes("WHITE")
        ) {
          return {
            move: -3,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      } else if (
        Number(chooseTurnItem.id) - 2 >= currentLineBetween[0] &&
        board[Number(chooseTurnItem.id) - 2]?.name.includes("WHITE")
      ) {
        return {
          move: -2,
          chooseTurnItemId: chooseTurnItem,
        };
      }
    } else if (
      Number(chooseTurnItem.id) - 1 >= currentLineBetween[0] &&
      board[Number(chooseTurnItem.id) - 1]?.name.includes("WHITE")
    ) {
      return {
        move: -1,
        chooseTurnItemId: chooseTurnItem,
      };
    }
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
  }

  // FOR KILL WHITE TO -9 MOVE
  if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
    board[Number(chooseTurnItem.id) - 9]?.name.includes("WHITE")
  ) {
    return {
      move: -9,
      chooseTurnItemId: chooseTurnItem,
    };
  } else if (
    Number(chooseTurnItem.id) - 9 >= 0 &&
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
                return {
                  move: -56,
                  chooseTurnItemId: chooseTurnItem,
                };
              }
            } else if (
              Number(chooseTurnItem.id) - 48 >= 0 &&
              board[Number(chooseTurnItem.id) - 48]?.name.includes("WHITE")
            ) {
              return {
                move: -48,
                chooseTurnItemId: chooseTurnItem,
              };
            }
          } else if (
            Number(chooseTurnItem.id) - 40 >= 0 &&
            board[Number(chooseTurnItem.id) - 40]?.name.includes("WHITE")
          ) {
            return {
              move: -40,
              chooseTurnItemId: chooseTurnItem,
            };
          }
        } else if (
          Number(chooseTurnItem.id) - 32 >= 0 &&
          board[Number(chooseTurnItem.id) - 32]?.name.includes("WHITE")
        ) {
          return {
            move: -32,
            chooseTurnItemId: chooseTurnItem,
          };
        }
      } else if (
        Number(chooseTurnItem.id) - 24 >= 0 &&
        board[Number(chooseTurnItem.id) - 24]?.name.includes("WHITE")
      ) {
        return {
          move: -24,
          chooseTurnItemId: chooseTurnItem,
        };
      }
    } else if (
      Number(chooseTurnItem.id) - 16 >= 0 &&
      board[Number(chooseTurnItem.id) - 16]?.name.includes("WHITE")
    ) {
      return {
        move: -16,
        chooseTurnItemId: chooseTurnItem,
      };
    }
  } else if (
    Number(chooseTurnItem.id) - 8 >= 0 &&
    board[Number(chooseTurnItem.id) - 8]?.name.includes("WHITE")
  ) {
    return {
      move: -8,
      chooseTurnItemId: chooseTurnItem,
    };
  }
};

export default possibleQueenKillMove;
