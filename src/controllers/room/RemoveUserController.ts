import { Request, Response } from "express"
import { RemoveUserService } from "../../services/room/RemoveUserService"

class RemoveUserController {
    async handle(req: Request, res: Response) {
        const { room_id } = req.body
        const user_id = req.user_id

        const removeUser = new RemoveUserService()

        const response = await removeUser.execute({ room_id, user_id })

        res.json(response)
    }
}

export { RemoveUserController }
