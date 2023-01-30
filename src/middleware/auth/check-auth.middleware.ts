import { Response, Request, NextFunction, RequestHandler } from "express";
import { HttpMethod } from "@/common/enums/http/http-method.enum";
import { jwt as jwtMiddleWare } from "../jwt/jwt.middleware";

const checkAuth = (...methods: HttpMethod[]): RequestHandler => {
  const handler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    methods.some((method) => method === req.method)
      ? jwtMiddleWare(req, res, next)
      : next();
  };

  return handler;
};

export { checkAuth };