import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productoSchema = new Schema(
    {
        producto: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function(v) {
                    return v && v.trim().length > 0;
                },
                message: 'El campo producto no puede estar vacío'
            }
        },
        stockAmount: {
            type: Number,
            required: true,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: 'stockAmount debe ser un número entero'
            }
        },
        fechaIngreso: {
            type: Date,
            default: () => {
                const today = new Date();
                return new Date(today.getFullYear(), today.getMonth(), today.getDate());
            }
        }
    },
    {
        collection: "productos",
        timestamps: false
    }
);

// Transformar fechaIngreso a formato YYYY-MM-DD al serializar
productoSchema.methods.toJSON = function() {
    const obj = this.toObject();
    if (obj.fechaIngreso) {
        const date = new Date(obj.fechaIngreso);
        obj.fechaIngreso = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    }
    return obj;
};

export const ProductoModel = mongoose.model("Producto", productoSchema);

