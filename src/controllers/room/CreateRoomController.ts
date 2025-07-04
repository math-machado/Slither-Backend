import { Request, Response } from "express";
import { CreateRoomService } from "../../services/room/CreateRoomService";

class CreateRoomController {
    async handle(req: Request, res: Response) {
        const { max_users, value_room } = req.body

        const createRoom = new CreateRoomService();

        const room = await createRoom.execute({ max_users, value_room })

        res.json(room)
    }
}

export { CreateRoomController }