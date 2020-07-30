import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";

import { createJob, DuplicateJobNameError, Job } from "@pipeliner/db";

import { authMiddleware } from "../../middlewares/authMiddleware/authMiddleware";
import { User } from "../../models";

const checks = [
  check("name").isLength({ max: 128 }),
  check("repoPassword").isLength({ max: 128 }),
];

const createJobRouter = express.Router();
createJobRouter.use(authMiddleware);

createJobRouter.post("/create", checks, async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errors.array().map((e) => `${e.msg} - ${e.param}`));
  }

  try {
    const user = req["user"] as User;
    const job: Job = { ...req.body, ownerId: user.userId };
    const createdJob = await createJob(job);

    return res.status(200).json(createdJob);
  } catch (error) {
    if (error instanceof DuplicateJobNameError)
      return res.status(409).json(error.message);

    return res.status(500).json(error.message);
  }
});

export { createJobRouter };
