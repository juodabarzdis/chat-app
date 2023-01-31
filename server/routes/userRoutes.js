import {
  register,
  login,
  users,
  search,
  update,
  checkAuth,
  logout,
} from "../controller/userController.js";
import { upload } from "../middleware/multer.js";
import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth);
router.get("/logout", logout);
router.put("/update/:id", upload.single("profilePicture"), update);
router.get("/all-users", users);
router.get("/all-users/search/", search);

export default router;
