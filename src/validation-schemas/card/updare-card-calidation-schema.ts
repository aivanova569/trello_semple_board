import * as Joi from 'joi';
import {ColumnPayloadKey} from "@/common/enums/column/column-payload-key.enum";
import {CardValidationRule} from "@/common/enums/validation/card-validation-rule.enum";
import { CardValidationMessage } from '@/common/enums/validation/card-validation-messages.enum';
import { CardPayloadKey } from '@/common/enums/card/card-payload-key.enum';

const updateCardValidation = Joi.object({
  [ColumnPayloadKey.TITLE]: Joi.string()
    .trim()
    .min(CardValidationRule.TITLE_MIN_LENGTH)
    .max(CardValidationRule.TITLE_MAX_LENGTH)
    .messages({
      'string.empty': CardValidationMessage.CARD_TITLE_REQUIRE,
      'string.min': CardValidationMessage.CARD_TITLE_MIN_LENGTH,
      'string.max': CardValidationMessage.CARD_TITLE_MAX_LENGTH,
    }),
  [CardPayloadKey.ORDER]: Joi.number()
    .messages({
      'string.empty': CardValidationMessage.CARD_ORDER_REQUIRE,
    }),
  [CardPayloadKey.COLUMN_ID]: Joi.number()
    .messages({
      'string.empty': CardValidationMessage.COLUMN_ID_REQUIRE,
    }),
});

export { updateCardValidation };