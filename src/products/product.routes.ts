import express, { Response, Request } from "express";
import logger from "../config/logger";
import AsyncHandler from "../utils/AsyncWrapper";
import Authenticate from "../common/middlewares/Authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../utils/constants";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import upload from "../common/multerUpload";
import {
    createProductValidation,
    updateProductValidation,
} from "./product-validator";

const router = express.Router();

const productService = new ProductService();
const productControll = new ProductController(productService, logger);

router.get("/", (req: Request, res: Response) => {
    return res.json({});
});

router.post(
    "/create",
    Authenticate,
    canAccess([Roles.ADMIN]),
    upload.single("image"),
    createProductValidation,
    AsyncHandler(productControll.create),
);

router.put(
    "/:productId",
    Authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    upload.single("image"),
    updateProductValidation,
    AsyncHandler(productControll.update),
);
router.get(
    "/list",
    Authenticate,
    canAccess([Roles.ADMIN, Roles.MANAGER]),
    AsyncHandler(productControll.list),
);

export default router;
