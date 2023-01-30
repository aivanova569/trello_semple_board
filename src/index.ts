import dotenv from "dotenv";
import { useExpressServer } from "routing-controllers";
import express, {Express, RequestHandler} from "express";
import bodyParser from "body-parser";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import { GlobalErrorHandler } from "./middleware/global-error-handler";
import * as swaggerDocument from "./swagger/openapi.json";
// import cors from 'cors';
import { initApi } from "./routes";
import dbConnection from "@/common/db-connection";
import { identifyUser as identifyUserMiddleware } from "./middleware/identify-user/identify-user.middleware";
import { passport as passportService } from "./services/services";
import { handleErrorMiddleware } from "./middleware/handle-error/handle-error.middleware";



dotenv.config();

const port = process.env.PORT;

const app: Express = express();
// app.use(cors() as RequestHandler);
app.use(bodyParser.json());

app.use(passport.initialize());
passportService.init(passport);

app.use(identifyUserMiddleware);

initApi(app);

app.use(handleErrorMiddleware);

useExpressServer(app, {
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

(async () => {
  try {
    await dbConnection.sync({force: false})

    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();