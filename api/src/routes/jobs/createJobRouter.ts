import express from "express";
import { check, validationResult } from "express-validator";

import { createJob, JobError, DuplicateJobNameError } from "@pipeliner/db";

const createJobRouter = express.Router();
const checks = [
  check("name").isLength({ max: 128 }),
  check("repoPassword").isLength({ max: 128 }),
];

createJobRouter.post("/create", checks, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errors.array().map((e) => `${e.msg} - ${e.param}`));
  }

  try {
    const job = await createJob(req.body);

    return res.status(200).json(job);
  } catch (error) {
    if (error instanceof DuplicateJobNameError)
      return res.status(409).json(error.message);

    return res.status(500).json(error.message);
  }
});

export { createJobRouter };
