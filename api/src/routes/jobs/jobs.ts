import express from "express";

const jobsRouter = express.Router();
jobsRouter.get("/", (_, res) => res.sendStatus(200));

export { jobsRouter };
