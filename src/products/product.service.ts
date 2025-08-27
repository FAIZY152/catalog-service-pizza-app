import { Filter, Product } from "./product-types";
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
    async listProducts(q: string, filters: Filter): Promise<Product[]> {
        const searchQuery = new RegExp(q, "i");
        const matchQuery = {
            ...filters,
            name: searchQuery,
        };

        // aggregation pipeline

        const aggregate = productModel.aggregate([
            {
                $match: matchQuery,
            },
        ]);
        const result = await aggregate.exec();
        return result as Product[];
        // return await productModel.find();
    }
}
