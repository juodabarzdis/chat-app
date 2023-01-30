import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import fs from "fs";

export const register = async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  const emailCheck = await User.findOne({ email });
  if (emailCheck)
    return res.status(400).json({ message: "E-mail already exists." });
  if (password !== repeatPassword)
    return res.status(400).json({ message: "Passwords do not match." });
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
      },
      message: "Registration successful.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email });
  if (!loginUser)
    return res
      .status(400)
      .json({ message: "E-mail or password is incorrect." });
  const validPassword = await bcrypt.compare(password, loginUser.password);
  if (!validPassword)
    return res
      .status(400)
      .json({ message: "E-mail or password is incorrect." });
  res.status(200).json({
    user: {
      id: loginUser._id,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
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

export const search = async (req, res) => {
  const { search } = req.query;
  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      profilePicture: "/uploads/" + req.file.filename,
    });
    res.status(200).json({
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePicture: "/uploads/" + req.file.filename,
      },
      message: "Update successful.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
