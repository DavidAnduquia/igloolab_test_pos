import { Sequelize } from "sequelize";

import * as dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
}); 

// Seguimiento de conexion
sequelize.authenticate()
.then(() => {
  console.log('Conexión establecida con éxito.');
})
.catch(err => {
  console.error('No se pudo conectar a la base de datos:', err);
})

export default sequelize;