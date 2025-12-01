import express from 'express';
import { AlbumsController } from '../controllers/albumsController.js';

const albumsRouter = express.Router();

// Ruta pública (sin autenticación por defecto)
albumsRouter.get('/csv', AlbumsController.getAlbumsCSV);

export default albumsRouter;

