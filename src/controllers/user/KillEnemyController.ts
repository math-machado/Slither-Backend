import { Request, Response } from "express"
import { KillEnemyService } from "../../services/user/KillEnemyService"

class KillEnemyController {
    async handle(req: Request, res: Response) {
        const uid = req.user_id

        const killEnemy = new KillEnemyService()

        const response = await killEnemy.execute(uid)

        res.json(response)
    }
}

export { KillEnemyController }