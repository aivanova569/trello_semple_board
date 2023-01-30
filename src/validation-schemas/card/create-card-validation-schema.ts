import * as Joi from 'joi';
import {ColumnPayloadKey} from "@/common/enums/column/column-payload-key.enum";
import {CardValidationRule} from "@/common/enums/validation/card-validation-rule.enum";
import { CardValidationMessage } from '@/common/enums/validation/card-validation-messages.enum';
import { CardPayloadKey } from '@/common/enums/card/card-payload-key.enum';

const createCardValidation = Joi.object({
[ColumnPayloadKey.TITLE]: Joi.string()
  .trim()
  .required()
  .min(CardValidationRule.TITLE_MIN_LENGTH)
  .max(CardValidationRule.TITLE_MAX_LENGTH)
  .messages({
    'string.empty': CardValidationMessage.CARD_TITLE_REQUIRE,
    'string.min': CardValidationMessage.CARD_TITLE_MIN_LENGTH,
    'string.max': CardValidationMessage.CARD_TITLE_MAX_LENGTH,
  }),
  [CardPayloadKey.BOARD_ID]: Joi.number()
    .required()
    .messages({
      'string.empty': CardValidationMessage.BOARD_ID_REQUIRE,
    }),
  [CardPayloadKey.ORDER]: Joi.number()
    .required()
    .messages({
      'string.empty': CardValidationMessage.CARD_ORDER_REQUIRE,
    }),
  [CardPayloadKey.COLUMN_ID]: Joi.number()
    .required()
    .messages({
      'string.empty': CardValidationMessage.COLUMN_ID_REQUIRE,
    }),
});

export { createCardValidation };