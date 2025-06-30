import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { CategoryService } from "./category.service";
import { Logger } from "winston";
import { Category } from "../types";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return next(
                    createHttpError(400, result.array()[0].msg as string),
                );
            }
            const { name, priceConfiguration, attributes } =
                req.body as Category;

            const category = this.categoryService.create({
                name,
                priceConfiguration,
                attributes,
            });

            res.json({
                message: "Category created successfully",
                category,
            });
        } catch (error) {}
        res.json({ message: "create category" });
    }
}
