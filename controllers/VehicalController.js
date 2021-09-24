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
exports.defaultVehical = exports.deleteVehical = exports.updateVehical = exports.getVehicalById = exports.getVehicalByUser = exports.getVehical = exports.createVehical = void 0;
const RequestFailedResponse_1 = require("../response/RequestFailedResponse");
const class_transformer_1 = require("class-transformer");
const InternalServerErrorResponse_1 = require("../response/InternalServerErrorResponse");
const User_1 = require("../entity/User");
const Vehical_1 = require("../entity/Vehical");
const createVehical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userId;
        const vehicaltype = req.body.vehicalType;
        const vehicalbrand = req.body.vehicalBrand;
        const vehicalmodel = req.body.vehicalModel;
        const vehicalnumber = req.body.vehicalNumber;
        const timestamp = req.body.timestamp
            ? new Date(req.body.timestamp)
            : new Date();
        const _user = yield User_1.User.findOne(user);
        if (!_user) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "user", user);
        }
        if (!vehicaltype || !vehicaltype.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "vehical Type");
        }
        if (!vehicalbrand || !vehicalbrand.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "vehical brand");
        }
        if (!vehicalmodel || !vehicalmodel.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "vehical model");
        }
        if (!vehicalnumber || !vehicalnumber.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "vehical number");
        }
        const vehical = new Vehical_1.Vehical();
        vehical.userVehical = _user;
        vehical.vehicalType = vehicaltype;
        vehical.vehicalBrand = vehicalbrand;
        vehical.vehicalModel = vehicalmodel;
        vehical.vehicalNumber = vehicalnumber;
        vehical.last_updated = new Date();
        vehical.timestamp = timestamp;
        yield vehical.save();
        const vehicalResponse = class_transformer_1.classToPlain(vehical);
        res.status(200).json({
            success: true,
            vehical: vehicalResponse,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.createVehical = createVehical;
const getVehical = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _userVehical = yield Vehical_1.Vehical.find({
            where: { isActive: true }
        });
        res.status(200).json({
            success: true,
            vehical: _userVehical,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getVehical = getVehical;
const getVehicalByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userId;
        const userVehicals = yield Vehical_1.Vehical.find({
            where: {
                userVehical: user,
                isActive: true
            }
        });
        res.status(200).json({
            success: true,
            userVehicals: userVehicals,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getVehicalByUser = getVehicalByUser;
const getVehicalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userVehicals = yield Vehical_1.Vehical.find({
            where: {
                id: req.params.id,
                isActive: true
            }
        });
        res.status(200).json({
            success: true,
            userVehicals: userVehicals,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getVehicalById = getVehicalById;
const updateVehical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const vehicalType = req.body.vehicalType;
        const vehicalBrand = req.body.vehicalBrand;
        const vehicalModel = req.body.vehicalModel;
        const vehicalNumber = req.body.vehicalNumber;
        if (!id || !id.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "expense rule");
        }
        const vehicalUpdate = yield Vehical_1.Vehical.findOne(id);
        if (!vehicalUpdate) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "expense rule", id);
        }
        if (vehicalType) {
            vehicalUpdate.vehicalType = vehicalType;
        }
        if (vehicalBrand) {
            vehicalUpdate.vehicalBrand = vehicalBrand;
        }
        if (vehicalModel) {
            vehicalUpdate.vehicalModel = vehicalModel;
        }
        if (vehicalNumber) {
            vehicalUpdate.vehicalNumber = vehicalNumber;
        }
        yield vehicalUpdate.save();
        res.status(200).json({
            success: true,
            vehicalUpdate,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.updateVehical = updateVehical;
const deleteVehical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const vehicalDelete = yield Vehical_1.Vehical.findOne(id);
        if (!vehicalDelete) {
            console.log(vehicalDelete);
            return RequestFailedResponse_1.RequestFailed(res, 404, "expense rule", id);
        }
        vehicalDelete.isActive = false;
        yield vehicalDelete.save();
        res.status(200).json({
            success: true,
            vehicalDelete,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.deleteVehical = deleteVehical;
const defaultVehical = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne(req.userId, { relations: ["role"] });
        if (!user) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "user", req.userId);
        }
        const vehicalId = req.body.vehicalId;
        const _vehical = yield Vehical_1.Vehical.findOne(vehicalId);
        if (!_vehical) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "user", vehicalId);
        }
        user.defaultVehical = _vehical;
        yield user.save();
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.defaultVehical = defaultVehical;
//# sourceMappingURL=VehicalController.js.map