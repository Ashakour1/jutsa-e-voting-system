import express from "express";

import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidatesWithVotes,
} from "../controllers/candidate-controller.js";

const router = express.Router();

router.route("/").get(getCandidates).post(createCandidate);

router.get("/votes", getCandidatesWithVotes);

router.route("/:id").delete(deleteCandidate);

export default router;
