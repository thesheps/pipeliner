import express from "express";

import { jobsRouter } from "./routes/jobs";
import { registerRouter, signInRouter } from "./routes/users";

const app = express()
  .use(express.json())
  .use("/jobs", jobsRouter)
  .use("/users", [registerRouter, signInRouter]);

export { app };
