import express from "express";
import cors from "cors";

import { createJobRouter } from "./routes/jobs";
import { registerRouter, signInRouter } from "./routes/users";

const app = express()
  .use(cors())
  .use(express.json())
  .use("/jobs", [createJobRouter])
  .use("/users", [registerRouter, signInRouter]);

export { app };
