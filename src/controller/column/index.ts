import { column as columnRep } from "@/db/repositories/repositories";
import { Column as TColumn } from "@/common/types/column/column.type";
import { HttpError } from "@/exeptions/exceptions";
import { HttpCode } from "@/common/enums/http/http-code.enum";
import { ColumnCreateDTOPayload } from "@/common/types/column/column-create-dto-payload.type";
import { ColumnLoadFilter } from "@/common/types/column/column-load-filter.type";
import {ColumnUpdateDTOPayload} from "@/common/types/column/column-update-dto-payload.type";

type Constructor = {
  columnRepository: typeof columnRep;
};

class Column {
  #columnRepository: typeof columnRep;

  constructor({ columnRepository }: Constructor) {
    this.#columnRepository = columnRepository;
  }

  public create(payload: ColumnCreateDTOPayload): Promise<TColumn> {
    return this.#columnRepository.create(payload);
  }

  public async getAll(filter: ColumnLoadFilter): Promise<TColumn[]> {
    const data = await this.#columnRepository.getAll(filter);
    return data;
  }

  public async update(id: number, payload: ColumnUpdateDTOPayload): Promise<TColumn> {
    const data = await this.#columnRepository.update(id, payload);
    return data;
  }

  public async getById(id: number): Promise<TColumn | null> {
    const data = await this.#columnRepository.getById(id);

    if(!data) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: `Column with id ${id} not found`,
      });
    }
    return data;
  }

};

export { Column };