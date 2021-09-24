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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMall = exports.updateMall = exports.getMallById = exports.getAllMall = exports.createMall = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const Mall_1 = require("../entity/Mall");
const InternalServerErrorResponse_1 = require("../response/InternalServerErrorResponse");
const RequestFailedResponse_1 = require("../response/RequestFailedResponse");
const createMall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mallname = req.body.mallName;
        const malllogo = req.body.mallLogo || "";
        const malldescription = req.body.mallDescription;
        const malladdress = req.body.mallAddress;
        const mallLocationlat = req.body.mallLocation_lat;
        const mallLocationlong = req.body.mallLocation_long;
        const mallParkingslot = req.body.mallParkingSlot;
        const isparkingfree = req.body.isParkingFree;
        const timestamp = req.body.timestamp
            ? new Date(req.body.timestamp)
            : new Date();
        if (!mallname || !mallname.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "mall name");
        }
        if (!malldescription || !malldescription.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "mall description");
        }
        if (!malladdress || !malladdress.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "mall address");
        }
        if (!mallLocationlat || !mallLocationlat) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "mall Lat");
        }
        if (!mallLocationlong || !mallLocationlong) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "mall Long");
        }
        if (!mallParkingslot || !mallParkingslot) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "mall Long");
        }
        console.log(mallLocationlat);
        const pointObject = {
            type: "Point",
            coordinates: [parseFloat(mallLocationlong), parseFloat(mallLocationlat)]
        };
        const addMall = new Mall_1.Mall();
        addMall.mallName = mallname;
        addMall.mallLogo = malllogo;
        addMall.mallDescription = malldescription;
        addMall.mallAddress = malladdress;
        addMall.mallLocation_lat = mallLocationlat;
        addMall.mallLocation_long = mallLocationlong;
        addMall.location = pointObject;
        addMall.mallParkingSlot = mallParkingslot;
        addMall.isParkingFree = isparkingfree;
        addMall.last_updated = new Date();
        addMall.timestamp = timestamp;
        yield addMall.save();
        const mallResponse = class_transformer_1.classToPlain(addMall);
        res.status(200).json({
            success: true,
            Mall: mallResponse,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.createMall = createMall;
const getAllMall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query.search;
        const malls = yield typeorm_1.getConnection()
            .getRepository(Mall_1.Mall)
            .createQueryBuilder("mall")
            .where("mall.isActive = true", { name: `${query ? query : "%"}%` })
            .orderBy("mall.timestamp", "DESC")
            .paginate();
        const { data } = malls, rest = __rest(malls, ["data"]);
        const newMalls = [];
        data.forEach((malls) => {
            newMalls.push(class_transformer_1.classToPlain(malls));
        });
        res.status(200).json(Object.assign({ success: true, Malls: newMalls }, rest));
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getAllMall = getAllMall;
const getMallById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mall = yield Mall_1.Mall.find({
            where: {
                id: req.params.id,
                isActive: true
            }
        });
        res.status(200).json({
            success: true,
            Mall: mall,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.getMallById = getMallById;
const updateMall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const mallName = req.body.mallName;
        const mallLogo = req.body.mallLogo;
        const mallDescription = req.body.mallDescription;
        const mallAddress = req.body.mallAddress;
        const mallLocation_lat = req.body.mallLocation_lat;
        const mallLocation_long = req.body.mallLocation_long;
        const mallParkingSlot = req.body.mallParkingSlot;
        const isParkingFree = req.body.isParkingFree;
        if (!id || !id.trim().length) {
            return RequestFailedResponse_1.RequestFailed(res, 400, "expense rule");
        }
        const mallUpdate = yield Mall_1.Mall.findOne(id);
        if (!mallUpdate) {
            return RequestFailedResponse_1.RequestFailed(res, 404, "expense rule", id);
        }
        if (mallName) {
            mallUpdate.mallName = mallName;
        }
        if (mallLogo) {
            mallUpdate.mallLogo = mallLogo;
        }
        if (mallDescription) {
            mallUpdate.mallDescription = mallDescription;
        }
        if (mallAddress) {
            mallUpdate.mallAddress = mallAddress;
        }
        if (mallLocation_lat) {
            mallUpdate.mallLocation_lat = mallLocation_lat;
        }
        if (mallLocation_long) {
            mallUpdate.mallLocation_long = mallLocation_long;
        }
        if (mallParkingSlot) {
            mallUpdate.mallParkingSlot = mallParkingSlot;
        }
        if (isParkingFree) {
            mallUpdate.isParkingFree = isParkingFree;
        }
        yield mallUpdate.save();
        res.status(200).json({
            success: true,
            mallUpdate,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.updateMall = updateMall;
const deleteMall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const mallDelete = yield Mall_1.Mall.findOne(id);
        if (!mallDelete) {
            console.log(mallDelete);
            return RequestFailedResponse_1.RequestFailed(res, 404, "Delete mall", id);
        }
        mallDelete.isActive = false;
        yield mallDelete.save();
        res.status(200).json({
            success: true,
            mallDelete,
        });
    }
    catch (error) {
        return InternalServerErrorResponse_1.InternalServerError(res, error);
    }
});
exports.deleteMall = deleteMall;
//# sourceMappingURL=MallController.js.map