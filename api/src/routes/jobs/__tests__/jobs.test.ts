import request from "supertest";

import { app } from "../../../app";

describe("Jobs", () => {
  it("responds with a status code of 200", async () => {
    await request(app)
      .get("/jobs")
      .expect(200);
  });
});
