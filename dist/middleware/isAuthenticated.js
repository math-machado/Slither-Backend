"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).json({ err: 'Não autorizado' }).end();
        return;
    }
    const [, token] = authToken.split(" ");
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.user_id = sub;
        next();
    }
    catch (error) {
        res.status(401).json({ err: 'Token invalido' }).end();
    }
}
