import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { ProductoRepositorySelected } from '../repository/producto.repository.factory.js';

const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return { valid: false, message: `${fieldName} es obligatorio` };
    }
    return { valid: true };
};

const validateStockAmount = (stockAmount, isUpdate = false) => {
    if (stockAmount === undefined || stockAmount === null) {
        return { valid: false, message: 'stockAmount es obligatorio' };
    }
    const stockNum = Number(stockAmount);
    if (isNaN(stockNum) || !Number.isInteger(stockNum)) {
        return { valid: false, message: 'stockAmount debe ser un número entero' };
    }
    if (stockNum < 0) {
        return { valid: false, message: 'stockAmount debe ser mayor o igual a 0' };
    }
    if (isUpdate && stockNum < 1) {
        return { valid: false, message: 'El incremento de stock debe ser al menos 1' };
    }
    return { valid: true };
};

export const ProductoService = {
    crearProducto: async (productoData) => {
        const { producto, stockAmount, fechaIngreso } = productoData;

        // Validar campo producto
        const validProducto = validateRequired(producto, 'producto');
        if (!validProducto.valid) {
            throw new Error(validProducto.message);
        }

        // Validar stockAmount
        const validStock = validateStockAmount(stockAmount, false);
        if (!validStock.valid) {
            throw new Error(validStock.message);
        }

        // Preparar datos para crear
        const datosProducto = {
            producto: producto.trim(),
            stockAmount: Number(stockAmount)
        };

        // Si no se proporciona fechaIngreso, se asignará automáticamente por el modelo
        if (fechaIngreso) {
            datosProducto.fechaIngreso = new Date(fechaIngreso);
        }

        const nuevoProducto = await ProductoRepositorySelected.create(datosProducto);
        return nuevoProducto;
    },

    listarProductos: async () => {
        return await ProductoRepositorySelected.getAll();
    },

    obtenerProductoPorId: async (id) => {
        if (!id) {
            throw new Error('El ID es obligatorio');
        }

        // Validar que el ID sea un ObjectId válido solo si se usa MongoDB
        if (config.DB_PROVIDER === 'mongo' && !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID de producto inválido');
        }

        const producto = await ProductoRepositorySelected.getById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        return producto;
    },

    actualizarProducto: async (id, updateData) => {
        if (!id) {
            throw new Error('El ID es obligatorio');
        }

        // Validar que el ID sea un ObjectId válido solo si se usa MongoDB
        if (config.DB_PROVIDER === 'mongo' && !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID de producto inválido');
        }

        // Verificar que el producto existe
        const productoExistente = await ProductoRepositorySelected.getById(id);
        if (!productoExistente) {
            throw new Error('Producto no encontrado');
        }

        // Validar campos si se proporcionan
        if (updateData.producto !== undefined) {
            const validProducto = validateRequired(updateData.producto, 'producto');
            if (!validProducto.valid) {
                throw new Error(validProducto.message);
            }
            updateData.producto = updateData.producto.trim();
        }

        if (updateData.stockAmount !== undefined) {
            const nuevoStock = Number(updateData.stockAmount);
            const stockActual = productoExistente.stockAmount;
            
            // Validar que sea un entero ≥ 0
            const validStock = validateStockAmount(nuevoStock, false);
            if (!validStock.valid) {
                throw new Error(validStock.message);
            }
            
            // Si se está incrementando stock, validar que el incremento sea ≥ 1
            if (nuevoStock > stockActual) {
                const incremento = nuevoStock - stockActual;
                if (incremento < 1) {
                    throw new Error('El incremento de stock debe ser al menos 1');
                }
            }
            
            updateData.stockAmount = nuevoStock;
        }

        if (updateData.fechaIngreso !== undefined) {
            updateData.fechaIngreso = new Date(updateData.fechaIngreso);
        }

        const productoActualizado = await ProductoRepositorySelected.update(id, updateData);
        return productoActualizado;
    },

    eliminarProducto: async (id) => {
        if (!id) {
            throw new Error('El ID es obligatorio');
        }

        // Validar que el ID sea un ObjectId válido solo si se usa MongoDB
        if (config.DB_PROVIDER === 'mongo' && !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID de producto inválido');
        }

        const producto = await ProductoRepositorySelected.getById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }

        await ProductoRepositorySelected.delete(id);
        return { message: 'Producto eliminado correctamente' };
    }
};

