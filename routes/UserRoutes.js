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
const UserController_1 = require("../controllers/UserController");
const Auth_1 = require("./../middlewares/Auth");
let router = express.Router();
router.post("/login", UserController_1.Login);
router.get("/", UserController_1.getAllUsers);
router.get("/me", Auth_1.Auth, UserController_1.getUserById);
router.post("/create", UserController_1.createUser);
router.patch("/update", Auth_1.Auth, UserController_1.updateUser);
module.exports = router;
//# sourceMappingURL=UserRoutes.js.map