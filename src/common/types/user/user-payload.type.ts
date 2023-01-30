import { UserPayloadKey } from "@/common/enums/user/user-payload-key.enum";

type UserPayload = {
  [UserPayloadKey.EMAIL]: string;
};

export type { UserPayload };