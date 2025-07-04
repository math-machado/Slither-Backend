"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(router_1.router);
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message
        });
    }
    res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
    });
});
app.listen(process.env.PORT, () => console.log('Server online :)'));
