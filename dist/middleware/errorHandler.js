"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../lib/customError");
function errorHandler(error, req, res, next) {
    //checking if the error is a custom error type
    if (error instanceof customError_1.CustomError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: error });
}
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map