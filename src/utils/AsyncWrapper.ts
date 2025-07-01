import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

const AsyncHandler = (handler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.resolve(handler(req, res, next)).catch((error) => {
            if (error instanceof Error) {
                return next(createHttpError(500, error.message));
            }
            return next(createHttpError(500, "Internal Server Error"));
        });
    };
};

export default AsyncHandler;
