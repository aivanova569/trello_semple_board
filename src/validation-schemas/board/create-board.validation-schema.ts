import * as Joi from 'joi';
import {BoardPayloadKey} from "@/common/enums/board/board-payload-key.enum";
import { BoardValidationRule } from '@/common/enums/validation/board-validation-rule.enum';
import { BoardValidationMessage } from '@/common/enums/validation/board-validation-message.enum';

const createBoardValidation = Joi.object({
[BoardPayloadKey.TITLE]: Joi.string()
  .trim()
  .required()
  .min(BoardValidationRule.TITLE_MIN_LENGTH)
  .max(BoardValidationRule.TITLE_MAX_LENGTH)
  .messages({
    'string.empty': BoardValidationMessage.BOARD_TITLE_REQUIRE,
    'string.min': BoardValidationMessage.BOARD_TITLE_MIN_LENGTH,
    'string.max': BoardValidationMessage.BOARD_TITLE_MAX_LENGTH,
  }),
  [BoardPayloadKey.DESCRIPTION]: Joi.string()
});

export { createBoardValidation };