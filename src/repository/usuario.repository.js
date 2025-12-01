import { UsuarioModel } from "../models/usuario.mongoose.model.js";

export const UsuarioRepository = {
    create: async (usuarioData) => {
        return await UsuarioModel.create(usuarioData);
    },

    getAll: async () => {
        return await UsuarioModel.find({}).select('-contrasena');
    },

    getById: async (id) => {
        return await UsuarioModel.findById(id).select('-contrasena');
    },

    getByMail: async (mail) => {
        return await UsuarioModel.findOne({ mail: mail.toLowerCase() });
    },

    updateEdad: async (id, nuevaEdad) => {
        return await UsuarioModel.findByIdAndUpdate(
            id,
            { edad: nuevaEdad },
            { new: true }
        ).select('-contrasena');
    }
};

