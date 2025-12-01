import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

export const generateToken = (userId, mail) => {
    const payload = {
        userId,
        mail
    };

    const token = jwt.sign(
        payload,
        config.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return token;
};

