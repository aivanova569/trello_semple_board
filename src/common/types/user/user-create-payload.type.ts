import { UserPayloadKey } from "@/common/enums/user/user-payload-key.enum";
import { UserConfigurePayload } from "./user-configure-payload.type";

type UserCreatePayload = UserConfigurePayload & {
  [UserPayloadKey.PASSWORD]: string;
};

export type { UserCreatePayload };