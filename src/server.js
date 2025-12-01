import express from 'express';
import { apiReference } from '@scalar/express-api-reference';
import productoRouter from './routes/productoRoutes.js';
import albumsRouter from './routes/albumsRoutes.js';
import authRouter from './routes/authRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js';
import { openApiSpec } from './config/openapi.js';

const server = express();

server.use(express.json());

// Endpoint para servir el OpenAPI JSON
server.get('/openapi.json', (req, res) => {
  res.json(openApiSpec);
});

// Documentación de la API con Scalar
server.use(
  '/api-docs',
  apiReference({
    theme: 'purple',
    spec: {
      url: '/openapi.json',
    },
  })
);

// Rutas públicas
server.use('/api/v1/productos', productoRouter);
server.use('/api/v1/albums', albumsRouter);
server.use('/api/auth', authRouter);
server.use('/api/usuarios', usuarioRouter);

// Manejo de rutas no encontradas
server.use((req, res) => {
    res.status(404).json({
        statusCode: 404,
        error: 'Endpoint no encontrado'
    });
});

export default server;

