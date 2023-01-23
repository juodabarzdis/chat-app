import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
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
