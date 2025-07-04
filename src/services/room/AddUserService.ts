import prismaCliente from "../../prisma";

interface AddUserProps {
    user_id: string;
    room_id: string;
}

class AddUserService {
    async execute({ room_id, user_id }: AddUserProps) {
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
            await prismaCliente.room.update({
                where: {
                    id: room_id
                },
                data: {
                    number_users: 1
                }
            })

            return { message: 'Primeiro user da sala' }
        }

        const roomIsFull = belongsToRoom.max_users - belongsToRoom.number_users

        if (roomIsFull == 0) {
            throw new Error('Sala cheia')
        }

        await prismaCliente.room.update({
            where: {
                id: room_id
            },
            data: {
                number_users: belongsToRoom.number_users + 1
            }
        })

        return { message: 'Mais um usuario entrou' }
    }
}

export { AddUserService }