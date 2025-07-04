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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ room_id, user_id }) {
            if (!room_id || !user_id) {
                throw new Error("error");
            }
            const belongsToUser = yield prisma_1.default.user.findFirst({
                where: {
                    id: user_id
                }
            });
            if (!belongsToUser) {
                throw new Error("Usuario não encontrado");
            }
            const belongsToRoom = yield prisma_1.default.room.findFirst({
                where: {
                    id: room_id
                }
            });
            if (!belongsToRoom) {
                throw new Error("Sala não encontrada");
            }
            if (!belongsToRoom.number_users) {
                throw new Error("Sala já esta vazia");
            }
            if (belongsToRoom.number_users == 1) {
                yield prisma_1.default.room.update({
                    where: {
                        id: room_id
                    },
                    data: {
                        number_users: null
                    }
                });
                return { message: 'Ultimo usuario saiu' };
            }
            yield prisma_1.default.room.update({
                where: {
                    id: room_id
                },
                data: {
                    number_users: belongsToRoom.number_users - 1
                }
            });
            return { message: 'Mais um usuario saiu' };
        });
    }
}
exports.RemoveUserService = RemoveUserService;
