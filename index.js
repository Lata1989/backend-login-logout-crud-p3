// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config();

const app = express();
const PORT = 4000;

// Configurar CORS para permitir la URL del frontend
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions)); // Activar CORS con las opciones definidas
app.use(express.json());

// Conectar a la base de datos
connectDB()
  .then(() => {
    // Abrir el puerto solo si la conexión es exitosa
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Rutas
app.use('/api/clients', clientRoutes);
