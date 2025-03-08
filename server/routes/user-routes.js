import {
  RegisterUser,
  DeleteUser,
  UpdateUser,
  getUserById,
  getUsers,
  loginUser,
} from "../controllers/user-controller.js";
import express from "express";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get( getUsers)
  .post(authMiddleware, RegisterUser);

router
  .route("/:id")
  .get(authMiddleware, getUserById)
  .get(authMiddleware)
  .delete(authMiddleware, DeleteUser)
  .put(authMiddleware, UpdateUser);

router.route("/login").post(loginUser);

export default router;
