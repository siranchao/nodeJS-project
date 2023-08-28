import express from 'express'
const router: express.Router = express.Router()

//importing controllers
import {login, signup} from '../controllers/auth'


router.route('/').get((req: express.Request, res: express.Response) => {
    res.send('this this the Auth API route - (JWT api)')
})


router.route('/login').post(login)

router.route('/signup').post(signup)


export default router;