import { Product } from "./product-types";
import productModel from "./product.model";

export class ProductService {
    async createProduct(product: Product) {
        const newProduct: Product = new productModel(product) as Product;
        await newProduct.save();
        return newProduct;
    }
}
