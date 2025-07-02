import { NextFunction, Response } from "express";
import { ProductService } from "./product.service";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Product, productrequest } from "./product-types";

export class ProductController {
    constructor(private productService: ProductService) {}

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

        const product = {
            name,
            description,
            priceConfiguration, // pass as string
            attributes: JSON.parse(attributes) as Record<string, unknown>,
            categoryId,
            image: req.body.image, // Make sure to provide image in the request body
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
