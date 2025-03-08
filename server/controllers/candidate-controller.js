import AsyncHandler from "express-async-handler";
import prisma from "../db/prisma.js";

export const getCandidates = AsyncHandler(async (req, res) => {
  const candidates = await prisma.candidate.findMany();
  res.json(candidates);
});

export const createCandidate = AsyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const candidate = await prisma.candidate.create({
    data: {
      name,
      bio,
    },
  });

  res.status(201).json({
    message: "Candidate created successfully",
    data: candidate,
  });
});

export const updateCandidate = AsyncHandler(async (req, res) => {
  const { name, bio } = req.body;

  const candidate = await prisma.candidate.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (candidate) {
    const updatedCandidate = await prisma.candidate.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        bio,
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

export const getCandidatesWithVotes = async (req, res) => {
  try {
    // Fetch candidates and their vote counts
    const candidates = await prisma.candidate.findMany({
      select: {
        id: true, // Select other necessary fields from candidate, like id, name, etc.
        name: true,
        votes: {
          select: {
            id: true, // Assuming the votes have an id, or you can just use count
          },
        },
      },
    });

    // Add a vote count field to each candidate
    const candidatesWithVoteCount = candidates.map((candidate) => ({
      ...candidate,
      voteCount: candidate.votes.length, // Calculate the number of votes
    }));

    res.json(candidatesWithVoteCount);
  } catch (err) {
    res.status(500).json({ error: "Error fetching candidates and votes" });
  }
};
