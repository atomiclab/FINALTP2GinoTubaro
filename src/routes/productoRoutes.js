import express from 'express';
import { ProductoController } from '../controllers/productoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const productoRouter = express.Router();

// Rutas públicas (sin autenticación)
productoRouter.post('/', ProductoController.crearProducto);
productoRouter.get('/', ProductoController.listarProductos);
productoRouter.get('/:id', ProductoController.obtenerProductoPorId);

// Rutas protegidas (requieren autenticación JWT)
productoRouter.put('/:id', authMiddleware, ProductoController.actualizarProducto);
productoRouter.delete('/:id', authMiddleware, ProductoController.eliminarProducto);
productoRouter.patch('/:id/stock', authMiddleware, ProductoController.incrementarStock);

export default productoRouter;

