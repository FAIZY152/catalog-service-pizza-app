import express, { Response } from "express";
import { CategoryController } from "./category.controller";
import createCategoryValidation from "./category-validator";
import { CategoryService } from "./category.service";
import logger from "../config/logger";

const categoryRouter = express.categoryRouter();

const categoryService = new CategoryService();
const categoryControll = new CategoryController(categoryService, logger);

categoryRouter.get("/", (res: Response) => {
    res.send("Hello World");
});

categoryRouter.post("/create", createCategoryValidation, categoryControll.create);

export default categoryRouter;
