import prismaCliente from "../../prisma";

interface RoomProps {
    max_users: number;
    value_room: number;
}

class CreateRoomService {
    async execute({ max_users, value_room }: RoomProps) {
        if (!max_users) {
            throw new Error("Error");
        }

        const room = await prismaCliente.room.create({
            data: {
                max_users,
                value_room
            }
        })

        return room;
    }
}

export { CreateRoomService }