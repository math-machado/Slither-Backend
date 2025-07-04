import { compare } from "bcryptjs";
import prismaCliente from "../../prisma";
import { sign } from "jsonwebtoken";

interface UserProps {
    email: string,
    password: string
}

class LoginUserService {
    async execute({ email, password }: UserProps) {
        if (!email || !password) {
            return;
        }

        const user = await prismaCliente.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Email ou senha incorretos")
        }

        const passMath = await compare(password, user.password)

        if (!passMath) {
            throw new Error("Email ou senha incorretos")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET as string,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token,
            cpf: user.cpf,
            cash: user.cash
        }
    }
}

export { LoginUserService }