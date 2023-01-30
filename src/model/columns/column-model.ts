import { Table, Column as Col, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Board } from '../boards/board-model';
import { User } from '../users/user-model';

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'columns'
})

export class Column extends Model {

  @Col({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string;

  @Col({
    type: DataType.NUMBER,
    allowNull: false
  })
  order!: number;

  @ForeignKey(() => Board)
  @Col({
    type: DataType.NUMBER,
    allowNull: false,
  })
  boardId!: number;

  @BelongsTo(() => Board)
  board!: Board;

  @ForeignKey(() => User)
  @Col({
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Col({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt!: Date;

  @Col({
    type: DataType.DATE,
    allowNull: true
  })
  updatedAt!: Date;
}