import AsyncHandler from "express-async-handler";
import prisma from "../db/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = AsyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export const getUserById = AsyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const RegisterUser = AsyncHandler(async (req, res) => {
  const { name, email, studentId, password, role } = req.body;

  if (!name || !email || !password || !role || !studentId) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const validRoles = ["admin", "user"];

  if (!validRoles.includes(role)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      studentId,
      password: hashedPassword,
      role,
    },
  });

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const UpdateUser = AsyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: req.body,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

export const DeleteUser = AsyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const loginUser = AsyncHandler(async (req, res) => {
  const { studentId, password } = req.body;

  if (!studentId || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const user = await prisma.user.findUnique({
    where: {
      studentId,
    },
  });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "Invalid studentID or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid studentID or password");
  }

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: user,
  });
});
