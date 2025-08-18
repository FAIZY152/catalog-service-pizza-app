import express, { Response, Request } from "express";
import logger from "../config/logger";
import AsyncHandler from "../utils/AsyncWrapper";
import Authenticate from "../common/middlewares/Authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { Roles } from "../utils/constants";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import upload from "../common/multerUpload";

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
    AsyncHandler(productControll.create),
);

export default router;
