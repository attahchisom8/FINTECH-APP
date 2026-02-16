import { signUp } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller"
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login)

export default authRouter;