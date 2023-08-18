"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const asyncWrapper_1 = __importDefault(require("../../middleware/asyncWrapper"));
const customError_1 = require("../../lib/customError");
exports.getAllTasks = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const tasks = await Task_1.default.find();
    if (!tasks) {
        return next((0, customError_1.createCustomError)('failed to get all tasks', 400));
    }
    return res.status(200).json({ success: true, data: tasks });
});
exports.createTask = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const body = req.body;
    const task = await Task_1.default.create(body);
    if (!task) {
        return next((0, customError_1.createCustomError)('failed to create task', 400));
    }
    return res.status(201).json({ success: true, data: task });
});
exports.getTask = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const task = await Task_1.default.findById(req.params.id);
    if (!task) {
        return next((0, customError_1.createCustomError)('unable to find task by id', 404));
    }
    return res.status(200).json({ success: true, data: task });
});
exports.updateTask = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const task = await Task_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
    if (!task) {
        return next((0, customError_1.createCustomError)('unable to update task', 400));
    }
    return res.status(200).json({ success: true, data: task });
});
exports.deleteTask = (0, asyncWrapper_1.default)(async (req, res, next) => {
    const task = await Task_1.default.findOneAndDelete({ _id: req.params.id });
    if (!task) {
        return next((0, customError_1.createCustomError)('unable to find task by id', 404));
    }
    return res.status(200).json({ success: true, data: task });
});
//# sourceMappingURL=task.js.map