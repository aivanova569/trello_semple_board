import { Board as BoardM } from "@/model/boards/board-model";
import { BoardCreateDTOPayload } from "@/common/types/board/board-create-dto-payload.type";
import { Board as TBoard } from "@/common/types/board/board.type";
import { Op } from "sequelize";
import { BoardLoadFilter } from "@/common/types/board/board-load-filter.type";
import { ResponseList as TResponseList } from "@/common/types/types";
import { Column as ColumnM } from "@/model/columns/column-model";


type Constructor = {
  BoardModel: typeof BoardM;
};

class Board {
  #BoardModel: typeof BoardM;

  constructor({ BoardModel }: Constructor) {
    this.#BoardModel = BoardModel;
  }

  public create(payload: BoardCreateDTOPayload): Promise<TBoard> {
    return this.#BoardModel.create(payload);
  }

  public delete(id: number): Promise<number> {
    return this.#BoardModel.destroy({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  public async getAll(filter: BoardLoadFilter): Promise<TResponseList<TBoard>> {
    const data = await this.#BoardModel.findAll({
      offset: filter.offset || 0,
      limit: filter.limit || 10,
      where: {
        userId: {
          [Op.eq]: filter.userId
        }
      }
    });

    const totalCount = await this.#BoardModel.count({
      where: {
        userId: {
          [Op.eq]: filter.userId
        }
      }
    });

    return {
      data,
      totalCount
    }
  }

  public getById(id: number): Promise<TBoard | null> {
    return this.#BoardModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      },
      include: [
        {model: ColumnM, as: 'columns'}
      ]
    });
  }

}

export { Board };