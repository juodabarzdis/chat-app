import { register, login, users } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", users);

export default router;
