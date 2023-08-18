"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
//import Task-manager routes
const task_1 = __importDefault(require("./taskManger/routes/task"));
//setup server app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
dotenv_1.default.config();
//middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//main route config
app.get('/', (req, res) => {
    res.send('4 in 1 nodeJS project - server is running');
});
app.use('/api/taskManager', task_1.default);
//handle exceptions
app.use(notFound_1.default);
app.use(errorHandler_1.default);
//connect to mongodb and start server
mongoose_1.default.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log('Fail to connect to MongoDB' + error);
});
//# sourceMappingURL=index.js.map