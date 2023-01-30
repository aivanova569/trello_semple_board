import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import passportJwt from "passport-jwt";
import { user as userRepository } from "@/db/repositories/repositories";
import { UserPayloadKey } from "@/common/enums/user/user-payload-key.enum";
import { HttpCode } from "@/common/enums/http/http-code.enum";
import {BAD_TOKEN, USER_NOT_FOUND_MESSAGE, WRONG_PASSWORD} from "@/exeptions/http-errors/constants";
import { checkIsCryptsEqual } from "@/helpers/crypt/check-is-crypts-equal.helper";
import { StrategyName } from "@/common/enums/strategy/strategy-name.enum";


type Constructor = {
  secret: string;
  passportJwt: typeof passportJwt;
  LocalStrategy: typeof LocalStrategy;
  userRepository: typeof userRepository;
};

class Passport {
  #options: passportJwt.StrategyOptions;
  #JwtStrategy;
  #LocalStrategy;
  #userRepository;

  constructor(
    {
      secret,
      passportJwt,
      LocalStrategy,
      userRepository,
    }: Constructor) {
    this.#options = {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    };
    this.#JwtStrategy = passportJwt.Strategy;
    this.#LocalStrategy = LocalStrategy;
    this.#userRepository = userRepository;
  }

  private getLoginStrategy(): passportJwt.Strategy {
    return new this.#LocalStrategy(
      {
        usernameField: UserPayloadKey.EMAIL,
      },
      async (email, password, done) => {
        try {
          const user = await this.#userRepository.getByEmail(email);
          if (!user) {
            return done(
              {
                status: HttpCode.UNAUTHORIZED,
                message: USER_NOT_FOUND_MESSAGE,
              },
              false,
            );
          }
          const hashPassword = await this.#userRepository.getPasswordByEmail(email);

          const isCryptsEqual = await checkIsCryptsEqual(
            password,
            hashPassword as string,
          );

          return isCryptsEqual
            ? done(null, user)
            : done(
              {
                status: HttpCode.UNAUTHORIZED,
                message: WRONG_PASSWORD,
              },
              false,
            );
        } catch (err) {
          return done(err);
        }
      },
    );
  }

  private getJwtStrategy(): passportJwt.Strategy {
    return new this.#JwtStrategy(this.#options, async ({ userId }, done) => {
      try {
        const user = await this.#userRepository.getById(userId);

        if (user) {
          return done(null, user);
        }

        return done(
          {
            status: HttpCode.UNAUTHORIZED,
            message: BAD_TOKEN,
          },
          null as never,
        );
      } catch (err) {
        return done(err);
      }
    });
  }

  public init(passport: PassportStatic): void {
    passport.use(this.getJwtStrategy());
    passport.use(StrategyName.LOGIN, this.getLoginStrategy());
  }
}

export { Passport };
