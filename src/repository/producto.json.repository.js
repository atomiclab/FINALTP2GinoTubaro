import { readDatabase, writeDatabase, generateId } from '../databases/json.repository.js';

export const ProductoJsonRepository = {
    create: async (productoData) => {
        const db = await readDatabase();
        // Si no hay fechaIngreso, establecer la fecha actual (sin hora, solo fecha)
        let fechaIngreso = productoData.fechaIngreso;
        if (!fechaIngreso) {
            const today = new Date();
            fechaIngreso = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        } else if (fechaIngreso instanceof Date) {
            // Si es un objeto Date, asegurarse de que solo tenga fecha
            fechaIngreso = new Date(fechaIngreso.getFullYear(), fechaIngreso.getMonth(), fechaIngreso.getDate());
        } else {
            // Si es string, parsear y crear solo la fecha
            const date = new Date(fechaIngreso);
            fechaIngreso = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }
        
        const nuevoProducto = {
            _id: generateId(),
            ...productoData,
            fechaIngreso: fechaIngreso,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        db.productos.push(nuevoProducto);
        await writeDatabase(db);
        return {
            ...nuevoProducto,
            fechaIngreso: fechaIngreso.toISOString().split('T')[0]
        };
    },

    getAll: async () => {
        const db = await readDatabase();
        return db.productos.map(producto => ({
            ...producto,
            // Convertir fechaIngreso a formato YYYY-MM-DD si existe
            fechaIngreso: producto.fechaIngreso 
                ? new Date(producto.fechaIngreso).toISOString().split('T')[0]
                : producto.fechaIngreso
        }));
    },

    getById: async (id) => {
        const db = await readDatabase();
        const producto = db.productos.find(p => p._id === id);
        if (!producto) {
            return null;
        }
        return {
            ...producto,
            fechaIngreso: producto.fechaIngreso 
                ? new Date(producto.fechaIngreso).toISOString().split('T')[0]
                : producto.fechaIngreso
        };
    },

    update: async (id, updateData) => {
        const db = await readDatabase();
        const index = db.productos.findIndex(p => p._id === id);
        if (index === -1) {
            return null;
        }
        
        // Manejar fechaIngreso si se proporciona en updateData
        if (updateData.fechaIngreso) {
            let fechaIngreso = updateData.fechaIngreso;
            if (fechaIngreso instanceof Date) {
                fechaIngreso = new Date(fechaIngreso.getFullYear(), fechaIngreso.getMonth(), fechaIngreso.getDate());
            } else {
                const date = new Date(fechaIngreso);
                fechaIngreso = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }
            updateData.fechaIngreso = fechaIngreso;
        }
        
        db.productos[index] = {
            ...db.productos[index],
            ...updateData,
            updatedAt: new Date().toISOString()
        };
        await writeDatabase(db);
        const producto = db.productos[index];
        return {
            ...producto,
            fechaIngreso: producto.fechaIngreso 
                ? new Date(producto.fechaIngreso).toISOString().split('T')[0]
                : producto.fechaIngreso
        };
    },

    delete: async (id) => {
        const db = await readDatabase();
        const index = db.productos.findIndex(p => p._id === id);
        if (index === -1) {
            return null;
        }
        const productoEliminado = db.productos.splice(index, 1)[0];
        await writeDatabase(db);
        return {
            ...productoEliminado,
            fechaIngreso: productoEliminado.fechaIngreso 
                ? new Date(productoEliminado.fechaIngreso).toISOString().split('T')[0]
                : productoEliminado.fechaIngreso
        };
    }
};

