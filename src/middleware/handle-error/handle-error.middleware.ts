import { HttpCode } from "@/common/enums/http/http-code.enum";
import { HttpError } from "@/exeptions/exceptions";
import { ErrorRequestHandler } from "express";

const handleErrorMiddleware: ErrorRequestHandler = (err: HttpError, _req, res, _next) => {
  const { status = HttpCode.INTERNAL_SERVER_ERROR, message, stack } = err;


  return res.status(status).send({
    message,
  });
};

export { handleErrorMiddleware };