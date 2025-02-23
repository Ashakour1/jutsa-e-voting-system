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
    res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const candidate = await prisma.candidate.findUnique({
    where: {
      id: candidateId,
    },
  });

  if (!candidate) {
    res.status(404);

    throw new Error("Candidate not found");
  }

  const vote = await prisma.vote.create({
    data: {
      userId,
      candidateId,
    },
  });

  res.status(201).json({
    message: "Vote created successfully",
    data: vote,
  });
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
