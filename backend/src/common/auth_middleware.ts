import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthResquest extends Request {
    user?: { _id: string };
}

// TODO: Unserstand the errors here when additng the types???
//req: AuthResquest

const authMiddleware = (req, res, next) => {
    console.log('start mid')
    const authHeader = req.headers['Authorization'];
    console.log('auth=' + authHeader)
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    
    if (token == null) return res.sendStatus(401);
    console.log('start verify')
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        console.log
        (err);
        if (err) return res.sendStatus(401);
        req.user = user as { _id: string };
        next();
    });
}

export default authMiddleware;