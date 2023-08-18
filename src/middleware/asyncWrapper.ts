import express from 'express'


/**
 * This middleware takes a function as a parameter, and returns a function with try-catch format
 * @param fn 
 * @returns 
 */
export default function asyncWrapper(fn: Function) {

    return async (req: express.Request, res: express.Response, next: Function) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            //pass the error to the next middleware
            next(error);
        }
    }
}