import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { LoginUserController } from "./controllers/user/LoginUserController";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { StartGameController } from "./controllers/user/StartGameController";
import { KillEnemyController } from "./controllers/user/KillEnemyController";
import { CreateRoomController } from "./controllers/room/CreateRoomController";
import { FinishRoomController } from "./controllers/room/FinishRoomController";
import { AddUserController } from "./controllers/room/AddUserController";
import { RemoveUserController } from "./controllers/room/RemoveUserController";

const router = Router();

//Rotas User
router.post('/user', new CreateUserController().handle)
router.post('/session', new LoginUserController().handle)
router.put('/start', isAuthenticated, new StartGameController().handle)
router.put('/kill', isAuthenticated, new KillEnemyController().handle)

//Rotas Room
router.post('/room', new CreateRoomController().handle)
router.delete('/room', new FinishRoomController().handle)
router.put('/add_user', isAuthenticated, new AddUserController().handle)
router.put('/remove_user', isAuthenticated, new RemoveUserController().handle)

export { router }