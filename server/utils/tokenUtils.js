import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateAuthToken = async (user, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    if (!user._id) {
        throw new Error('User ID is required');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });

    return token;
};


