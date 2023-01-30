import { Column as TColumn } from "@/common/types/column/column.type";
import { Op } from "sequelize";
import { Column as ColumnM } from "@/model/columns/column-model";
import { ColumnCreateDTOPayload } from "@/common/types/column/column-create-dto-payload.type";
import { ColumnLoadFilter } from "@/common/types/column/column-load-filter.type";
import {ColumnUpdateDTOPayload} from "@/common/types/column/column-update-dto-payload.type";


type Constructor = {
  ColumnModel: typeof ColumnM;
};

class Column {
  #ColumnModel: typeof ColumnM;

  constructor({ ColumnModel }: Constructor) {
    this.#ColumnModel = ColumnModel;
  }

  public create(payload: ColumnCreateDTOPayload): Promise<TColumn> {
    return this.#ColumnModel.create(payload);
  }

  public getAll(filter: ColumnLoadFilter): Promise<TColumn[]> {
    return this.#ColumnModel.findAll({
      offset: filter.offset || 0,
      limit: filter.limit || 10,
      where: {
        boardId: {
          [Op.eq]: filter.boardId
        }
      }
    });
  }

  public getById(id: number): Promise<TColumn | null> {
    return this.#ColumnModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }

  public async update(id: number, payload: ColumnUpdateDTOPayload): Promise<TColumn> {
    const column = await this.#ColumnModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
    return column?.update(payload) as Promise<TColumn>;
  }

}

export { Column };