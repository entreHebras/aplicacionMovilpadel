/**
 * Módulo para la creación y gestión de una pool de conexiones a la base de datos MySQL.
 * @module Database
 */

import { createPool } from "mysql2/promise";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from "./config.js";

/**
 * Pool de conexiones a la base de datos MySQL.
 * @type {Object}
 * @property {string} host - El host de la base de datos MySQL.
 * @property {string} user - El usuario de la base de datos MySQL.
 * @property {string} password - La contraseña del usuario de la base de datos MySQL.
 * @property {number} port - El puerto de la base de datos MySQL.
 * @property {string} database - El nombre de la base de datos MySQL.
 */
export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
});
