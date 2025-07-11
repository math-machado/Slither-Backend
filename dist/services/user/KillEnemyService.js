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
exports.KillEnemyService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class KillEnemyService {
    execute(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const cashUser = yield prisma_1.default.user.findFirst({
                where: {
                    id: uid
                },
                select: {
                    cash: true
                }
            });
            let cash = parseFloat(String(cashUser === null || cashUser === void 0 ? void 0 : cashUser.cash));
            let newCash = cash + 0.85;
            console.log('cashUser: ', cashUser);
            console.log('cash: ', cash);
            console.log('newCash: ', newCash);
            try {
                yield prisma_1.default.user.update({
                    where: {
                        id: uid
                    },
                    data: {
                        cash: newCash
                    }
                });
                return ('Cash atualizado com sucesso');
            }
            catch (error) {
                throw new Error('Erro ao atualizar cash');
            }
        });
    }
}
exports.KillEnemyService = KillEnemyService;
