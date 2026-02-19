import { Router } from "express";
import { profile } from "../controllers/user.controller.js";

export const router = Router();

router.get("/profile", profile);
