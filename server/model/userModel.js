import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
