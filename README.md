# About this Project

4 in 1 NodeJS project, a full tutorial of NodeJS application

## :rocket: Objective

- This is a project that consists of 4 different API Endpoints, each one of them serving a different frontend application
- The objective of this project is to create a full back-end application with NodeJS and Express
- Coding stack: NodeJS, Express, TypeScript, MongoDB
- This project aiming to practice full knowledge of NodeJS and Express.js

## :hammer: Built With

[![Mongo DB](https://img.shields.io/badge/MongoDB-%2347A248.svg?&style=for-the-badge&logo=MongoDB&logoColor=white)]()
[![Express](https://img.shields.io/badge/Express-%23000000.svg?&style=for-the-badge&logo=Express&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white)]()

## :pencil: REST API Endpoints - Task Manager

### Get all tasks

- **HTTP Method:** GET
- **Endpoint:** `/api/taskManager/getAll`
- **Description:** Get a list of all tasks.

### Create one task

- **HTTP Method:** POST
- **Endpoint:** `/api/taskManager/createOne`
- **Description:** Create a new task.

### Get one task by id

- **HTTP Method:** GET
- **Endpoint:** `/api/taskManager/getOne/:id`
- **Description:** Get a specific task by its unique ID.

### Update one task by id

- **HTTP Method:** PATCH
- **Endpoint:** `/api/taskManager/updateOne/:id`
- **Description:** Update a specific task by its unique ID.

### Delete one task by id

- **HTTP Method:** DELETE
- **Endpoint:** `/api/taskManager/deleteOne/:id`
- **Description:** Delete a specific task by its unique ID.

## :book: Usage

To use these endpoints, make sure to replace `:id` with the actual ID of the task you want to perform the action on. For example, to get a specific task by its ID, make a GET request to `/api/taskManager/getOne/123`.

Remember to handle the request and response data according to the API documentation to effectively use these endpoints in your application.

## :book: Example Requests

Here are some example requests using the `curl` command-line tool:

```bash
# Get all tasks
curl -X GET https://your-api-base-url.com/api/taskManager/getAll

# Create a task
curl -X POST https://your-api-base-url.com/api/taskManager/createOne -d "taskName=New Task"

# Get a task by ID
curl -X GET https://your-api-base-url.com/api/taskManager/getOne/123

# Update a task by ID
curl -X PATCH https://your-api-base-url.com/api/taskManager/updateOne/123 -d "taskName=Updated Task"

# Delete a task by ID
curl -X DELETE https://your-api-base-url.com/api/taskManager/deleteOne/123
```
