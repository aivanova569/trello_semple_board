import { Column as TColumn } from "@/common/types/column/column.type";
import { Op } from "sequelize";
import {Card as CardM} from "@/model/cards/card-model";
import { CardCreateDTOPayload } from "@/common/types/card/card-create-dto-payload.type";
import { Card as TCard, Board as TBoard } from "@/common/types/types";
import { CardLoadFilter } from "@/common/types/card/card-load-filter.type";
import { CardUpdateDTOPayload } from "@/common/types/card/card-update-dto-payload.type";



type Constructor = {
  CardModel: typeof CardM;
};

class Card {
  #CardModel: typeof CardM;

  constructor({ CardModel }: Constructor) {
    this.#CardModel = CardModel;
  }

  public create(payload: CardCreateDTOPayload): Promise<TCard> {
    return this.#CardModel.create(payload);
  }

  public delete(id: number): Promise<number> {
    return this.#CardModel.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  public async update(id: number, payload: CardUpdateDTOPayload): Promise<TCard> {
    const column = await this.#CardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
    return column?.update(payload) as Promise<TCard>;
  }

  public getById(id: number): Promise<TCard | null> {
    return this.#CardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  public getAll(filter: CardLoadFilter): Promise<TColumn[]> {
    return this.#CardModel.findAll({
      offset: filter.offset || 0,
      limit: filter.limit || 10,
      where: {
        boardId: {
          [Op.eq]: filter.boardId
        }
      }
    });
  }

  public getByBoardId(boardId: number): Promise<TCard[]> {
    return this.#CardModel.findAll({
      where: {
        boardId: {
          [Op.eq]: boardId
        }
      }
    });
  }

}

export { Card };