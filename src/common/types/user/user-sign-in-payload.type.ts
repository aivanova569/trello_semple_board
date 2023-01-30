import { UserPayloadKey } from "@/common/enums/user/user-payload-key.enum";
import { UserPayload } from "./user-payload.type";

type UserSignInPayload = UserPayload & {
  [UserPayloadKey.PASSWORD]: string;
};

export type { UserSignInPayload };