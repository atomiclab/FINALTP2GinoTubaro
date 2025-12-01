import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.join(__dirname, '../../database/database.json');

// Asegurar que el directorio existe
const ensureDatabaseDir = async () => {
    const dbDir = path.dirname(DB_FILE_PATH);
    try {
        await fs.access(dbDir);
    } catch {
        await fs.mkdir(dbDir, { recursive: true });
    }
};

// Leer el archivo JSON
const readDatabase = async () => {
    await ensureDatabaseDir();
    try {
        const data = await fs.readFile(DB_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe, crear estructura inicial
        if (error.code === 'ENOENT') {
            return { productos: [], usuarios: [] };
        }
        throw error;
    }
};

// Escribir al archivo JSON
const writeDatabase = async (data) => {
    await ensureDatabaseDir();
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// Generar ID único (similar a MongoDB ObjectId en formato)
const generateId = () => {
    return crypto.randomBytes(12).toString('hex');
};

export { readDatabase, writeDatabase, generateId };

