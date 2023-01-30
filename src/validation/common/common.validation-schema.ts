import { UserPayloadKey } from '@/common/enums/user/user-payload-key.enum';
import { EMAIL_REQUIRE, EMAIL_WRONG } from '@/exeptions/http-errors/constants';
import * as Joi from 'joi';

const common = Joi.object({
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': EMAIL_WRONG,
      'string.empty': EMAIL_REQUIRE,
    }),
});

export { common };