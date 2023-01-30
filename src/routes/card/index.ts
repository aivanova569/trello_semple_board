import { Router } from "express";
import { card as cardC } from "@/controller";
import {handleAsyncApi} from "@/helpers/api/api";
import {HttpCode} from "@/common/enums/http/http-code.enum";
import {checkAuth as checkAuthMiddleware } from "@/middleware/auth/check-auth.middleware";
import { HttpMethod } from "@/common/enums/http/http-method.enum";
import { validateSchema as validateSchemaMiddleware } from "@/middleware/validation/validation.middleware";
import { User as TUser } from "@/common/types/types";
import {ApiPath} from "@/common/enums/api/api-path.enum";
import { CardApiPathEnum } from "@/common/enums/api/card-api-path.enum";
import { createCardValidation } from "@/validation-schemas/card/create-card-validation-schema";
import { updateCardValidation } from "@/validation-schemas/card/updare-card-calidation-schema";
import { checkPermitBoard } from "@/middleware/permit/check-permit-middleware";

type Args = {
  apiRouter: Router;
  cardController: typeof cardC;
};

const initCardApi = ({ apiRouter, cardController }: Args): Router => {
  const cardRouter = Router();

  apiRouter.use(ApiPath.CARD, cardRouter);

  cardRouter.get(
    CardApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const data = await cardController.getById(Number(req.params.id));
      res.json(data).status(HttpCode.OK);
    }),
  );

  cardRouter.post(
    CardApiPathEnum.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createCardValidation),
    handleAsyncApi(async (req, res) => {
      const data = await cardController.create({...req.body, userId: (<TUser>req.user).id});
      res.json(data).status(HttpCode.CREATED);
    }),
  );

  cardRouter.patch(
    CardApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.PATCH),
    validateSchemaMiddleware(updateCardValidation),
    handleAsyncApi(async (req, res) => {
      const data = await cardController.update(Number(req.params.id), req.body);
      res.json(data).status(HttpCode.OK);
    }),
  );

  cardRouter.delete(
    CardApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    handleAsyncApi(async (req, res) => {
      await cardController.delete(Number(req.params.id));
      res.send('Deleted').status(HttpCode.OK);
    })
  );

  cardRouter.get(
    CardApiPathEnum.$BY_BOARD_ID,
    checkAuthMiddleware(HttpMethod.GET),
    checkPermitBoard('boardId'),
    handleAsyncApi(async (req, res) => {
      const data = await cardController.getByBoardId(Number(req.params.boardId));

      res.json(data).status(HttpCode.OK);
    })
  );

  return cardRouter;
}

export { initCardApi };