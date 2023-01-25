import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
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

export const login = async (req, res) => {
  const { username, password } = req.body;
  const loginUser = await User.findOne({ username });
  if (!loginUser)
    return res
      .status(400)
      .json({ message: "Username or password is incorrect." });
  if (!password)
    return res
      .status(400)
      .json({ message: "Username or password is incorrect." });
  const validPassword = await bcrypt.compare(password, loginUser.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ message: "Username or password is incorrect." });
  res.status(200).json({
    user: {
      _id: loginUser._id,
      username: loginUser.username,
      email: loginUser.email,
      profilePicture: loginUser.profilePicture,
    },
    message: "Login successful.",
  });
};

export const users = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
