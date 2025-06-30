import express, { Response } from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

const categoryControll = new CategoryController();

router.get("/", (res: Response) => {
    res.send("Hello World");
});

router.post('/create' , categoryControll.create)

export default router;
