import express, { Request, Response } from "express";
import config from "config";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/category.routes";
import cookiePrser from "cookie-parser";
import productRouter from "./products/product.routes";

const app = express();
app.use(express.json());
app.use(cookiePrser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.json(config.get("server.port"));
});

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.use(globalErrorHandler);

export default app;
