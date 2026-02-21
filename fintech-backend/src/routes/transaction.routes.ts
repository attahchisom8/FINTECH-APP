import { createCategory } from "../controllers/transaction.controller";
import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";

const transactionRouter = Router();

transactionRouter.post("/transactions", authMiddleWare, createCategory);

export default transactionRouter;
