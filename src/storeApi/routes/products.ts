import express from 'express'
const router: express.Router = express.Router()

//importing controllers
import {getAllProducts, getAllStaticProducts, uploadProducts} from '../controllers/products'


router.route('/').get((req: express.Request, res: express.Response) => {
    res.send('this this the products API route - (store api)')
})

router.route('/getAll').get(getAllProducts)

router.route('/getAll/static').get(getAllStaticProducts)

router.route('/createMany').post(uploadProducts)

// router.route('/createOne').post(createTask)

// router.route('/getOne/:id').get(getTask)

// router.route('/updateOne/:id').patch(updateTask)

// router.route('/deleteOne/:id').delete(deleteTask)




export default router;