import prismaCliente from "../../prisma";

class KillEnemyService {
    async execute(uid: string) {

        const cashUser = await prismaCliente.user.findFirst({
            where: {
                id: uid
            },
            select: {
                cash: true
            }
        })

        let cash = parseFloat(String(cashUser?.cash))

        let newCash = cash + 0.85

        console.log('cashUser: ', cashUser);
        console.log('cash: ', cash);
        console.log('newCash: ', newCash);


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

export { KillEnemyService }
