import { Request, Response, Router } from "express";
import authRouter from "./auth.router";
import { authenticate } from "../controller/authenticate";
import productRouter from "./product.routes";

const router = Router();

router.use('/auth', authRouter)
router.use("/product",authenticate, productRouter);

export default router;
