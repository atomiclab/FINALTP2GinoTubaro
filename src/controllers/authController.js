import { UsuarioUseCases } from '../use-cases/usuarioUseCases.js';
import { generateToken } from '../auth/generateToken.js';

export const AuthController = {
    login: async (req, res) => {
        try {
            const { mail, contrasena } = req.body;

            const usuario = await UsuarioUseCases.login(mail, contrasena);

            const token = generateToken(usuario._id.toString(), usuario.mail);

            res.json({
                token,
                usuario: {
                    _id: usuario._id,
                    nombre: usuario.nombre,
                    mail: usuario.mail
                }
            });
        } catch (error) {
            res.status(401).json({
                statusCode: 401,
                error: error.message
            });
        }
    }
};

