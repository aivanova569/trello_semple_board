import {CardValidationRule} from "@/common/enums/validation/card-validation-rule.enum";

const CardValidationMessage = {
  CARD_TITLE_REQUIRE: 'Title is required',
  CARD_TITLE_MIN_LENGTH: `Title must be at least ${CardValidationRule.TITLE_MIN_LENGTH} character long`,
  CARD_TITLE_MAX_LENGTH: `Title must be at most ${CardValidationRule.TITLE_MAX_LENGTH} character long`,
  CARD_ORDER_REQUIRE: 'Order is required',
  BOARD_ID_REQUIRE: 'Board ID is required',
  COLUMN_ID_REQUIRE: 'Column ID is required',
} as const;

export { CardValidationMessage };