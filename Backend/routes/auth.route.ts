import { Router } from "express";
import { login, logout, check, signup } from "../controllers/auth.controller.js";

export const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/check", check);
