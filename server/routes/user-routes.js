import {
  RegisterUser,
  DeleteUser,
  UpdateUser,
  getUserById,
  getUsers,
  loginUser,
} from "../controllers/user-controller.js";
import express from "express";

const router = express.Router();

router.route("/").get(getUsers).post(RegisterUser);

router.route("/:id").get(getUserById).delete(DeleteUser).put(UpdateUser);

router.route("/login").post(loginUser);

export default router;
