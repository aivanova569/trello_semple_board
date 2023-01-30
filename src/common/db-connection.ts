import { Board } from '@/model/boards/board-model';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../model/users/user-model';
import { Column } from '@/model/columns/column-model';
import { Card } from '@/model/cards/card-model';

const dbConnection = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'sqlpass',
  database: 'trello'
});

dbConnection.addModels([
  User,
  Board,
  Column,
  Card
]);

export default dbConnection;
