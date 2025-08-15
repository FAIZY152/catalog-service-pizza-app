import { NextFunction, Response } from "express";
import { ProductService } from "./product.service";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Product, productrequest } from "./product-types";
import CloudinaryImage from "../common/ImageUploader";
import { Logger } from "winston";

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
        const {
            name,
            description,
            priceConfiguration,
            attributes,
            categoryId,
        } = req.body;

        // file upload
        const file = req.file;
        const imageUrl = await CloudinaryImage(file as Express.Multer.File);
        const product = {
            name,
            description,
            priceConfiguration, // pass as string
            attributes: JSON.parse(attributes) as Record<string, unknown>,
            categoryId,
            file: imageUrl,
            // Make sure to provide image in the request body
        };
        const newProduct = await this.productService.createProduct(
            product as unknown as Product,
        );
        res.json({
            message: "Product created successfully",
            id: newProduct._id,
        });
    };
}
