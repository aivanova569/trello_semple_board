import { Router } from "express";
import { initAuthApi } from "./auth";
import {
  auth as authController,
  board as boardController,
  column as columnController,
  card as cardController,
} from "@/controller";
import { ENV } from "@/common/enums/app/app";
import { initBoardApi } from "./board";
import { initColumnApi } from "./columns";
import { initCardApi } from "./card";

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API.V1_PREFIX, apiRouter);

  initAuthApi({
    apiRouter,
    authController,
  });

  initBoardApi({
    apiRouter,
    boardController,
  });

  initColumnApi({
    apiRouter,
    columnController,
  });

  initCardApi({
    apiRouter,
    cardController,
  });

  return apiRouter;
};

export { initApi };