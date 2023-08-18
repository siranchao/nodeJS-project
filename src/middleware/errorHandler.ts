import express from 'express'
import { CustomError } from '../lib/customError';

export default function errorHandler(error: Error | CustomError, req: express.Request, res: express.Response, next: Function) {
    //checking if the error is a custom error type
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: error });
}