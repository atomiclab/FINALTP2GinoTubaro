import { config } from '../config/config.js';
import mongooseConnectionInstance from '../databases/mongo.cnx.js';
import { ProductoRepository } from './producto.repository.js';
import { ProductoJsonRepository } from './producto.json.repository.js';

// Factory que selecciona el repositorio correcto según DB_PROVIDER
// Si MongoDB no está conectado, usa JSON como fallback
export const getProductoRepository = () => {
    if (config.DB_PROVIDER === 'json') {
        return ProductoJsonRepository;
    }
    // Si DB_PROVIDER es mongo pero MongoDB no está conectado, usar JSON
    if (config.DB_PROVIDER === 'mongo' && !mongooseConnectionInstance.getIsConnected()) {
        return ProductoJsonRepository;
    }
    return ProductoRepository;
};

// Crear un proxy que siempre devuelva el repositorio correcto según el estado actual
const createRepositoryProxy = () => {
    return new Proxy({}, {
        get: (target, prop) => {
            const repo = getProductoRepository();
            const value = repo[prop];
            if (typeof value === 'function') {
                return value.bind(repo);
            }
            return value;
        }
    });
};

// Exportar el repositorio seleccionado (proxy dinámico)
export const ProductoRepositorySelected = createRepositoryProxy();

