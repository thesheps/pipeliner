import jwt from "jsonwebtoken";
import request from "supertest";

import { UserModel, User } from "@pipeliner/db";

import { app } from "../../../app";
import { CreateJob } from "../../../models/jobs";

process.env.PIPELINER_JWT_KEY = "myTestKey";

const getJwtToken = () =>
  jwt.sign({ userId: "fakeUser" }, process.env.PIPELINER_JWT_KEY);

describe("Jobs", () => {
  const createJob: CreateJob = {
    name: "My Job",
    configFilename: "config.filename",
    repoPassword: "my-repo-password",
    repoUrl: "https://repo.url",
    repoUsername: "my-username",
    workspaceDir: "workspaceDir",
  };

  describe("job creation", () => {
    const postAndValidate = async (
      createJob: CreateJob,
      msg: string,
      code: number
    ) => {
      await request(app)
        .post("/jobs/create")
        .set("Cookie", [`authToken=${getJwtToken()}`])
        .send(createJob)
        .expect(code)
        .then((res) => {
          expect(res.body).toEqual([msg]);
        });
    };

    describe("validation", () => {
      it("validates the job name length", async () => {
        await postAndValidate(
          { ...createJob, name: [...Array(130).map((a) => "a")].join() },
          "Invalid value - name",
          422
        );
      });

      it("validates the password length", async () => {
        await postAndValidate(
          {
            ...createJob,
            repoPassword: [...Array(130).map((a) => "a")].join(),
          },
          "Invalid value - repoPassword",
          422
        );
      });
    });

    describe("job saving", () => {
      let createdUser: User;
      let authToken: string;

      const user: User = {
        emailAddress: "create_job@invalid.com",
        username: "create_job",
        password: "password",
      };

      beforeEach(async () => {
        await UserModel.destroy({
          where: { username: "create_job" },
        });

        createdUser = await UserModel.create(user);
        authToken = jwt.sign(
          { userId: createdUser.id },
          process.env.PIPELINER_JWT_KEY
        );
      });

      it("saves the specified job", async () => {
        await request(app)
          .post("/jobs/create")
          .set("Cookie", [`authToken=${authToken}`])
          .send(createJob)
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(
              expect.objectContaining({
                ...createJob,
                id: expect.any(String),
                ownerId: createdUser.id,
                repoPassword: expect.not.stringContaining(
                  createJob.repoPassword
                ),
              })
            );
          });
      });
    });
  });
});
