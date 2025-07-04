import prismaCliente from "../../prisma";

interface RemoveUserProps {
    user_id: string;
    room_id: string;
}

class RemoveUserService {
    async execute({ room_id, user_id }: RemoveUserProps) {
        if (!room_id || !user_id) {
            throw new Error("error");
        }


        const belongsToUser = await prismaCliente.user.findFirst({
            where: {
                id: user_id
            }
        })

        if (!belongsToUser) {
            throw new Error("Usuario não encontrado");
        }

        const belongsToRoom = await prismaCliente.room.findFirst({
            where: {
                id: room_id
            }
        })

        if (!belongsToRoom) {
            throw new Error("Sala não encontrada");
        }

        if (!belongsToRoom.number_users) {
            throw new Error("Sala já esta vazia");
        }

        if (belongsToRoom.number_users == 1) {
            await prismaCliente.room.update({
                where: {
                    id: room_id
                },
                data: {
                    number_users: null
                }
            })

            return { message: 'Ultimo usuario saiu' }
        }

        await prismaCliente.room.update({
            where: {
                id: room_id
            },
            data: {
                number_users: belongsToRoom.number_users - 1
            }
        })

        return { message: 'Mais um usuario saiu' }
    }
}

export { RemoveUserService }