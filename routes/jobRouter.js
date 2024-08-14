import { Router } from "express";
const router = Router();
import {
  validateJobInput,
  validateIdParams,
} from "../middleware/validationMiddleware.js";

import {
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
  createJob,
  showStats,
} from "../controllers/jobController.js";
import { checkForTestUser } from "../middleware/authMiddelware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParams, getJob)
  .patch(checkForTestUser, validateIdParams, updateJob)
  .delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
