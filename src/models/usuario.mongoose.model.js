import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const usuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true,
            trim: true
        },
        apellido: {
            type: String,
            required: true,
            trim: true
        },
        mail: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        contrasena: {
            type: String,
            required: true
        },
        edad: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    },
    {
        collection: "usuarios",
        
    }
);

export const UsuarioModel = mongoose.model("Usuario", usuarioSchema);

