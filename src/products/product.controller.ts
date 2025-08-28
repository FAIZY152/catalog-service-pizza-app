import { NextFunction, Request, Response } from "express";
import { ProductService } from "./product.service";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Filter, Product, productrequest } from "./product-types";
import CloudinaryImage from "../common/ImageUploader";
import { Logger } from "winston";
import mongoose from "mongoose";

export class ProductController {
    constructor(
        private productService: ProductService,
        private logger: Logger,
    ) {}

    create = async (req: productrequest, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        try {
            const {
                name,
                description,
                priceConfiguration,
                attributes,
                categoryId,
                isPublish,
                tenantId,
            } = req.body;

            // file upload (Cloudinary or multer)
            const file = req.file;
            const imageUrl = await CloudinaryImage(file as Express.Multer.File);

            const product = {
                name,
                description,
                priceConfiguration: JSON.parse(priceConfiguration) as Record<
                    string,
                    unknown
                >,
                attributes: JSON.parse(attributes) as Record<string, unknown>[],
                categoryId,
                tenantId,
                image: imageUrl, // 👈 fix key name
                isPublish: isPublish, // optional if you send as text
            };
            const newProduct = await this.productService.createProduct(
                product as unknown as Product,
            );
            res.status(201).json({
                message: "Product created successfully",
                id: newProduct._id,
            });
        } catch (err: any) {
            if (err instanceof Error) {
                this.logger.error(err.message);
                next(createHttpError(500, err.message));
            }
        }
    };
    update = async (req: productrequest, res: Response, next: NextFunction) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return next(createHttpError(400, result.array()[0].msg as string));
        }

        try {
            const { productId } = req.params;

            const product = await this.productService.getProduct(productId);
            if (!product) {
                return next(createHttpError(404, "Product not found"));
            }
            const {
                name,
                description,
                priceConfiguration,
                attributes,
                categoryId,
                isPublish,
                tenantId,
            } = req.body;

            // file upload (Cloudinary or multer)
            const file = req.file;
            const imageUrl = await CloudinaryImage(file as Express.Multer.File);

            const updatedProduct = {
                name,
                description,
                priceConfiguration: JSON.parse(priceConfiguration) as Record<
                    string,
                    unknown
                >,
                attributes: JSON.parse(attributes) as Record<string, unknown>[],
                categoryId,
                tenantId,
                image: imageUrl, // 👈 fix key name
                isPublish: isPublish, // optional if you send as text
            };

            const result = await this.productService.updateProduct(
                productId,
                updatedProduct as unknown as Product,
            );

            res.status(201).json({
                message: "Product created successfully",
                id: result._id,
            });
        } catch (err: any) {
            if (err instanceof Error) {
                this.logger.error(err.message);
                next(createHttpError(500, err.message));
            }
        }
    };
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { q, name, categoryId } = req.query;

            const filter: Filter = {};
            const searchTerm = (q || name) as string;

            if (categoryId && mongoose.isValidObjectId(categoryId as string))
                filter.categoryId = new mongoose.Types.ObjectId(
                    categoryId as string,
                );
            const products = await this.productService.listProducts(
                searchTerm,
                filter,
            );
            this.logger.info("Products fetched successfully");
            return res.json({
                products: products,
            });
        } catch (err) {
            if (err instanceof Error) {
                this.logger.error(err.message);
                next(createHttpError(500, err.message));
            }
        }
    };
}
