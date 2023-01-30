import { HttpCode } from "@/common/enums/http/http-code.enum";
import { SignResponse, UserSignInPayload } from "@/common/types/types";
import { user as userRep } from "@/db/repositories/repositories";
import { HttpError } from "../../exeptions/exceptions";
import { USER_NOT_FOUND_MESSAGE, WRONG_PASSWORD } from "@/exeptions/http-errors/constants";
import { checkIsCryptsEqual } from "@/helpers/crypt/check-is-crypts-equal.helper";
import { token } from "@/services/services";

type Constructor = {
  userRepository: typeof userRep;
  tokenService: typeof token;
};

class Auth {
  #userRepository: typeof userRep;
  #tokenService: typeof token;

  constructor({ userRepository, tokenService }: Constructor) {
    this.#userRepository = userRepository;
    this.#tokenService = tokenService;
  }

  public async signIn(payload: UserSignInPayload): Promise<SignResponse> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: USER_NOT_FOUND_MESSAGE,
      });
    }

    const hashPassword = await this.#userRepository.getPasswordByEmail(email);

    const isCryptsEqual = await checkIsCryptsEqual(password, hashPassword as string);

    if (!isCryptsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: WRONG_PASSWORD,
      });
    }

    const token = this.#tokenService.create({
      userId: user.id as number,
    });

    return {
      token,
      user,
    };
  }
}

export { Auth };