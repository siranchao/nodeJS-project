import express from 'express'
import User from '../models/User'
import asyncWrapper from '../../middleware/asyncWrapper';
import { createCustomError } from '../../lib/customError';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();

interface ReqestBody {
    username: string;
    password: string;
}

const SALT_ROUNDS: number = 10


export const login = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const {username, password}: ReqestBody = req.body
    if(!username || !password) {
        return next(createCustomError('Invalid request body', 400));
    }

    //username & password authentication here:
    const user = await User.findOne({username})
    if(!user) {
        return next(createCustomError('User not exist', 400));
    }

    const userHasedPassword: string = user.password
    const checkPassword: boolean = await bcrypt.compare(password, userHasedPassword)

    if(!checkPassword) {
        return next(createCustomError('User password not match: invalid credentials', 401));
    }

    const payload = {
        userID: user._id, 
        username: user.username
    }

    const token: string = jwt.sign(
        {userID: user._id, username: user.username}, 
        process.env.JWT_SECRET as string, 
        {expiresIn: '30d'}
    )

    return res.status(200).json({ success: true, data: {...payload, token} });
})


export const signup = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const {username, password}: ReqestBody = req.body

    if(!username || !password) {
        return next(createCustomError('Invalid request body', 400));
    }

    //check name if exist
    const user = await User.findOne({username})
    if(user) {
        return next(createCustomError('User already exist', 400));
    }

    //hash password
    const salt: string = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword: string = await bcrypt.hash(password, salt)

    const newUser = await User.create({username, password: hashedPassword});
    if(!newUser) {
        return next(createCustomError('failed to create new user', 400));
    }

    const payload = {
        userID: newUser._id, 
        username: newUser.username
    }

    const token: string = jwt.sign(
        payload, 
        process.env.JWT_SECRET as string, 
        {expiresIn: '30d'}
    )

    return res.status(201).json({ success: true, data: {...payload, token }});

})
