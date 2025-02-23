import express from "express";

import {
  getCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
} from "../controllers/candidate-controller.js";

const router = express.Router();

router.route("/").get(getCandidates).post(createCandidate);

router
  .route("/:id")
  .get(getCandidateById)
  .put(updateCandidate)
  .delete(deleteCandidate);

export default router;
