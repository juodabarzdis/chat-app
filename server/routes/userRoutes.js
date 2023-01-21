import { register, login, contacts } from "../controller/userController.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/contacts/:id", contacts);

export default router;
