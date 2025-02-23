import AsyncHandler from "express-async-handler";
import prisma from "../db/prisma.js";

export const getCandidates = AsyncHandler(async (req, res) => {
  const candidates = await prisma.candidate.findMany();
  res.json(candidates);
});

export const getCandidateById = AsyncHandler(async (req, res) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (candidate) {
    res.json(candidate);
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

export const createCandidate = AsyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill name field");
  }

  const candidate = await prisma.candidate.create({
    data: {
      name,
    },
  });

  res.status(201).json({
    message: "Candidate created successfully",
    data: candidate,
  });
});

export const updateCandidate = AsyncHandler(async (req, res) => {
  const { name } = req.body;

  const candidate = await prisma.candidate.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (candidate) {
    const updatedCandidate = await prisma.candidate.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name,
      },
    });

    res.json({
      message: "Candidate updated successfully",
      data: updatedCandidate,
    });
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

export const deleteCandidate = AsyncHandler(async (req, res) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (candidate) {
    await prisma.candidate.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json({
      message: "Candidate deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

export const getCandidateVotes = AsyncHandler(async (req, res) => {
  const candidate = await prisma.candidate.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      votes: true,
    },
  });

  if (candidate) {
    res.json(candidate.votes);
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});
