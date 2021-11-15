import { Dialect } from 'sequelize';

require('dotenv').config();

const host = process.env.DB_HOST as string;
const username = process.env.DB_USER as string;
const password = process.env.DB_PASSWORD as string;
const databaseName = process.env.DB_NAME as string;
const dialect = process.env.DB_DIALECT as Dialect;
const port = process.env.PORT || 5433;

module.exports = {
  development: {
    username: username,
    password: password,
    database: databaseName,
    host: host,
    dialect: dialect,
    port: Number(port),
  },
};
