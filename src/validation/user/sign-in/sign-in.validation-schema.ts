import { common } from "@/validation/common/common.validation-schema";
import {UserPayloadKey} from "@/common/enums/user/user-payload-key.enum";
import * as Joi from "joi";
import { UserValidationRule } from "@/common/enums/validation/user-validation-rule.enum";
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REQUIRE } from "@/exeptions/http-errors/constants";

const signIn = common.keys({
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PASSWORD_REQUIRE,
      'string.min': PASSWORD_MIN_LENGTH,
      'string.max': PASSWORD_MAX_LENGTH,
    }),
});

export { signIn };