import { ApiPath } from "../../common/enums/api/api-path.enum";
import { AuthApiPath } from "../../common/enums/api/auth-api-path.enum";
import { HttpCode } from "../../common/enums/http/http-code.enum";
import { authentication as authenticationMiddleware } from "../../middleware/auth/authentication.middleware";
import { validateSchema as validateSchemaMiddleware } from "../../middleware/validation/validation.middleware";
import { Router } from "express";
import { signIn as signInValidationSchema } from "@/validation/user/sign-in/sign-in.validation-schema";
import { handleAsyncApi } from "@/helpers/api/api";
import { auth as authC } from "@/controller";

type Args = {
  apiRouter: Router;
  authController: typeof authC;
};

const initAuthApi = ({ apiRouter, authController }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.AUTH, userRouter);

  userRouter.post(
    AuthApiPath.SIGN_IN,
    authenticationMiddleware,
    validateSchemaMiddleware(signInValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authController.signIn(req.body);

      res.json(user).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initAuthApi };