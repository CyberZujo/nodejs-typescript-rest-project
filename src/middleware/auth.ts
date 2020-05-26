import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../utils/config';

export const auth = function (req, res, next) {
    const authHeader = req.headers.authorization ? req.headers.authorization : req.headers['token'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.token.SECRET, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.decoded = data;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export const generateToken = function(data) {
    return jwt.sign(data, config.token.SECRET);
}