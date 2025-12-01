import { readDatabase, writeDatabase, generateId } from '../databases/json.repository.js';

export const UsuarioJsonRepository = {
    create: async (usuarioData) => {
        const db = await readDatabase();
        const nuevoUsuario = {
            _id: generateId(),
            ...usuarioData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        db.usuarios.push(nuevoUsuario);
        await writeDatabase(db);
        return nuevoUsuario;
    },

    getAll: async () => {
        const db = await readDatabase();
        return db.usuarios.map(usuario => {
            const { contrasena, ...usuarioSinPassword } = usuario;
            return usuarioSinPassword;
        });
    },

    getById: async (id) => {
        const db = await readDatabase();
        const usuario = db.usuarios.find(u => u._id === id);
        if (!usuario) {
            return null;
        }
        const { contrasena, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
    },

    getByMail: async (mail) => {
        const db = await readDatabase();
        return db.usuarios.find(u => u.mail && u.mail.toLowerCase() === mail.toLowerCase()) || null;
    },

    updateEdad: async (id, nuevaEdad) => {
        const db = await readDatabase();
        const index = db.usuarios.findIndex(u => u._id === id);
        if (index === -1) {
            return null;
        }
        db.usuarios[index].edad = nuevaEdad;
        db.usuarios[index].updatedAt = new Date().toISOString();
        await writeDatabase(db);
        const { contrasena, ...usuarioSinPassword } = db.usuarios[index];
        return usuarioSinPassword;
    }
};

