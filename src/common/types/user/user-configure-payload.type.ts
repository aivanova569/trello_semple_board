import { UserPayloadKey } from "@/common/enums/user/user-payload-key.enum";
import { UserPayload } from "./user-payload.type";

type UserConfigurePayload = UserPayload & {
  [UserPayloadKey.USERNAME]: string;
};

export type { UserConfigurePayload };