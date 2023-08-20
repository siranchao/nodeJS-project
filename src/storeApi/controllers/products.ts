import express from 'express'
import Product from '../models/Product'
import asyncWrapper from '../../middleware/asyncWrapper';
import { createCustomError } from '../../lib/customError';

interface ReqestBody {
    name: string;
    price: number;
    featured?: boolean;
    rating?: number;
    company?: 'IKEA' | 'Liddy' |'Caressa' | 'Marcos'
}



export const getAllProducts = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const tasks = await Product.find();
    if(!tasks) {
        return next(createCustomError('failed to get all tasks', 400));
    }
    return res.status(200).json({ success: true, data: tasks });
})

export const getAllStaticProducts = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const tasks = await Product.find();
    if(!tasks) {
        return next(createCustomError('failed to get all tasks', 400));
    }
    return res.status(200).json({ success: true, data: tasks });
})


export const uploadProducts = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const dataSet: ReqestBody[] = req.body;
    let failed = 0;

    if(dataSet.length > 0) {
        for(const product of dataSet) {
            const newProduct = await Product.create(product);
            if(!newProduct) {
                failed++;
            }
        }
    }

    return res.status(200).json({ success: true, message: `multiple products created successfully, ${failed} products failed to create` });
})