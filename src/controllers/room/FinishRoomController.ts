import { Request, Response } from "express";
import { FinishRoomService } from "../../services/room/FinishRoomService";

class FinishRoomController {
    async handle(req: Request, res: Response) {
        const { room_id } = req.body;

        const finishRoom = new FinishRoomService()

        const response = await finishRoom.execute(room_id)

        res.json(response)
    }
}

export { FinishRoomController }