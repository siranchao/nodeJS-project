import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

async function authMiddleware(req: express.Request, res: express.Response, next: Function) {
    const token: string | undefined = req.headers.authorization

    if(!token) {
        return res.status(401).json({ success: false, message: "not authorized" });
    }

    try {
        const tokenString: string = token.split(' ')[1]
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET as string) as jwt.JwtPayload
    
        const {userID, username} = decoded
        req.body.user = {userID, username} 
        return next()
 
    } catch(err) {
        return res.status(401).json({ success: false, message: "credentials not valid" });
    }

}



export default authMiddleware;