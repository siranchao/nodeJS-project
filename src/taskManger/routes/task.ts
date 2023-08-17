import express from 'express'
const router: express.Router = express.Router()

//importing controllers
import {getAllTasks, createTask, getTask, updateTask, deleteTask} from '../controllers/task'


router.route('/').get((req: express.Request, res: express.Response) => {
    res.send('this this the task manger API route')
})

router.route('/getAll').get(getAllTasks)

router.route('/createOne').post(createTask)

router.route('/getOne/:id').get(getTask)

router.route('/updateOne/:id').patch(updateTask)

router.route('/deleteOne/:id').delete(deleteTask)




export default router;