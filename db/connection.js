// db/connection.js
import { MongoClient } from 'mongodb';

let db;

export const connectDB = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  db = client.db('Fullstack'); // Nombre de la base de datos
  console.log('Conexión a la base de datos exitosa');
};

export const getDB = () => {
  if (!db) {
    throw new Error('No hay base de datos conectada');
  }
  return db;
};
