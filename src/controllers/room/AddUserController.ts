import { Request, Response } from "express";
import { AddUserService } from "../../services/room/AddUserService";

class AddUserController {
    async handle(req: Request, res: Response) {
        const { room_id } = req.body
        const user_id = req.user_id

        const addUser = new AddUserService()

        const response = await addUser.execute({ room_id, user_id })

        res.json(response)
    }
}

export { AddUserController }