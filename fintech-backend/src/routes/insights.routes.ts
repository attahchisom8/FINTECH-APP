import { getInsights } from "../controllers/insight.controller";
import { authMiddleWare } from "../middleware/auth.middleware";
import { Router } from "express";

const insightRouter = Router();

insightRouter.get("/", authMiddleWare, getInsights);

export default insightRouter;
