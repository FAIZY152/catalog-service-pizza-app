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

        try {
            const {
                name,
                description,
                priceConfiguration,
                attributes,
                categoryId,
                isPublish,
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
}
