import mongoose from "mongoose";
import { IJoinUser, JoinData } from "../interface";

const gameTableDefaultFormat = async (userData: any) => {
  return {
    _id: new mongoose.Types.ObjectId().toString(),
    playerInfo: [userData],
    maxPlayer: 2,
    activePlayer: 1,
    currentTurn: userData._id,
    pieceColor: "white",
    status: "",
    board: [
      {
        id: 0,
        name: "BLACK_ROOK_1",
        isFirstMove: true,
      },
      {
        id: 1,
        name: "BLACK_KNIGHT_1",
        isFirstMove: true,
      },
      {
        id: 2,
        name: "BLACK_BISHOP_1",
        isFirstMove: true,
      },
      {
        id: 3,
        name: "BLACK_QUREEN",
        isFirstMove: true,
      },
      {
        id: 4,
        name: "BLACK_KING",
        isFirstMove: true,
      },
      {
        id: 5,
        name: "BLACK_BISHOP_2",
        isFirstMove: true,
      },
      {
        id: 6,
        name: "BLACK_KNIGHT_2",
        isFirstMove: true,
      },
      {
        id: 7,
        name: "BLACK_ROOK_2",
        isFirstMove: true,
      },
      {
        id: 8,
        name: "BLACK_PAWN_1",
        isFirstMove: true,
      },
      {
        id: 9,
        name: "BLACK_PAWN_2",
        isFirstMove: true,
      },
      {
        id: 10,
        name: "BLACK_PAWN_3",
        isFirstMove: true,
      },
      {
        id: 11,
        name: "BLACK_PAWN_4",
        isFirstMove: true,
      },
      {
        id: 12,
        name: "BLACK_PAWN_5",
        isFirstMove: true,
      },
      {
        id: 13,
        name: "BLACK_PAWN_6",
        isFirstMove: true,
      },
      {
        id: 14,
        name: "BLACK_PAWN_7",
        isFirstMove: true,
      },
      {
        id: 15,
        name: "BLACK_PAWN_8",
        isFirstMove: true,
      },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,

      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,

      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,

      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
        id: 48,
        name: "WHITE_PAWN_1",
        isFirstMove: true,
      },
      {
        id: 49,
        name: "WHITE_PAWN_2",
        isFirstMove: true,
      },
      {
        id: 50,
        name: "WHITE_PAWN_3",
        isFirstMove: true,
      },
      {
        id: 51,
        name: "WHITE_PAWN_4",
        isFirstMove: true,
      },
      {
        id: 52,
        name: "WHITE_PAWN_5",
        isFirstMove: true,
      },
      {
        id: 53,
        name: "WHITE_PAWN_6",
        isFirstMove: true,
      },
      {
        id: 54,
        name: "WHITE_PAWN_7",
        isFirstMove: true,
      },
      {
        id: 55,
        name: "WHITE_PAWN_8",
        isFirstMove: true,
      },

      {
        id: 56,
        name: "WHITE_ROOK_1",
        isFirstMove: true,
      },
      {
        id: 57,
        name: "WHITE_KNIGHT_1",
        isFirstMove: true,
      },
      {
        id: 58,
        name: "WHITE_BISHOP_1",
        isFirstMove: true,
      },
      {
        id: 59,
        name: "WHITE_QUREEN",
        isFirstMove: true,
      },
      {
        id: 60,
        name: "WHITE_KING",
        isFirstMove: true,
      },
      {
        id: 61,
        name: "WHITE_BISHOP_2",
        isFirstMove: true,
      },
      {
        id: 62,
        name: "WHITE_KNIGHT_2",
        isFirstMove: true,
      },
      {
        id: 63,
        name: "WHITE_ROOK_2",
        isFirstMove: true,
      },
    ],
  };
};

const userProfileDefaultFormat = async (data: JoinData) => {
  let { playername, socketId, turn, isBot } = data;
  return {
    _id: new mongoose.Types.ObjectId().toString(),
    playername,
    socketId,
    turn,
    pieceColor: null,
    missTurn: 0,
    isBot,
  };
};

export { gameTableDefaultFormat, userProfileDefaultFormat };
