

export class CustomError extends Error {
    readonly statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export function createCustomError(msg: string, statusCode: number) {
    return new CustomError(msg, statusCode);
}