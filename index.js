import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import postsRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
dotenv.config();
mongoose.set("strictQuery", false);

app.use("/posts", postsRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Database connected");
      console.log(`Server running on Port ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.log("error", error.message);
  });
