import jwt from 'jsonwebtoken';
import {errorHandler} from '../utils/error.js';


export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if(err){
            return next(errorHandler(401, 'unauthorized!'));
        }
        req.user = user;
        next();
    })
};