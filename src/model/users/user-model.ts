import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'users'

})
export class User extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  username!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  updatedAt!: Date;

}