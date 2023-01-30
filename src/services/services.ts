import passportJwt from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import { ENV } from "@/common/enums/app/app";
import { Passport } from "./passport/passport.service";
import { Token } from "./token/token.service";
import { user as userRepository } from "@/db/repositories/repositories";


export const token = new Token({
  secret: <string>ENV.JWT.SECRET,
});

export const passport = new Passport({
  secret: <string>ENV.JWT.SECRET,
  passportJwt,
  LocalStrategy,
  userRepository,
});