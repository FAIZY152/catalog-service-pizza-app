import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(
                    createHttpError(400, result.array()[0].msg as string),
                );
            }

            
        } catch (error) {}
        res.json({ message: "create category" });
    }
}
