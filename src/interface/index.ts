export interface IJoinUser {
  _id: string;
  playername: string;
  socketId: string;
  turn: boolean;
  tableId: string;
  userId: string;
  pieceColor: string;
  missTurn: Number;
  isBot: boolean;
}

export interface IUser {
  _id?: string;
  playername?: string;
  turn?: boolean;
  socketId?: string;
  pieceColor?: string | null;
  missTurn?: number;
  isBot?: boolean;
}

export interface IBoardObject {
  id: Number;
  name: String;
  isFirstMove: Boolean;
}

export interface IChess {
  _id: string;
  playerInfo: IUser[];
  currentTurn: String | null | undefined;
  board: (IBoardObject | null)[];
  maxPlayer: Number;
  activePlayer: Number;
  pieceColor: String | null | undefined;
  status: String;
}

interface ISelectChessItem {
  indexofChesscheck: Number;
}

export interface IMoveBoard {
  emptyBox: object;
  tableId: string;
  pieceId: string;
  selectChessItem: ISelectChessItem[];
  number: Number;
  killPieceId: String | null;
  className: String;
  pieceColor: String;
  nextTurn: string | null;
  turnMessage: string;
}

interface ISelectChessItem {
  indexofChesscheck: Number;
}

export interface IMoveBoard {
  emptyBox: object;
  tableId: string;
  pieceId: string;
  selectChessItem: ISelectChessItem[];
  number: Number;
  killPieceId: String | null;
  className: String;
  pieceColor: String;
  nextTurn: string | null;
  turnMessage: string;
}

export interface IUpdateBoard {
  tableId: string;
  chessBoard: Array<IChessBoard>;
}

interface IChessBoard {
  id: Number;
  name: String;
  isFirstMove: Boolean;
}

export interface ILeaveTable {
  tableId: string;
  userId: string;
}

export interface IWinData {
  tableId: string;
  userId: string;
  pieceColor: string;
}

export interface JoinData {
  playername?: string;
  socketId?: string;
  turn?: boolean;
  isBot?: boolean;
  tableId?: string;
  userId?: string;
}
