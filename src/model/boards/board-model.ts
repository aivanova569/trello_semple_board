import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../users/user-model';
import { Column as ColumnM } from '../columns/column-model';

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'boards'

})

export class Board extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => ColumnM, {
    foreignKey: 'boardId',
  })
  columns!: ColumnM[];

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