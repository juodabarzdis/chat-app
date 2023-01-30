import {
  register,
  login,
  users,
  search,
  update,
} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", upload.single("profilePicture"), update);
router.get("/all-users", users);
router.get("/all-users/search/", search);

export default router;
