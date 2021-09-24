"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const InternalServerError = (res, error) => {
    console.log(error);
    console.log(error.message);
    if (error.code === "ER_DUP_ENTRY") {
        res.status(409).json({
            success: false,
            message: error.sqlMessage,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=InternalServerErrorResponse.js.map