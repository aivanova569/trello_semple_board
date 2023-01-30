import { Router } from "express";
import { board as boardC } from "@/controller";
import { ApiPath } from "@/common/enums/api/api-path.enum";
import {handleAsyncApi} from "@/helpers/api/api";
import {HttpCode} from "@/common/enums/http/http-code.enum";
import {checkAuth as checkAuthMiddleware } from "@/middleware/auth/check-auth.middleware";
import { HttpMethod } from "@/common/enums/http/http-method.enum";
import {BoardApiPathEnum} from "@/common/enums/api/board-api-path.enum";
import { validateSchema as validateSchemaMiddleware } from "@/middleware/validation/validation.middleware";
import { createBoardValidation } from "@/validation-schemas/board/create-board.validation-schema";
import { User as TUser } from "@/common/types/types";
import {BoardLoadFilter} from "@/common/types/board/board-load-filter.type";
import {checkPermitBoard} from "@/middleware/permit/check-permit-middleware";

type Args = {
  apiRouter: Router;
  boardController: typeof boardC;
};

const initBoardApi = ({ apiRouter, boardController }: Args): Router => {
  const boardRouter = Router();

  apiRouter.use(ApiPath.BOARD, boardRouter);

  boardRouter.get(
    BoardApiPathEnum.ROOT,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {

      const data = await boardController.getAll({
        limit: Number(req.query.limit),
        offset: Number(req.query.offset),
        userId: (<TUser>req.user).id,
      } as BoardLoadFilter);
      res.json(data).status(HttpCode.OK);
    }),
  );

  boardRouter.delete(
    BoardApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    handleAsyncApi(async (req, res) => {
      await boardController.delete(Number(req.params.id));
      res.send('Deleted').status(HttpCode.OK);
    })
  );

  boardRouter.get(
    BoardApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    checkPermitBoard(),
    handleAsyncApi(async (req, res) => {
      const data = await boardController.getById(Number(req.params.id));
      res.json(data).status(HttpCode.OK);
    }),
  );

  boardRouter.post(
    "",
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createBoardValidation),
    handleAsyncApi(async (req, res) => {
      const data = await boardController.create({...req.body, userId: (<TUser>req.user).id});
      res.json(data).status(HttpCode.CREATED);
    }),
  );

  return boardRouter;
}

export { initBoardApi };