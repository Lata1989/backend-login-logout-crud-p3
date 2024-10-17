// controllers/clientController.js
import { getDB } from '../db/connection.js';
import { ObjectId } from 'mongodb';

// Crear un nuevo cliente
export const createClient = async (req, res) => {
    const client = req.body;
    console.log('Cliente recibido:', client); // Verifica lo que estás recibiendo
    try {
        const db = getDB();
        const result = await db.collection('clients').insertOne(client);
        console.log('Resultado de la inserción:', result); // Verifica el resultado de la inserción
        res.status(201).json({
            _id: result.insertedId, // Devuelve el ID del cliente insertado
            ...client // Devuelve los demás campos del cliente
        });
    } catch (err) {
        console.error('Error al crear el cliente:', err); // Log del error
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};


// Crear múltiples clientes
export const createClients = async (req, res) => {
    const clients = req.body; // Los clientes llegan por un array
    try {
        const db = getDB();
        const result = await db.collection('clients').insertMany(clients);
        res.status(201).json({
            message: `${result.insertedCount} clientes creados con éxito`,
            clients: result.ops, // Devuelve los clientes creados
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear múltiples clientes' });
    }
};

// Obtener todos los clientes con paginación
export const getClients = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    // Validación de parámetros
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    if (isNaN(pageInt) || pageInt <= 0) {
      return res.status(400).json({ error: 'Invalid page number' });
    }
    if (isNaN(limitInt) || limitInt <= 0) {
      return res.status(400).json({ error: 'Invalid limit' });
    }
  
    // Cálculo de skip y limit
    const skip = (pageInt - 1) * limitInt;
  
    try {
      const db = getDB();
      const clients = await db.collection('clients')
        .find()
        .skip(skip)
        .limit(limitInt)
        .toArray();
  
      const totalClients = await db.collection('clients').countDocuments();
  
      res.status(200).json({
        totalClients,
        totalPages: Math.ceil(totalClients / limitInt),
        currentPage: pageInt,
        clients,
      });
    } catch (err) {
      console.error('Error fetching clients:', err);
      res.status(500).json({ error: 'Error fetching clients' });
    }
  };



// Obtener un cliente por ID
export const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDB();
        const client = await db.collection('clients').findOne({ _id: new ObjectId(id) });
        if (!client) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Actualizar un cliente
export const updateClient = async (req, res) => {
    const { id } = req.params;
    const updatedClient = req.body;
    try {
        const db = getDB();
        const result = await db.collection('clients').updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedClient }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente actualizado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente
export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const db = getDB();
        const result = await db.collection('clients').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ message: 'Cliente eliminado con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};
