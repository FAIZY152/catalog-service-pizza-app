import { Product } from "./product-types";
import productModel from "./product.model";

export class ProductService {
    async createProduct(product: Product) {
        return await productModel.create(product);
    }
    async updateProduct(productId: string, product: Product) {
        return (await productModel.findOneAndUpdate(
            { _id: productId },
            {
                $set: product,
            },
            {
                new: true,
            },
        )) as Product;
    }

    async getProduct(productId: string): Promise<Product | null> {
        return await productModel.findOne({ _id: productId });
    }
}
