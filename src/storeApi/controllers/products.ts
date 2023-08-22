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

    const {featured, company, name, sort, fields, numericFilters} = req.query;
    const queryObject: any = {};
    //filter options
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }

    if(company) {
        queryObject.company = company;
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    //numericFilters options
    if(numericFilters && typeof numericFilters === 'string') {
        const max: number = Number(req.query.max);
        const min: number = Number(req.query.min);

        if(numericFilters === 'price') {
            queryObject.price = {$gte: min, $lte: max};
        }
        if(numericFilters === 'rating') {
            queryObject.rating = {$gte: min, $lte: max};
        }
    }

    //sort options
    let result = Product.find(queryObject);
    if(sort && typeof sort === 'string') {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('-createdAt');
    }

    //select fields options
    if(fields && typeof fields === 'string') {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }

    //pagination options
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const skip: number = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    const products = await result

    if(!products) {
        return next(createCustomError('failed to get all products', 400));
    }
    return res.status(200).json({ success: true, data: products, total: products.length });
})

export const getAllStaticProducts = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const products = await Product.find({}).sort('-name price').limit(10);

    if(!products) {
        return next(createCustomError('failed to get all products', 400));
    }
    return res.status(200).json({ success: true, data: products, total: products.length });
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

    return res.status(201).json({ success: true, message: `multiple products created successfully, ${failed} products failed to create` });
})