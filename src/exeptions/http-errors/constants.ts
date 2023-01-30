import { UserValidationRule } from "@/common/enums/validation/user-validation-rule.enum";

export const DEFAULT_MESSAGE = 'Network Error';
export const USER_NOT_FOUND_MESSAGE = 'User not found';
export const BOARD_NOT_FOUND_MESSAGE = 'Board not found';
export const WRONG_PASSWORD = 'Wrong password';
export const EMAIL_WRONG = 'Email is wrong';
export const EMAIL_REQUIRE = 'Email is required';
export const PASSWORD_REQUIRE = "Password is required";
export const PASSWORD_MIN_LENGTH = `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`;
export const PASSWORD_MAX_LENGTH = `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`;
export const BAD_TOKEN = 'Token is invalid';
export const FORBIDDEN_MESSAGE = 'Is forbidden from accessing a valid URL';