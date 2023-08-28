import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

//import Project routes
import taskRoutes from './taskManger/routes/task';
import productRoutes from './storeApi/routes/products';
import authRoutes from './jwtApi/routes/auth'

//setup server app
const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;
dotenv.config();


//middleware
app.use(express.json());
app.use(cors());


//main route config
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('4 in 1 nodeJS project - server is running');
})

app.use('/api/taskManager', taskRoutes);

app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);


//handle exceptions
app.use(notFound);
app.use(errorHandler);





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






