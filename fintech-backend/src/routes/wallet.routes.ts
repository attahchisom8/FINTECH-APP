import { Router } from "express";
import { addMoney } from "../controllers/wallet.controller";
import { authMiddleWare } from "../middleware/auth.middleware";

const walletRouter = Router();

walletRouter.post("/fund", authMiddleWare, addMoney);

export default walletRouter;
