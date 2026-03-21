import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware"
import { getForecast } from "../controllers/forecast.contrroller";

const forecastRouter = Router();

forecastRouter.get("/", authMiddleWare, getForecast);

export default forecastRouter;