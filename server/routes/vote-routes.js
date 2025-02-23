import express from "express";

import {
  getVotes,
  getVoteById,
  createVote,
  updateVote,
  deleteVote,
} from "../controllers/vote-controller.js";

const router = express.Router();

router.route("/").get(getVotes).post(createVote);

router.route("/:id").get(getVoteById).put(updateVote).delete(deleteVote);

export default router;
