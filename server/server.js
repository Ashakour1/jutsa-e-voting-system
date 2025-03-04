import express from "express";
import dotenv from "dotenv";
import UserRoutes from "./routes/user-routes.js";
import VoteRoutes from "./routes/vote-routes.js";
import CandidateRoutes from "./routes/candidate-routes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", UserRoutes);

app.use("/api/votes", VoteRoutes);

app.use("/api/candidates", CandidateRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
