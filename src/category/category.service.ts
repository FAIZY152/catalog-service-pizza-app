import { Category } from "../types";
import categoryModel from "./category.model";

export class CategoryService {
    async create(category: Category) {
        const newCategory = new categoryModel(category);
        await newCategory.save();
        return newCategory;
    }
}
