import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AlbumsService = {
    obtenerYGuardarAlbumsCSV: async () => {
        try {
            // Consumir API externa
            const response = await fetch('https://jsonplaceholder.typicode.com/albums');
            if (!response.ok) {
                throw new Error('Error al consumir la API de albums');
            }

            const albums = await response.json();

            // Tomar los primeros 15 registros
            const primeros15 = albums.slice(0, 15);

            // Convertir a CSV
            const csvHeader = 'userId,id,title\n';
            const csvRows = primeros15.map(album => {
                // Escapar comillas y comas en el título
                const title = album.title.replace(/"/g, '""');
                return `${album.userId},${album.id},"${title}"`;
            });

            const csvContent = csvHeader + csvRows.join('\n');

            // Guardar en archivo
            const csvPath = path.join(process.cwd(), 'database', 'albums_15.csv');
            await fs.writeFile(csvPath, csvContent, 'utf-8');

            return csvContent;
        } catch (error) {
            throw new Error(`Error al procesar albums: ${error.message}`);
        }
    }
};

