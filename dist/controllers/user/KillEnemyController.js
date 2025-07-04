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
exports.KillEnemyController = void 0;
const KillEnemyService_1 = require("../../services/user/KillEnemyService");
class KillEnemyController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const uid = req.user_id;
            const killEnemy = new KillEnemyService_1.KillEnemyService();
            const response = yield killEnemy.execute(uid);
            res.json(response);
        });
    }
}
exports.KillEnemyController = KillEnemyController;
