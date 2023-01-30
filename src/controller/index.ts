import { Auth } from "@/controller/auth";
import {
  user as userRepository,
  board as boardRepository,
  column as columnRepository,
  card as cardRepository,
} from "@/db/repositories/repositories";
import {token as tokenService} from "@/services/services";
import { Board } from "./board";
import { Card } from "./card";
import { Column } from "./column";

const auth = new Auth ({
  userRepository,
  tokenService
})

const board = new Board({
  boardRepository,
})

const column = new Column({
  columnRepository,
})

const card = new Card({
  cardRepository,
})

export { auth, board, column, card }