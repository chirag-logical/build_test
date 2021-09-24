"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const express = __importStar(require("express"));
const VehicalController_1 = require("../controllers/VehicalController");
const Auth_1 = require("./../middlewares/Auth");
let router = express.Router();
router.get("/", Auth_1.Auth, VehicalController_1.getVehical);
router.get("/userVehical", Auth_1.Auth, VehicalController_1.getVehicalByUser);
router.post("/create", Auth_1.Auth, VehicalController_1.createVehical);
router.patch("/update/:id", Auth_1.Auth, VehicalController_1.updateVehical);
router.get("/:id", Auth_1.Auth, VehicalController_1.getVehicalById);
router.patch("/delete/:id", Auth_1.Auth, VehicalController_1.deleteVehical);
router.patch("/defaultVehical", Auth_1.Auth, VehicalController_1.defaultVehical);
module.exports = router;
//# sourceMappingURL=VehicalRouters.js.map