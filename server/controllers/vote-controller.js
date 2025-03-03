import express from "express";
import prisma from "../db/prisma.js";

export const getVotes = async (req, res) => {
  const votes = await prisma.vote.findMany();
  res.json(votes);
};

export const getVoteById = async (req, res) => {
  const vote = await prisma.vote.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (vote) {
    res.json(vote);
  } else {
    res.status(404);
    throw new Error("Vote not found");
  }
};

export const createVote = async (req, res) => {
  const { userId, candidateId } = req.body;

  console.log(userId, candidateId);

  if (!userId || !candidateId) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  try {
    // Check if the user exists and if they have already voted
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already voted
    if (user.is_voted) {
      return res.status(400).json({ message: "User has already voted" });
    }

    // Check if the candidate exists
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Create a new vote
    const vote = await prisma.vote.create({
      data: {
        userId,
        candidateId,
      },
    });

    // Mark the user as having voted
    await prisma.user.update({
      where: { id: userId },
      data: { is_voted: true },
    });

    res.status(201).json({
      message: "Vote created successfully",
      data: vote,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const updateVote = async (req, res) => {
  const { userId, candidateId } = req.body;

  const vote = await prisma.vote.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (vote) {
    const updatedVote = await prisma.vote.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        userId,
        candidateId,
      },
    });
    res.json({
      message: "Vote updated successfully",
      data: updatedVote,
    });
  } else {
    res.status(404);
    throw new Error("Vote not found");
  }
};

export const deleteVote = async (req, res) => {
  const vote = await prisma.vote.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (vote) {
    await prisma.vote.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({
      message: "Vote deleted successfully",
    });
  } else {
    res.status(404);
    throw new Error("Vote not found");
  }
};

export const getVotedByCandidate = async (req, res) => {
  const candidateId = parseInt(req.params.id);
  const votes = await prisma.vote.findMany({
    where: {
      candidateId,
    },
  });
  res.json(votes);
};
