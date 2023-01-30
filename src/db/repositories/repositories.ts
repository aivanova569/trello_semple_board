import { User } from "./user/user.repository";
import { User as UserModel } from "@/model/users/user-model";
import { Board } from "./board/board.repository";
import { Board as BoardModel } from "@/model/boards/board-model";
import { Column as ColumnModel } from "@/model/columns/column-model";
import { Column } from "./column/column.repository";
import { Card } from "./card/card.repository";
import { Card as CardModel } from "@/model/cards/card-model";

export const user = new User({
  UserModel,
});

export const board = new Board({
  BoardModel,
});

export const column = new Column({
  ColumnModel,
});

export const card = new Card({
  CardModel,
});