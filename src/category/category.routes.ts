import express, { Response } from "express";
import { CategoryController } from "./category.controller";
import createCategoryValidation from "./category-validator";
import { CategoryService } from "./category.service";
import logger from "../config/logger";

const router = express.Router();

const categoryService = new CategoryService();
const categoryControll = new CategoryController(categoryService, logger);

router.get("/", (res: Response) => {
    res.send("Hello World");
});

router.post("/create", createCategoryValidation, categoryControll.create);

export default router;
