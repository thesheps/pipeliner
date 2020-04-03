import { Sequelize, Options } from "sequelize";

import config from "./config";

const sequelize = new Sequelize(config.development as Options);

export default sequelize;
