import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { CategoryService } from "./category.service";
import { Logger } from "winston";
import { Category } from "../types";
import categoryModel from "./category.model";

export class CategoryController {
    constructor(
        private categoryService: CategoryService,
        private logger: Logger,
    ) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.update = this.update.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        const { name, priceConfiguration, attributes } = req.body as Category;

        const category = await this.categoryService.create({
            name,
            priceConfiguration,
            attributes,
        });

        res.json({
            message: "Category created successfully",
            id: category._id,
        });
        this.logger.info("Category created successfully");
    }
    async getAll(req: Request, res: Response) {
        const categories = await categoryModel.find();
        this.logger.info("All categories fetched successfully");

        return res.json(categories);
    }
    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const categorie = await categoryModel.findById(id);
        return res.json(categorie);
    }
    async deleteCategory(req: Request, res: Response) {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        return res.json({
            message: "Category deleted successfully",
        });
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }
        const { id } = req.params;
        const { name, priceConfiguration, attributes } = req.body as Category;

        const update = await categoryModel.findByIdAndUpdate(
            {
                _id: id,
            },
            {
                name: name,
                priceConfiguration: priceConfiguration,
                attributes: attributes,
            },
        );
        res.json({
            message: "Category updated successfully",
            data: update,
        });
        this.logger.info("Category updated successfully");
    }
}
