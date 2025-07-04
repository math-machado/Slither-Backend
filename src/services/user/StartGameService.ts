import prismaCliente from "../../prisma"

interface StartGameProps {
    uid: string
    valueGame: number
}

class StartGameService {
    async execute({ valueGame, uid }: StartGameProps) {

        const cashUser = await prismaCliente.user.findFirst({
            where: {
                id: uid
            },
            select: {
                cash: true
            }
        })

        const cash = parseFloat(String(cashUser?.cash));

        if (cash < valueGame) {
            throw new Error("Saldo insuficiente")
        }

        const newCash = cash - valueGame;

        try {
            await prismaCliente.user.update({
                where: {
                    id: uid
                },
                data: {
                    cash: newCash
                }
            })

            return ('Cash atualizado com sucesso')
        } catch (error) {
            throw new Error('Erro ao atualizar cash')
        }
    }
}

export { StartGameService }