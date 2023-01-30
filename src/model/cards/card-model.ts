import { Table, Column as Col, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Board } from '../boards/board-model';
import { User } from '../users/user-model';
import { Column } from '../columns/column-model'

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'cards'
})

export class Card extends Model {

  @Col({
    type: DataType.TEXT,
    allowNull: false
  })
  title!: string;

  @Col({
    type: DataType.NUMBER,
    allowNull: false
  })
  order!: number;

  @ForeignKey(() => Column)
  @Col({
    type: DataType.NUMBER,
    allowNull: false,
  })
  columnId!: number;

  @BelongsTo(() => Column)
  column!: Column;

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