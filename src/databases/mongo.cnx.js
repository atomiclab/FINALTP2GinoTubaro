import mongoose from 'mongoose';
import { config } from '../config/config.js';

class MongooseConnection {
    constructor() {
        this.connection = null;
        this.isConnected = false;
    }

    async connect() {
        // Si DB_PROVIDER es json, no intentar conectar a MongoDB
        if (config.DB_PROVIDER === 'json') {
            console.log('⚠️  DB_PROVIDER está configurado como "json", omitiendo conexión a MongoDB');
            return null;
        }

        if (this.connection) {
            return this.connection;
        }
        try {
            await mongoose.connect(config.MONGO_URI);
            this.connection = mongoose.connection;
            this.isConnected = true;
            console.log('✅ Mongoose!!');
            return this.connection;
        } catch (err) {
            console.error('❌ Error conectando a MongoDB:', err.message);
            console.log('⚠️  Fallando a modo JSON como respaldo');
            this.isConnected = false;
            // Si falla y DB_PROVIDER es mongo, lanzar el error y nos vamos a json.
            // Pero si ya está configurado como json, no lanzar
            if (config.DB_PROVIDER === 'mongo') {
                throw err;
            }
            return null;
        }
    }

    getIsConnected() {
        return this.isConnected;
    }
}

const mongooseConnectionInstance = new MongooseConnection();

export default mongooseConnectionInstance;

