import { RequestHandler } from "express";
import { ValidationSchema } from "@/common/types/types";
import { HttpError } from "../../exeptions/exceptions";
import { HttpCode } from "@/common/enums/http/http-code.enum";

const validateSchema = (schema: ValidationSchema): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: JSON.stringify(error),
      });
    }

    next();
  };

  return handler;
};

export { validateSchema };