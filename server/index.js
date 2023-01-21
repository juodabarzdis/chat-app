import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
