import { Job, JobModel } from "../../../models/job";
import { createJob } from "../createJob";
import { UserModel, createUser, User } from "../../..";

describe("createJob", () => {
  let owner: User;
  let job: Job;

  const expectedJob: Job = {
    ownerId: -1,
    configFilename: "config.file",
    name: "jobName",
    repoUrl: "repoUrl",
    repoUsername: "repoUsername",
    repoPassword: "repoPassword",
    workspaceDir: "workspaceDir",
  };

  beforeEach(async () => {
    owner = await createUser({
      emailAddress: "johnny.random@invalid.com",
      password: "mypassword",
      username: "johnnyrandom",
    });

    expectedJob.ownerId = owner.id;
    job = await createJob(expectedJob);
  });

  afterEach(async () => {
    await JobModel.destroy({
      where: { id: job.id },
    });

    await UserModel.destroy({
      where: { id: owner.id },
    });
  });

  it("saves job records", async () => {
    expect(job).toEqual(
      expect.objectContaining({
        ...expectedJob,
        ownerId: owner.id,
        repoPassword: expect.not.stringContaining(expectedJob.repoPassword),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    );
  });

  it("throws DuplicateJobNameError on duplicate job name", async () => {
    await expect(createJob(expectedJob)).rejects.toThrow({
      name: "DuplicateJobNameError",
      message: `A job with the name ${expectedJob.name} already exists!`,
    });
  });
});
