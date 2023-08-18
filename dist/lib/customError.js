"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
function createCustomError(msg, statusCode) {
    return new CustomError(msg, statusCode);
}
exports.createCustomError = createCustomError;
//# sourceMappingURL=customError.js.map