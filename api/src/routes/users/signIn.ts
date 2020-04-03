import express from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import { getUser, UserError } from "@pipeliner/db";
import { SignIn } from "../../models";

const signInRouter = express.Router();

const checks = [
  check("emailAddress").isEmail(),
  check("password").isLength({ max: 128 })
];

signInRouter.post("/sign-in", checks, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errors.array().map(e => `${e.msg} - ${e.param}`));
  }

  const signIn = req.body as SignIn;

  try {
    await getUser(signIn.emailAddress, signIn.password);
    const token = jwt.sign(signIn, process.env.PIPELINER_JWT_KEY);

    return res.status(200).json(token);
  } catch (error) {
    if (error instanceof UserError) return res.status(409).json(error.message);

    throw error;
  }
});

export { signInRouter };
