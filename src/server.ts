import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { router } from './router'
import cors from 'cors'

const app = express();
app.use(cors())

app.use(express.json())
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        res.status(400).json({
            error: err.message
        })
    }

    res.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor'
    })
})

app.listen(process.env.PORT, () => console.log('Server online :)')
)