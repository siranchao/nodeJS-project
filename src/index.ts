import express from 'express'
const app: express.Application = express();
const PORT: number = 3000;

//import task routes
import taskRoutes from './taskManger/routes/task';

//middleware
app.use(express.json());



app.get('/', (req: express.Request, res: express.Response) => {
    res.send('4 in 1 nodeJS project');
})

app.use('/api/taskManager', taskRoutes);









app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



