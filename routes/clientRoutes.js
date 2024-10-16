// routes/clientRoutes.js
import express from 'express';
import {
  createClient,
  createClients, // Importa la función para crear múltiples clientes
  getClients,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';

const router = express.Router();

// Rutas
router.post('/', createClient); // Crear un solo cliente
router.post('/bulk', createClients); // Crear múltiples clientes
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
