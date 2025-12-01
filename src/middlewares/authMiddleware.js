import jwt from 'jsonwebtoken';
import { getToken } from '../auth/getToken.js';
import { config } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
    try {
        const token = getToken(req);

        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                error: 'Token no proporcionado'
            });
        }

        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded; // Guarda el payload del token (userId, mail)
            next();
        } catch (err) {
            return res.status(403).json({
                statusCode: 403,
                error: 'Token inválido o expirado'
            });
        }
    } catch (err) {
        console.error('Auth-Middleware error:', err);
        return res.status(500).json({
            statusCode: 500,
            error: 'Error interno del servidor'
        });
    }
};

