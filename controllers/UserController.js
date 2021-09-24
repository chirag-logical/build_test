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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = exports.Login = void 0;
const bcryptjs_1 = require("bcryptjs");
const class_transformer_1 = require("class-transformer");
const Role_1 = require("../entity/Role");
const User_1 = require("../entity/User");
const InternalServerErrorResponse_1 = require("../response/InternalServerErrorResponse");
const RequestFailedResponse_1 = require("../response/RequestFailedResponse");
const RoleType_1 = require("./../types/RoleType");
const typeorm_1 = require("typeorm");
const LoginResponse_1 = require("../response/LoginResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phonenumber = req.body.phonenumber;
        const password = req.body.password;
        if (!phonenumber || !phonenumber.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "phonenumber");
        }
        if (!password || !password.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "password");
        }
        const user = yield typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .where("user.phoneNumber = :phonenumber", { phonenumber })
            .leftJoinAndSelect("user.role", "role")
            .getOne();
        if (!user) {
            return RequestFailedResponse_1.RequestFailed(res, 401, "bad phonenumber/password");
        }
        else {
            const isValidPass = yield bcryptjs_1.compare(password, user.password);
            if (!isValidPass) {
                return RequestFailedResponse_1.RequestFailed(res, 401, "bad phonenumber/password");
            }
            if (!user.isActive) {
                return RequestFailedResponse_1.RequestFailed(res, 401, "User is inactive");
            }
            if (user.isLoggedIn) {
                return RequestFailedResponse_1.RequestFailed(res, 401, "already logged in");
            }
            const data = {
                id: user.id,
                phonenumber: user.phoneNumber,
                tokenVersion: user.tokenVersion,
            };
            const token = yield jsonwebtoken_1.default.sign(data, process.env.TOKEN_SECRET, {
                expiresIn: "7d",
            });
            const refreshToken = yield jsonwebtoken_1.default.sign(data, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: "30d",
            });
            if (token) {
                res.status(202).json(LoginResponse_1.LoginResponse(token, refreshToken, user));
                if (user.role.name !== RoleType_1.RoleType.admin) {
                    user.isLoggedIn = true;
                    user.save();
                }
            }
        }
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.Login = Login;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstname = req.body.firstName;
        const lastname = req.body.lastName;
        const password = req.body.password;
        const profileImage = req.body.profileImage || "";
        const phoneNumber = req.body.phoneNumber;
        const timestamp = req.body.timestamp
            ? new Date(req.body.timestamp)
            : new Date();
        if (!firstname || !firstname.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "firstname");
        }
        if (!lastname || !lastname.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "lastname");
        }
        if (!password || !password.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "password");
        }
        if (!phoneNumber || !phoneNumber.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "phonenumber");
        }
        const role = yield Role_1.Role.findOne({
            where: { name: RoleType_1.RoleType.user },
        });
        const hashPassword = yield bcryptjs_1.hash(password, 12);
        if (role) {
            const user = new User_1.User();
            user.firstName = firstname;
            user.lastName = lastname;
            user.role = role;
            user.password = hashPassword;
            user.phoneNumber = phoneNumber;
            user.profileImage = profileImage;
            user.last_updated = new Date();
            user.timestamp = timestamp;
            yield user.save();
            const userResponse = class_transformer_1.classToPlain(user);
            res.status(200).json({
                success: true,
                user: userResponse,
            });
        }
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.search;
        const users = yield typeorm_1.getConnection()
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role")
            .leftJoinAndSelect("user.defaultVehical", "Vehical")
            .where("user.firstName like :name", { name: `${query ? query : "%"}%` })
            .orderBy("user.timestamp", "DESC")
            .paginate();
        const { data } = users, rest = __rest(users, ["data"]);
        const newUsers = [];
        data.forEach((user) => {
            newUsers.push(class_transformer_1.classToPlain(user));
        });
        res.status(200).json(Object.assign({ success: true, users: newUsers }, rest));
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne(req.userId, { relations: ["role", "defaultVehical"] });
        if (!user) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "user", req.userId);
        }
        const plainUser = class_transformer_1.classToPlain(user);
        res.status(200).json({
            success: true,
            user: plainUser,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phoneNumber = req.body.phoneNumber;
        const email = req.body.email;
        const profileImage = req.body.profileImage || null;
        const user = yield User_1.User.findOne(req.userId, { relations: ["role"] });
        if (!user) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "user", req.userId);
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if (email) {
            user.email = email;
        }
        if (profileImage) {
            user.profileImage = profileImage;
        }
        yield user.save();
        const userResponse = class_transformer_1.classToPlain(user);
        res.status(200).json({
            success: true,
            user: userResponse,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.updateUser = updateUser;
//# sourceMappingURL=UserController.js.map