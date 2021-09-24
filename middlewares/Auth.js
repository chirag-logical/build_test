"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RequestFailedResponse_1 = require("../response/RequestFailedResponse");
const InternalServerErrorResponse_1 = require("../response/InternalServerErrorResponse");
const Auth = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "Unauthorized / no token found");
        }
        else {
            const data = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            req.userId = data.id;
            next();
        }
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
};
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map