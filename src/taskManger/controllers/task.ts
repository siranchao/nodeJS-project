import express from 'express'
import Task from '../models/Task'

interface ReqestBody {
    name: string;
    completed?: boolean;
    priority?: number;
}

export function getAllTasks(req: express.Request, res: express.Response) {
    res.send('get all tasks');
}

export async function createTask(req: express.Request, res: express.Response) {
    try {
        const body: ReqestBody = req.body;
        const task = await Task.create(body);
    
        if(!task) {
           res.status(400).json({ message: 'failed to create task' });
        }
        res.status(201).json({ task });

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export function getTask(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    res.send(`get a single task, id is: ${id}`);
}


export function updateTask(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    res.send('update a single task');
}



export function deleteTask(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    res.send('delete a single task');
}

