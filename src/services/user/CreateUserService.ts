import { hash } from "bcryptjs";
import prismaCliente from "../../prisma";

interface UserProps {
    name: string;
    email: string;
    password: string;
    cpf: string
}

class CreateUserService {
    async execute({ cpf, email, name, password }: UserProps) {

        if (!name || !email || !cpf || !password) {
            return;
        }

        const passHash = await hash(password, 8)

        const user = await prismaCliente.user.create({
            data: {
                cpf,
                email,
                name,
                password: passHash
            },
            omit:{
                password: true
            }
        })

        return user
    }
}

export { CreateUserService }