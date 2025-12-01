import dotenv from 'dotenv';

dotenv.config();

const {
    MONGO_URI,
    PORT,
    HOST,
    JWT_SECRET
} = process.env;

export const config = {
    MONGO_URI,
    PORT: PORT || 3000,
    HOST: HOST || "127.0.0.1",
    JWT_SECRET: JWT_SECRET || "claveSuperSecretaParaJWT"
};

