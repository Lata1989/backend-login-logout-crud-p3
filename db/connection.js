// db/connection.js
import { MongoClient } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config();
let db;

export const connectDB = async () => {
  // console.log(process.env.MONGODB_URI);

  // const client = new MongoClient(process.env.MONGODB_URI);
  const client = new MongoClient('mongodb+srv://latitarg1989:Lata1989@cluster0.jidrdlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
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
