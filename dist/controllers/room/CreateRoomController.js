"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomController = void 0;
const CreateRoomService_1 = require("../../services/room/CreateRoomService");
class CreateRoomController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { max_users, value_room } = req.body;
            const createRoom = new CreateRoomService_1.CreateRoomService();
            const room = yield createRoom.execute({ max_users, value_room });
            res.json(room);
        });
    }
}
exports.CreateRoomController = CreateRoomController;
