import { Job, JobModel } from "../../models/job";
import { DuplicateJobNameError } from "../../errors/jobs";

export const createJob = async (job: Job): Promise<Job> => {
  try {
    return await JobModel.create(job);
  } catch (error) {
    if (error.name !== "SequelizeUniqueConstraintError") throw error;

    if (error.errors[0].path === "name")
      throw new DuplicateJobNameError(job.name);
  }
};
