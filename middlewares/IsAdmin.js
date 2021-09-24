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
exports.isAdmin = void 0;
const RequestFailedResponse_1 = require("./../response/RequestFailedResponse");
const User_1 = require("./../entity/User");
const InternalServerErrorResponse_1 = require("./../response/InternalServerErrorResponse");
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const user = yield User_1.User.findOne(userId, { relations: ["role"] });
        if (!user || user.role.name.toLowerCase() !== "admin") {
            return RequestFailedResponse_1.RequestFailed(res, 403, "Unathorized Request");
        }
        next();
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.isAdmin = isAdmin;
//# sourceMappingURL=IsAdmin.js.map