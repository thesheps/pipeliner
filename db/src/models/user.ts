import bcrypt from "bcrypt";
import { Model, DataTypes } from "sequelize";

import sequelize from "../sequelize";

const saltRounds = 10;

export interface User {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  emailAddress: string;
  username: string;
  password: string;
}

export class UserModel extends Model implements User {
  id: number;
  emailAddress: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  isValidPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    emailAddress: {
      type: new DataTypes.STRING(320),
      allowNull: false
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: "Users",
    sequelize
  }
);

UserModel.addHook("beforeCreate", (user: UserModel) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  user.password = bcrypt.hashSync(user.password, salt);
});
