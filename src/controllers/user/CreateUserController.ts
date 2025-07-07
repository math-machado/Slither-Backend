import { Request, Response } from "express"
import { CreateUserService } from "../../services/user/CreateUserService"

class CreateUserController {
    async handle(req: Request, res: Response) {

        const { name, email, password, cpf, birth_date } = req.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({ cpf, email, name, password, birth_date })

        res.json(user)

    }
}

export { CreateUserController }