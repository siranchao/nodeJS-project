import express from 'express'


export default function notFound(req: express.Request, res: express.Response) {
    
    res.status(404).send('Route does not exist')
}