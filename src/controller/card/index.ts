import { HttpError } from "@/exeptions/exceptions";
import { HttpCode } from "@/common/enums/http/http-code.enum";
import { card as cardRep } from "@/db/repositories/repositories";
import { CardCreateDTOPayload } from "@/common/types/card/card-create-dto-payload.type";
import { Card as TCard } from "@/common/types/card/card.type";
import { CardLoadFilter } from "@/common/types/card/card-load-filter.type";
import { CardUpdateDTOPayload } from "@/common/types/card/card-update-dto-payload.type";

type Constructor = {
  cardRepository: typeof cardRep;
};

class Card {
  #cardRepository: typeof cardRep;

  constructor({ cardRepository }: Constructor) {
    this.#cardRepository = cardRepository;
  }

  public create(payload: CardCreateDTOPayload): Promise<TCard> {
    return this.#cardRepository.create(payload);
  }

  public delete(id: number): Promise<number> {
    return this.#cardRepository.delete(id);
  }

  public async update(id: number, payload: CardUpdateDTOPayload): Promise<TCard> {
    const data = await this.#cardRepository.update(id, payload);
    return data;
  }

  public async getById(id: number): Promise<TCard | null> {
    const data = await this.#cardRepository.getById(id);

    if(!data) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: `Card with id ${id} not found`,
      });
    }
    return data;
  }

  public async getAll(filter: CardLoadFilter): Promise<TCard[]> {
    const data = await this.#cardRepository.getAll(filter);
    return data;
  }

  public getByBoardId(boardId: number): Promise<TCard[]> {
    return this.#cardRepository.getByBoardId(boardId);
  }

};

export { Card };