import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';

//import task routes
import taskRoutes from './taskManger/routes/task';

//setup server app
const app: express.Application = express();
const PORT: number = 3000;

dotenv.config();

//middleware
app.use(express.json());


//main route config

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('4 in 1 nodeJS project');
})

app.use('/api/taskManager', taskRoutes);




//connect to mongodb and start server
mongoose.connect(process.env.MONGO_URL as string, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
} as mongoose.ConnectOptions)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((error) => {
    console.log('Fail to connect to MongoDB' + error);
})






