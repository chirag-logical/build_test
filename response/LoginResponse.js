"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponse = void 0;
const class_transformer_1 = require("class-transformer");
const LoginResponse = (token, refreshToken, user) => {
    const plainUser = class_transformer_1.classToPlain(user);
    return {
        token,
        refreshToken,
        user: plainUser,
    };
};
exports.LoginResponse = LoginResponse;
//# sourceMappingURL=LoginResponse.js.map