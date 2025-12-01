import { AlbumsService } from '../services/albumsService.js';

export const AlbumsController = {
    getAlbumsCSV: async (req, res) => {
        try {
            const csvContent = await AlbumsService.obtenerYGuardarAlbumsCSV();
            
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="albums_15.csv"');
            res.status(200).send(csvContent);
        } catch (error) {
            res.status(500).json({
                statusCode: 500,
                error: error.message
            });
        }
    }
};

