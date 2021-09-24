"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehical = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const VehicalType_1 = require("../types/VehicalType");
let Vehical = class Vehical extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", Number)
], Vehical.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.id),
    __metadata("design:type", User_1.User)
], Vehical.prototype, "userVehical", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Vehical.prototype, "vehicalType", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Vehical.prototype, "vehicalBrand", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Vehical.prototype, "vehicalModel", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Vehical.prototype, "vehicalNumber", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp", nullable: true }),
    __metadata("design:type", Date)
], Vehical.prototype, "last_updated", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Vehical.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Vehical.prototype, "timestamp", void 0);
Vehical = __decorate([
    typeorm_1.Entity()
], Vehical);
exports.Vehical = Vehical;
//# sourceMappingURL=Vehical.js.map