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
exports.createRole = exports.getAllRole = void 0;
const Role_1 = require("../entity/Role");
const InternalServerErrorResponse_1 = require("./../response/InternalServerErrorResponse");
const RequestFailedResponse_1 = require("../response/RequestFailedResponse");
const getAllRole = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Role_1.Role.find();
        res.status(200).json({
            success: true,
            roles,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getAllRole = getAllRole;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        if (!name || !name.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "name");
        }
        const roles = new Role_1.Role();
        roles.name = name;
        yield roles.save();
        res.status(200).json({
            success: true,
            roles,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.createRole = createRole;
//# sourceMappingURL=RoleController.js.map