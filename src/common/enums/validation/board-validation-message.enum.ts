import {BoardValidationRule} from "@/common/enums/validation/board-validation-rule.enum";

const BoardValidationMessage = {
  BOARD_TITLE_REQUIRE: 'Title is required',
  BOARD_TITLE_MIN_LENGTH: `Title must be at least ${BoardValidationRule.TITLE_MIN_LENGTH} character long`,
  BOARD_TITLE_MAX_LENGTH: `Title must be at most ${BoardValidationRule.TITLE_MAX_LENGTH} character long`,
} as const;

export { BoardValidationMessage };