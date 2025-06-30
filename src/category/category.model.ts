import mongoose from "mongoose";
interface PriceConfiguration {
    [key: string]: {
        priceType: "base" | "aditional";
        availableOptions: string[];
    };
}

interface Attribute {
    name: string;
    widgetType: "switch" | "radio";
    defaultValue: string;
    availableOptions: string[];
}

interface Category {
    name: string;
    priceConfiguration: PriceConfiguration;
    attributes: Attribute[];
}

const priceConfigurationSchema = new mongoose.Schema<PriceConfiguration>(
    {
        priceType: {
            type: String,
            enum: ["base", "aditional"],
            required: true,
        },
        availableOptions: {
            type: [String],
            required: true,
        },
    },
    { _id: false },
);

const attributeSchema = new mongoose.Schema<Attribute>(
    {
        name: {
            type: String,
            required: true,
        },
        widgetType: {
            type: String,
            enum: ["switch", "radio"],
            required: true,
        },
        defaultValue: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        availableOptions: {
            type: [String],
            required: true,
        },
    },
    { _id: false },
);

const categorySchema = new mongoose.Schema<Category>({
    name: {
        type: String,
        required: true,
    },
    priceConfiguration: {
        type: Map,
        of: priceConfigurationSchema,
        required: true,
    },
    attributes: {
        type: [attributeSchema],
        required: true,
    },
});

export default mongoose.model("Category", categorySchema);
