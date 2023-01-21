import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  const { username, email, password, repeatPassword } = req.body;
  const usernameCheck = await User.findOne({ username });
  if (usernameCheck)
    return res.status(400).json({ message: "Username already exists." });
  const emailCheck = await User.findOne({ email });
  if (emailCheck)
    return res.status(400).json({ message: "Email already exists." });
  if (password !== repeatPassword)
    return res.status(400).json({ message: "Passwords do not match." });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
