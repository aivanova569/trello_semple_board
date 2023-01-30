import { Router } from "express";
import { column as columnC } from "@/controller";
import {handleAsyncApi} from "@/helpers/api/api";
import {HttpCode} from "@/common/enums/http/http-code.enum";
import {checkAuth as checkAuthMiddleware } from "@/middleware/auth/check-auth.middleware";
import { HttpMethod } from "@/common/enums/http/http-method.enum";
import { validateSchema as validateSchemaMiddleware } from "@/middleware/validation/validation.middleware";
import { User as TUser } from "@/common/types/types";
import { ColumnApiPathEnum } from "@/common/enums/api/column-api-path.enum";
import { createColumnValidation } from "@/validation-schemas/column/create-column-validation-schema";
import {ApiPath} from "@/common/enums/api/api-path.enum";
import {updateColumnValidation} from "@/validation-schemas/column/update-column.validation-schema";

type Args = {
  apiRouter: Router;
  columnController: typeof columnC;
};

const initColumnApi = ({ apiRouter, columnController }: Args): Router => {
  const columnRouter = Router();

  apiRouter.use(ApiPath.COLUMN, columnRouter);

  columnRouter.get(
    ColumnApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const data = await columnController.getById(Number(req.params.id));
      res.json(data).status(HttpCode.OK);
    }),
  );

  columnRouter.post(
    ColumnApiPathEnum.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(createColumnValidation),
    handleAsyncApi(async (req, res) => {
      const data = await columnController.create({...req.body, userId: (<TUser>req.user).id});
      res.json(data).status(HttpCode.CREATED);
    }),
  );

  columnRouter.patch(
    ColumnApiPathEnum.$ID,
    checkAuthMiddleware(HttpMethod.PATCH),
    validateSchemaMiddleware(updateColumnValidation),
    handleAsyncApi(async (req, res) => {
      const data = await columnController.update(Number(req.params.id), req.body);
      res.json(data).status(HttpCode.OK);
    }),
  );

  return columnRouter;
}

export { initColumnApi };