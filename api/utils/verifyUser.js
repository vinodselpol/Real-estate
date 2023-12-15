import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('token',token)

    if (!token){
        return next(errorHandler(401, 'token is missing'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            return next(errorHandler(403, 'Forbidden'));
        }

        req.user = user;
        console.log('req.user', req.user)
        
        next();
    })


}