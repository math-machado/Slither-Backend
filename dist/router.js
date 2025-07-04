"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const LoginUserController_1 = require("./controllers/user/LoginUserController");
const isAuthenticated_1 = require("./middleware/isAuthenticated");
const StartGameController_1 = require("./controllers/user/StartGameController");
const KillEnemyController_1 = require("./controllers/user/KillEnemyController");
const CreateRoomController_1 = require("./controllers/room/CreateRoomController");
const FinishRoomController_1 = require("./controllers/room/FinishRoomController");
const AddUserController_1 = require("./controllers/room/AddUserController");
const RemoveUserController_1 = require("./controllers/room/RemoveUserController");
const router = (0, express_1.Router)();
exports.router = router;
//Rotas User
router.post('/user', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new LoginUserController_1.LoginUserController().handle);
router.put('/start', isAuthenticated_1.isAuthenticated, new StartGameController_1.StartGameController().handle);
router.put('/kill', isAuthenticated_1.isAuthenticated, new KillEnemyController_1.KillEnemyController().handle);
//Rotas Room
router.post('/room', new CreateRoomController_1.CreateRoomController().handle);
router.delete('/room', new FinishRoomController_1.FinishRoomController().handle);
router.put('/add_user', isAuthenticated_1.isAuthenticated, new AddUserController_1.AddUserController().handle);
router.put('/remove_user', isAuthenticated_1.isAuthenticated, new RemoveUserController_1.RemoveUserController().handle);
