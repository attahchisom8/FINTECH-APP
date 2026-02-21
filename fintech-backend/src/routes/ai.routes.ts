import { askAI } from "../controllers/ai.controller";
import { authMiddleWare } from "../middleware/auth.middleware"
import { Router } from "express";

const aiRouter = Router();

aiRouter.post("/ask", authMiddleWare, askAI);

export default aiRouter;
