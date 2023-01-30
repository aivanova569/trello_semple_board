import { ColumnValidationRule } from "./column-validation-rule.enum";


const ColumnValidationMessage = {
  COLUMN_TITLE_REQUIRE: 'Title is required',
  COLUMN_TITLE_MIN_LENGTH: `Title must be at least ${ColumnValidationRule.TITLE_MIN_LENGTH} character long`,
  COLUMN_TITLE_MAX_LENGTH: `Title must be at most ${ColumnValidationRule.TITLE_MAX_LENGTH} character long`,
  COLUMN_ORDER_REQUIRE: 'Order is required',
  BOARD_ID_REQUIRE: 'Board ID is required',
} as const;

export { ColumnValidationMessage };