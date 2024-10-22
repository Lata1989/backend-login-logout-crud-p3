// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import clientRoutes from './routes/clientRoutes.js';

dotenv.config();

const app = express();
const PORT = 4000;

const corsOptions = {
  origin: 'https://login-logout-crud-react-p3-frontend.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

app.use(cors(corsOptions));

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
