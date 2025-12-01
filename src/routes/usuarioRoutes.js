import express from 'express';
import { UsuarioController } from '../controllers/usuarioController.js';

const usuarioRouter = express.Router();

usuarioRouter.post('/', UsuarioController.crearUsuario);
usuarioRouter.get('/', UsuarioController.listarUsuarios);
usuarioRouter.get('/:id', UsuarioController.obtenerUsuarioPorId);

export default usuarioRouter;

