import { CustomExceptionName } from "../../common/enums/exeptions/custom-exception-name.enum";
import { HttpCode } from "@/common/enums/http/http-code.enum";
import { DEFAULT_MESSAGE } from "./constants";

class HttpError extends Error {
  status: HttpCode;

  constructor({
      status = HttpCode.INTERNAL_SERVER_ERROR,
      message = DEFAULT_MESSAGE,
    } = {}) {
    super(message);
    this.status = status;
    this.name = CustomExceptionName.HTTP_ERROR;
  }
}

export { HttpError };