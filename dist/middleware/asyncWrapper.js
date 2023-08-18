"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This middleware takes a function as a parameter, and returns a function with try-catch format
 * @param fn
 * @returns
 */
function asyncWrapper(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        }
        catch (error) {
            //pass the error to the next middleware
            next(error);
        }
    };
}
exports.default = asyncWrapper;
//# sourceMappingURL=asyncWrapper.js.map