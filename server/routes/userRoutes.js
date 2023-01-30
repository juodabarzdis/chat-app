import {
  register,
  login,
  users,
  search,
} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", users);
router.get("/all-users/search/", search);

export default router;
