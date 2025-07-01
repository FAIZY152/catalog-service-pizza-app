import express, { Response } from "express";
import { CategoryController } from "./category.controller";
import createCategoryValidation from "./category-validator";
import { CategoryService } from "./category.service";
import logger from "../config/logger";
import AsyncHandler from "../utils/AsyncWrapper";
import Authenticate from "../common/middlewares/Authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../utils/constants";

const router = express.Router();

const categoryService = new CategoryService();
const categoryControll = new CategoryController(categoryService, logger);

router.get("/", (res: Response) => {
    res.json({});
});

router.post(
    "/create",

    Authenticate,
    canAccess([Roles.ADMIN]),
    createCategoryValidation,
    AsyncHandler(categoryControll.create),
);

router.get(
    "/all",
    Authenticate,
    canAccess([Roles.ADMIN]),
    AsyncHandler(categoryControll.getAll),
);
router.get(
    "/:id",
    Authenticate,
    canAccess([Roles.ADMIN]),
    AsyncHandler(categoryControll.getOne),
);
router.delete(
    "/:id",
    Authenticate,
    canAccess([Roles.ADMIN]),
    AsyncHandler(categoryControll.deleteCategory),
);
export default router;
