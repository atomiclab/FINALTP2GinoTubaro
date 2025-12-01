import { config } from "./src/config/config.js";
import mongooseConnectionInstance from "./src/databases/mongo.cnx.js";
import server from "./src/server.js";

const runServer = async () => {
    try {
        await mongooseConnectionInstance.connect();
        
        console.log(`Conexión establecida con MongoDB`);

        server.listen(
            config.PORT,
            config.HOST,
            console.log(`
                El server esta andando en: http://${config.HOST}:${config.PORT} y en /api-docs esta la documentacion de la API.
            `)
        );
    } catch (error) {
        console.log(`Error en el server:`, error.message);
        process.exit(1);
    }
};

runServer();

