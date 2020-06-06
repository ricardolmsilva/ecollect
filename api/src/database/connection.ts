import dotenv from "dotenv";
import knex from "knex";

dotenv.config();

const env = process.env.environment || "development";
const config = require("../../knexfile")[env];

export default knex(config);
