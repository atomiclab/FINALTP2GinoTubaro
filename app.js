import { config } from "./src/config/config.js";
import mongooseConnectionInstance from "./src/databases/mongo.cnx.js";
import server from "./src/server.js";

const runServer = async () => {
    try {
        // Intentar conectar a MongoDB solo si DB_PROVIDER es mongo
        if (config.DB_PROVIDER === 'mongo') {
            try {
                await mongooseConnectionInstance.connect();
                console.log(`✅ Conexión establecida con MongoDB`);
            } catch (error) {
                console.error(`❌ Error conectando a MongoDB:`, error.message);
                console.log(`⚠️  Cambiando a modo JSON como respaldo`);
                // Continuar ejecutando el servidor con JSON
            }
        } else {
            console.log(`📄 Usando modo JSON (DB_PROVIDER=${config.DB_PROVIDER})`);
        }

        server.listen(
            config.PORT,
            config.HOST,
            console.log(`
                El server esta andando en: http://${config.HOST}:${config.PORT} y en /api-docs esta la documentacion de la API.
                Modo de base de datos: ${config.DB_PROVIDER}
            `)
        );
    } catch (error) {
        console.log(`❌ Error en el server:`, error.message);
        process.exit(1);
    }
};

runServer();

