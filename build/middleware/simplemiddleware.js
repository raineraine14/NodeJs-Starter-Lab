"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function simpleMiddleware(req, resp, next) {
    const authorizationToken = req.headers['authorization'];
    if (!authorizationToken) {
        resp.status(401).json({ message: 'invalid' });
    }
    console.log('--simple middleware.');
    next();
}
exports.default = simpleMiddleware;
