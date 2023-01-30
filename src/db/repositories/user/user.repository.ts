import { User as UserM } from "@/model/users/user-model";
import { User as TUser } from "@/common/types/types";
import { Op } from "sequelize";

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }


  public async getByEmail(email: string): Promise<TUser | null> {
    return this.#UserModel.findOne({
      attributes: {exclude: ['password']},
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });
  }

  public async getPasswordByEmail(email: string): Promise<string | undefined> {
    const result = await this.#UserModel.findOne({
      where: {
        email: {
          [Op.eq]: email
        }
      }
    });

    return result?.password;
  }

  public getById(id: number): Promise<TUser | null> {
    return this.#UserModel.findOne({
      where: {
        id: {
          [Op.eq]: id
        }
      }
    });
  }
}

export { User };