import { BoardLoadFilter } from "@/common/types/board/board-load-filter.type";
import { board as boardRep } from "@/db/repositories/repositories";
import { Board as TBoard } from "@/common/types/board/board.type";
import { BoardCreateDTOPayload } from "@/common/types/board/board-create-dto-payload.type";
import {ResponseList as TResponseList} from "@/common/types/app/response-list.type";
import { HttpError } from "@/exeptions/exceptions";
import { HttpCode } from "@/common/enums/http/http-code.enum";

type Constructor = {
  boardRepository: typeof boardRep;
};

class Board {
  #boardRepository: typeof boardRep;

  constructor({ boardRepository }: Constructor) {
    this.#boardRepository = boardRepository;
  }

  public create(payload: BoardCreateDTOPayload): Promise<TBoard> {
    return this.#boardRepository.create(payload);
  }

  public delete(id: number): Promise<number> {
    return this.#boardRepository.delete(id);
  }

  public async getAll(filter: BoardLoadFilter): Promise<TResponseList<TBoard>> {
    const data = await this.#boardRepository.getAll(filter);
    return data;
  }

  public async getById(id: number): Promise<TBoard | null> {
    const data = await this.#boardRepository.getById(id);

    if(!data) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: `Board with id ${id} not found`,
      });
    }
    return data;
  }

};

export { Board };