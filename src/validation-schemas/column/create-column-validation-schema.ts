import * as Joi from 'joi';
import {ColumnPayloadKey} from "@/common/enums/column/column-payload-key.enum";
import { ColumnValidationRule } from '@/common/enums/validation/column-validation-rule.enum';
import { ColumnValidationMessage } from '@/common/enums/validation/column-validation-messages.enum';

const createColumnValidation = Joi.object({
[ColumnPayloadKey.TITLE]: Joi.string()
  .trim()
  .required()
  .min(ColumnValidationRule.TITLE_MIN_LENGTH)
  .max(ColumnValidationRule.TITLE_MAX_LENGTH)
  .messages({
    'string.empty': ColumnValidationMessage.COLUMN_TITLE_REQUIRE,
    'string.min': ColumnValidationMessage.COLUMN_TITLE_MIN_LENGTH,
    'string.max': ColumnValidationMessage.COLUMN_TITLE_MAX_LENGTH,
  }),
  [ColumnPayloadKey.BOARD_ID]: Joi.number()
    .required()
    .messages({
      'string.empty': ColumnValidationMessage.BOARD_ID_REQUIRE,
    }),
  [ColumnPayloadKey.ORDER]: Joi.number()
    .required()
    .messages({
      'string.empty': ColumnValidationMessage.COLUMN_ORDER_REQUIRE,
    }),
});

export { createColumnValidation };