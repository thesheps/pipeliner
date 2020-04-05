import bcrypt from "bcrypt";
import { Model, DataTypes } from "sequelize";

import sequelize from "../sequelize";

const saltRounds = 10;

export interface Job {
  id?: number;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  repoUrl: string;
  repoUsername: string;
  repoPassword: string;
  workspaceDir: string;
  configFilename: string;
}

export class JobModel extends Model implements Job {
  id?: number;
  ownerId: number;
  createdAt?: Date;
  updatedAt?: Date;
  name: string;
  repoUrl: string;
  repoUsername: string;
  repoPassword: string;
  workspaceDir: string;
  configFilename: string;
}

JobModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ownerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(320),
      allowNull: false,
    },
    repoUrl: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    repoUsername: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    repoPassword: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    workspaceDir: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    configFilename: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "Jobs",
    sequelize,
  }
);

JobModel.addHook("beforeCreate", (user: JobModel) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  user.repoPassword = bcrypt.hashSync(user.repoPassword, salt);
});
