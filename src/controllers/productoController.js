import { ProductoUseCases } from '../use-cases/productoUseCases.js';

export const ProductoController = {
    crearProducto: async (req, res) => {
        try {
            const producto = await ProductoUseCases.crearProducto(req.body);
            res.status(201).json(producto);
        } catch (error) {
            res.status(400).json({
                statusCode: 400,
                error: error.message
            });
        }
    },

    listarProductos: async (req, res) => {
        try {
            const productos = await ProductoUseCases.listarProductos();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error.message
            });
        }
    },

    obtenerProductoPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await ProductoUseCases.obtenerProductoPorId(id);
            res.status(200).json(producto);
        } catch (error) {
            res.status(404).json({
                statusCode: 404,
                error: error.message
            });
        }
    },

    actualizarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            const producto = await ProductoUseCases.actualizarProducto(id, req.body);
            res.status(200).json(producto);
        } catch (error) {
            const statusCode = error.message === 'Producto no encontrado' ? 404 : 400;
            res.status(statusCode).json({
                statusCode,
                error: error.message
            });
        }
    },

    eliminarProducto: async (req, res) => {
        try {
            const { id } = req.params;
            await ProductoUseCases.eliminarProducto(id);
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        } catch (error) {
            res.status(404).json({
                statusCode: 404,
                error: error.message
            });
        }
    }
};

