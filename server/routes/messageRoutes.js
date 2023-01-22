import { addMessage, getMessages } from "../controller/messageController.js";
import express from "express";

const router = express.Router();

router.post("/add", addMessage);
router.get("/get", getMessages);

export default router;
