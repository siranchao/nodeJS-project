import express from 'express'

export function getAllTasks(req: express.Request, res: express.Response) {
    res.send('get all tasks');
}

export function createTask(req: express.Request, res: express.Response) {
    const body: any = req.body;
    console.log(req.body);
    res.send('create a task');
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

