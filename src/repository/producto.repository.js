import { ProductoModel } from "../models/producto.mongoose.model.js";

export const ProductoRepository = {
    create: async (productoData) => {
        return await ProductoModel.create(productoData);
    },

    getAll: async () => {
        return await ProductoModel.find({});
    },

    getById: async (id) => {
        return await ProductoModel.findById(id);
    },

    update: async (id, updateData) => {
        return await ProductoModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
    },

    delete: async (id) => {
        return await ProductoModel.findByIdAndDelete(id);
    }
};

