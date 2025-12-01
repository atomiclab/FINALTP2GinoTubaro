import { UsuarioUseCases } from '../use-cases/usuarioUseCases.js';

export const UsuarioController = {
    crearUsuario: async (req, res) => {
        try {
            const usuario = await UsuarioUseCases.crearUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({
                statusCode: 400,
                error: error.message
            });
        }
    },

    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await UsuarioUseCases.listarUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error.message
            });
        }
    },

    obtenerUsuarioPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await UsuarioUseCases.obtenerUsuarioPorId(id);
            res.json(usuario);
        } catch (error) {
            res.status(404).json({
                statusCode: 404,
                error: error.message
            });
        }
    },

    incrementarEdad: async (req, res) => {
        try {
            // Puede recibir userId en el body o usar el usuario del token
            const userId = req.body.userId || req.user?.userId;

            if (!userId) {
                return res.status(400).json({
                    statusCode: 400,
                    error: 'Se requiere userId en el body o un token válido'
                });
            }

            const usuario = await UsuarioUseCases.incrementarEdad(userId);
            res.json(usuario);
        } catch (error) {
            res.status(404).json({
                statusCode: 404,
                error: error.message
            });
        }
    }
};

