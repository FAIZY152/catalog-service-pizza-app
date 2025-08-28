import mongoose, { AggregatePaginateModel } from "mongoose";
import { Product } from "./product-types";
import AggregatePaginate from "mongoose-aggregate-paginate-v2";

const attributeValueSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const priceConfigurationSchema = new mongoose.Schema({
    priceType: {
        type: String,
        enum: ["base", "additional"],
    },
    availableOptions: {
        type: Map,
        of: Number,
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        priceConfiguration: {
            type: Map,
            of: priceConfigurationSchema,
        },
        attributes: [attributeValueSchema],
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        isPublish: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    { timestamps: true },
);

productSchema.plugin(AggregatePaginate);

const productModel = mongoose.model<Product, AggregatePaginateModel<Product>>(
    "Product",
    productSchema,
);

export default productModel;
