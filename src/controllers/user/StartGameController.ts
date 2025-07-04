import { Request, Response } from "express";
import { StartGameService } from "../../services/user/StartGameService";

class StartGameController {
    async handle(req: Request, res: Response) {
        const { valueGame } = req.body
        const uid = req.user_id

        const startGame = new StartGameService()

        const response = await startGame.execute({ uid, valueGame })

        res.json(response)
    }
}

export { StartGameController }