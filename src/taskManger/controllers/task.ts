import express from 'express'
import Task from '../models/Task'
import asyncWrapper from '../../middleware/asyncWrapper';
import { createCustomError } from '../../lib/customError';

interface ReqestBody {
    name: string;
    completed?: boolean;
    priority?: number;
}

export const getAllTasks = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const tasks = await Task.find();
    if(!tasks) {
        return next(createCustomError('failed to get all tasks', 400));
    }
    return res.status(200).json({ success: true, data: tasks });
})


export const createTask = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const body: ReqestBody = req.body;
    const task = await Task.create(body);
    if(!task) {
        return next(createCustomError('failed to create task', 400));
    }
    return res.status(201).json({ success: true, data: task });
})


export const getTask = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const task = await Task.findById(req.params.id);
    if(!task) {
        return next(createCustomError('unable to find task by id', 404));
    }
    return res.status(200).json({ success: true, data: task });
})
  

export const updateTask = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });

    if(!task) {
        return next(createCustomError('unable to update task', 400));
    }
    return res.status(200).json({ success: true, data: task });
})


export const deleteTask = asyncWrapper(async (req: express.Request, res: express.Response, next: Function) => {
    const task = await Task.findOneAndDelete({ _id: req.params.id });

    if(!task) {
        return next(createCustomError('unable to find task by id', 404));
    }
    return res.status(200).json({ success: true, data: task });
})
