import { body } from "express-validator";

export const createCategoryValidation = [
    body("name").notEmpty().withMessage("Name is required").isString(),
    body("priceConfiguration")
        .notEmpty()
        .withMessage("Price configuration is required"),
    body("priceConfiguration.*.priceType")
        .notEmpty()
        .withMessage("Price type is required")
        .isString()
        .isIn(["base", "aditional"])
        .withMessage("Price type must be base or aditional"),

    body("attributes")
        .notEmpty()
        .withMessage("Attributes is required")
        .isArray(),
];

export default createCategoryValidation;
