import { DB } from "../db.js";
import { DataTypes } from "sequelize";

export const Item = DB.define('item', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  date: {type: DataTypes.DATE},
  name: {type: DataTypes.STRING, unique: true},
  count: {type: DataTypes.INTEGER},
  distance: {type: DataTypes.INTEGER}
})
