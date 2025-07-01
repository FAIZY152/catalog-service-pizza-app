import express, { Response } from "express";
import { CategoryController } from "./category.controller";
import createCategoryValidation from "./category-validator";
import { CategoryService } from "./category.service";
import logger from "../config/logger";
import AsyncHandler from "../utils/AsyncWrapper";

const router = express.Router();

const categoryService = new CategoryService();
const categoryControll = new CategoryController(categoryService, logger);

router.get("/", (res: Response) => {
    res.json({});
});

router.post(
    "/create",
    createCategoryValidation,
    AsyncHandler(categoryControll.create),
);

export default router;
