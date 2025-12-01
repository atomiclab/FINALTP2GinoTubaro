import bcrypt from 'bcryptjs';
import { UsuarioRepositorySelected } from '../repository/usuario.repository.factory.js';

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateRequired = (value, fieldName) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
        return { valid: false, message: `${fieldName} es obligatorio` };
    }
    return { valid: true };
};

const validateEdad = (edad) => {
    if (edad === undefined || edad === null) {
        return { valid: false, message: 'La edad es obligatoria' };
    }
    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 0) {
        return { valid: false, message: 'La edad debe ser un número mayor o igual a 0' };
    }
    return { valid: true };
};

export const UsuarioService = {
    crearUsuario: async (usuarioData) => {
        const { nombre, apellido, mail, contrasena, edad } = usuarioData;

        // Validar campos obligatorios
        const validNombre = validateRequired(nombre, 'nombre');
        if (!validNombre.valid) {
            throw new Error(validNombre.message);
        }

        const validApellido = validateRequired(apellido, 'apellido');
        if (!validApellido.valid) {
            throw new Error(validApellido.message);
        }

        const validMail = validateRequired(mail, 'mail');
        if (!validMail.valid) {
            throw new Error(validMail.message);
        }

        if (!validateEmail(mail)) {
            throw new Error('El formato del email no es válido');
        }

        const validContrasena = validateRequired(contrasena, 'contrasena');
        if (!validContrasena.valid) {
            throw new Error(validContrasena.message);
        }

        const validEdad = validateEdad(edad);
        if (!validEdad.valid) {
            throw new Error(validEdad.message);
        }

        // Verificar si el mail ya existe
        const usuarioExistente = await UsuarioRepositorySelected.getByMail(mail);
        if (usuarioExistente) {
            throw new Error('El mail ya está registrado');
        }

        // Hashear contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

        // Crear usuario
        const nuevoUsuario = await UsuarioRepositorySelected.create({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            mail: mail.toLowerCase().trim(),
            contrasena: hashedPassword,
            edad: Number(edad)
        });

        // Retornar sin contraseña (compatible con MongoDB y JSON)
        const usuarioSinPassword = typeof nuevoUsuario.toObject === 'function' 
            ? nuevoUsuario.toObject() 
            : { ...nuevoUsuario };
        delete usuarioSinPassword.contrasena;
        return usuarioSinPassword;
    },

    listarUsuarios: async () => {
        return await UsuarioRepositorySelected.getAll();
    },

    obtenerUsuarioPorId: async (id) => {
        if (!id) {
            throw new Error('El ID es obligatorio');
        }

        const usuario = await UsuarioRepositorySelected.getById(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        return usuario;
    },

    login: async (mail, contrasena) => {
        if (!mail || !contrasena) {
            throw new Error('Mail y contraseña son obligatorios');
        }

        const usuario = await UsuarioRepositorySelected.getByMail(mail);
        if (!usuario) {
            throw new Error('Credenciales inválidas');
        }

        const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!passwordMatch) {
            throw new Error('Credenciales inválidas');
        }

        return usuario;
    },

    incrementarEdad: async (userId) => {
        if (!userId) {
            throw new Error('El ID del usuario es obligatorio');
        }

        const usuario = await UsuarioRepositorySelected.getById(userId);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        const nuevaEdad = usuario.edad + 1;
        const usuarioActualizado = await UsuarioRepositorySelected.updateEdad(userId, nuevaEdad);

        return usuarioActualizado;
    }
};

