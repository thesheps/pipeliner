import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import { createUser, UserError } from "@pipeliner/db";

const registerRouter = express.Router();

const checks = [
  check("emailAddress").isEmail(),
  check("username").isLength({ max: 128 }),
  check("password").isLength({ max: 128 })
];

registerRouter.post("/register", checks, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errors.array().map(e => `${e.msg} - ${e.param}`));
  }

  try {
    await createUser(req.body);
    const token = jwt.sign(req.body, process.env.PIPELINER_JWT_KEY);

    return res.status(200).json(token);
  } catch (error) {
    if (error instanceof UserError) return res.status(409).json(error.message);

    throw error;
  }
});

export { registerRouter };
