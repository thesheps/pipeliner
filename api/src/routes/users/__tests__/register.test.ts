import request from "supertest";
import jwt from "jsonwebtoken";

import { UserModel } from "@pipeliner/db";

import { app } from "../../../app";
import { Register } from "../../../models";

process.env.PIPELINER_JWT_KEY = "myTestKey";

describe("Users", () => {
  describe("registration", () => {
    const register: Register = {
      emailAddress: "joe.bloggs@invalid.com",
      username: "joe_bloggs",
      password: "mypassword",
    };

    const postAndValidate = async (
      user: Register,
      msg: string,
      code: number
    ) => {
      await request(app)
        .post("/users/register")
        .send(user)
        .expect(code)
        .then((res) => {
          expect(res.body).toEqual([msg]);
        });
    };

    describe("validation", () => {
      it("validates the email address", async () => {
        await postAndValidate(
          { ...register, emailAddress: "INVALIIDEMAILADDRESS" },
          "Invalid value - emailAddress",
          422
        );
      });

      it("validates the username length", async () => {
        await postAndValidate(
          { ...register, username: [...Array(130).map((a) => "a")].join() },
          "Invalid value - username",
          422
        );
      });

      it("validates the password length", async () => {
        await postAndValidate(
          { ...register, password: [...Array(130).map((a) => "a")].join() },
          "Invalid value - password",
          422
        );
      });
    });

    describe("authentication", () => {
      beforeEach(async () => {
        await UserModel.destroy({
          where: {},
          truncate: true,
        });
      });

      it("returns a jwt token upon successful registration", async () => {
        await request(app)
          .post("/users/register")
          .send(register)
          .expect(200)
          .then(async (res) => {
            const result = await jwt.verify(
              res.body,
              process.env.PIPELINER_JWT_KEY
            );

            expect(result).toEqual(expect.objectContaining(register));
          });
      });

      it("returns http conflict if username already exists", async () => {
        await request(app).post("/users/register").send(register);

        await request(app)
          .post("/users/register")
          .send({ ...register, emailAddress: "unique.address@invalid.com" })
          .expect(409)
          .then((res) => {
            expect(res.body).toEqual(
              `A user with the username ${register.username} already exists!`
            );
          });
      });

      it("returns http conflict if email address already exists", async () => {
        await request(app).post("/users/register").send(register);

        await request(app)
          .post("/users/register")
          .send({ ...register, username: "bobby.davro" })
          .expect(409)
          .then((res) => {
            expect(res.body).toEqual(
              `A user with the email address ${register.emailAddress} already exists!`
            );
          });
      });
    });
  });
});
