"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//importing controllers
const task_1 = require("../controllers/task");
router.route('/').get((req, res) => {
    res.send('this this the task manger API route');
});
router.route('/getAll').get(task_1.getAllTasks);
router.route('/createOne').post(task_1.createTask);
router.route('/getOne/:id').get(task_1.getTask);
router.route('/updateOne/:id').patch(task_1.updateTask);
router.route('/deleteOne/:id').delete(task_1.deleteTask);
exports.default = router;
//# sourceMappingURL=task.js.map