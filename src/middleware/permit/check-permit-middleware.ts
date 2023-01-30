import { RequestHandler } from "express";
import { board as boardController } from "@/controller";
import { HttpCode } from "@/common/enums/http/http-code.enum";
import { HttpError } from "@/exeptions/exceptions";
import {BOARD_NOT_FOUND_MESSAGE, FORBIDDEN_MESSAGE} from "@/exeptions/http-errors/constants";
import { User as UserT } from "@/common/types/types";

const checkPermitBoard = (boardIdKey: string = "id"): RequestHandler => async (req, res, next) => {
  const board = await boardController.getById(Number(req.params[boardIdKey]))

  if (!board) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: BOARD_NOT_FOUND_MESSAGE
    })
  }

  if (board.userId !== (<UserT>req.user).id) {
    throw new HttpError({
      status: HttpCode.FORBIDDEN,
      message: FORBIDDEN_MESSAGE
    })
  }

  next()
};

export { checkPermitBoard };