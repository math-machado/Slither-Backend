import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(401).json({err: 'Não autorizado'}).end()
        return;
    }

    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload

        req.user_id = sub

        next()

    } catch (error) {
        res.status(401).json({err: 'Token invalido'}).end()
    }
}

