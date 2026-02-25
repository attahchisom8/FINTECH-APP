import {
  askAI,
  chatMessages,
  getChatHistory
} from "../controllers/ai.controller";
import { authMiddleWare } from "../middleware/auth.middleware"
import { Router } from "express";

const aiRouter = Router();

aiRouter.post("/ask", authMiddleWare, askAI);
aiRouter.post("/chat", authMiddleWare, chatMessages);
aiRouter.get("/chat/history", authMiddleWare, getChatHistory);

export default aiRouter;
