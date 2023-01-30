import mongoose from "mongoose";

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
    name: String,
    desc: String,
    default: "",
    img: {
      data: Buffer,
      contentType: String,
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
