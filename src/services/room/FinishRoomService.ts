import prismaCliente from "../../prisma";

class FinishRoomService {
    async execute(room_id: string) {
        if (!room_id) {
            throw new Error("Erro");
        }

        try {
            const belongsRoom = await prismaCliente.room.findFirst({
                where: {
                    id: room_id
                }
            })

            if (!belongsRoom) {
                throw new Error("Sala não encontrada");
            }

            await prismaCliente.room.delete({
                where: {
                    id: room_id
                }
            })

            return { message: 'Sala deletada com sucesso' }
        } catch (error) {
            console.log(error);
            throw new Error("Não autorizado");
        }
    }
}

export { FinishRoomService }