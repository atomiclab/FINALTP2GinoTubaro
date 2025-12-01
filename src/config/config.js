import dotenv from 'dotenv';

dotenv.config();

const {
    MONGO_URI,
    PORT,
    HOST,
    JWT_SECRET,
    DB_PROVIDER
} = process.env;

export const config = {
    MONGO_URI,
    PORT: PORT || 3000,
    HOST: HOST || "127.0.0.1",
    JWT_SECRET: JWT_SECRET || "claveSuperSecretaParaJWT",
    DB_PROVIDER: DB_PROVIDER || "mongo" // Por defecto usamos MongoDB con "mongo", pero aca cambiando a json podriamos usar otra BD, o mejor aun declarandolo en el .env.
};

