import { hash } from "bcryptjs";
import prismaCliente from "../../prisma";
import { cpf } from 'cpf-cnpj-validator';

interface UserProps {
    name: string;
    email: string;
    password: string;
    cpf: string;
    birth_date: string
}

class CreateUserService {
    async execute({ cpf: cpfUser, email, name, password, birth_date }: UserProps) {

        if (!name || !email || !cpfUser || !password || !birth_date) {
            return;
        }

        const passHash = await hash(password, 8)

        const cpfIsValid = cpf.isValid(cpfUser)

        if (!cpfIsValid) {
            throw new Error('CPF não é valido')
        }

        const isoDate = new Date(birth_date + 'T00:00:00Z')

        const isUnderAge = underAge(new Date(birth_date))

        if (!isUnderAge) {
            throw new Error("Menor de idade");
        }

        const user = await prismaCliente.user.create({
            data: {
                cpf: cpfUser,
                email,
                name,
                password: passHash,
                birth_date: isoDate
            },
            omit: {
                password: true
            }
        })

        return user
    }
}

function underAge(birth_date: Date): boolean {

    const today = new Date()

    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    )

    return birth_date < eighteenYearsAgo;
}

export { CreateUserService }