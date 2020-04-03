export = {
  development: {
    database: process.env.PIPELINER_DB_DATABASE,
    username: process.env.PIPELINER_DB_USERNAME,
    password: process.env.PIPELINER_DB_PASSWORD,
    host: process.env.PIPELINER_DB_HOST,
    port: parseInt(process.env.PIPELINER_DB_PORT),
    dialect: "postgres"
  }
};
