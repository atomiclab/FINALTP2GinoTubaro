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
            const statusCode = error.message === 'ID de producto inválido' ? 400 : 404;
            res.status(statusCode).json({
                statusCode,
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
            let statusCode = 400;
            if (error.message === 'Producto no encontrado') {
                statusCode = 404;
            } else if (error.message === 'ID de producto inválido') {
                statusCode = 400;
            }
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
            const statusCode = error.message === 'ID de producto inválido' ? 400 : 404;
            res.status(statusCode).json({
                statusCode,
                error: error.message
            });
        }
    }
};

