import jwt from "jsonwebtoken";
import request from "supertest";

import { app } from "../../../app";
import { CreateJob } from "../../../models/jobs";

process.env.PIPELINER_JWT_KEY = "myTestKey";

const getJwtToken = () =>
  jwt.sign({ userId: "fakeUser" }, process.env.PIPELINER_JWT_KEY);

describe("Jobs", () => {
  describe("registration", () => {
    const register: CreateJob = {
      name: "My Job",
      configFilename: "config.filename",
      repoPassword: "my-repo-password",
      repoUrl: "https://repo.url",
      repoUsername: "my-username",
      workspaceDir: "workspaceDir",
    };

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
          { ...register, name: [...Array(130).map((a) => "a")].join() },
          "Invalid value - name",
          422
        );
      });

      it("validates the password length", async () => {
        await postAndValidate(
          { ...register, repoPassword: [...Array(130).map((a) => "a")].join() },
          "Invalid value - repoPassword",
          422
        );
      });
    });
  });
});
