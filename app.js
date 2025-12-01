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
                Server is running at: http://${config.HOST}:${config.PORT}
            `)
        );
    } catch (error) {
        console.log(`Error en el server:`, error.message);
        process.exit(1);
    }
};

runServer();

