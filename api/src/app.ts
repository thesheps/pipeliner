import express from "express";
import cors from "cors";

import { jobsRouter } from "./routes/jobs";
import { registerRouter, signInRouter } from "./routes/users";

const app = express()
  .use(cors())
  .use(express.json())
  .use("/jobs", jobsRouter)
  .use("/users", [registerRouter, signInRouter]);

export { app };
