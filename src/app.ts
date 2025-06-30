import express, { Request, Response } from "express";
import config from "config";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/category.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.json(config.get("server.port"));
});

app.use("/category", categoryRouter);

app.use(globalErrorHandler);

export default app;
