import { Request, Response, NextFunction } from 'express';

function simpleMiddleware(req: Request, resp: Response, next: NextFunction) {
    const authorizationToken = req.headers['authorization'];
    if (!authorizationToken) {
        resp.status(401).json({ message: 'invalid' });
    }
    console.log('--simple middleware.');
    next();
}

export default simpleMiddleware;
