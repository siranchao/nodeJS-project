import express from 'express'
const router: express.Router = express.Router()

//import middleware
import authMiddleware from '../../middleware/auth'


//importing controllers
import {getAllProducts, getAllStaticProducts, uploadProducts} from '../controllers/products'


router.route('/').get((req: express.Request, res: express.Response) => {
    res.send('this this the products API route - (store api)')
})

//protected route
router.route('/getAll').get(authMiddleware, getAllProducts)

router.route('/getAll/static').get(authMiddleware, getAllStaticProducts)

router.route('/createMany').post(authMiddleware, uploadProducts)


export default router;