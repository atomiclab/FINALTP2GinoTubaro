import express from 'express';
import usuarioRouter from './routes/usuarioRoutes.js';
import authRouter from './routes/authRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { UsuarioController } from './controllers/usuarioController.js';

const server = express();

server.use(express.json());

// Rutas públicas (sin autenticación)
server.use('/api/usuarios', usuarioRouter);
server.use('/api/auth', authRouter);

// Ruta protegida (requiere autenticación JWT)
server.patch('/api/editaredad', authMiddleware, UsuarioController.incrementarEdad);

// Manejo de rutas no encontradas
server.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        error: 'Endpoint no encontrado'
    });
});

export default server;

