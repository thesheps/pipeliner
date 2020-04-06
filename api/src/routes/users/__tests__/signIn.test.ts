import jwt from "jsonwebtoken";
import request from "supertest";

import { User, UserModel, createUser } from "@pipeliner/db";

import { app } from "../../../app";
import { SignIn } from "../../../models";

process.env.PIPELINER_JWT_KEY = "myTestKey";

describe("Users", () => {
  const expectedUser: User = {
    emailAddress: "john.doe@invalid.com",
    password: "password",
    username: "j_doe",
  };

  beforeEach(async () => {
    await UserModel.destroy({
      where: { username: "j_doe" },
    });

    await createUser(expectedUser);
  });

  describe("signing in", () => {
    const signIn: SignIn = {
      emailAddress: expectedUser.emailAddress,
      password: expectedUser.password,
    };

    describe("validation", () => {
      const postAndValidate = async (user: SignIn, msg: string) => {
        await request(app)
          .post("/users/sign-in")
          .send(user)
          .expect(422)
          .then((res) => {
            expect(res.body).toEqual([msg]);
          });
      };

      it("validates the email address", async () => {
        await postAndValidate(
          { ...signIn, emailAddress: "INVALIIDEMAILADDRESS" },
          "Invalid value - emailAddress"
        );
      });

      it("validates the password length", async () => {
        await postAndValidate(
          { ...signIn, password: [...Array(130).map((a) => "a")].join() },
          "Invalid value - password"
        );
      });
    });

    describe("authentication", () => {
      const OLD_ENV = process.env;

      afterEach(() => {
        process.env = OLD_ENV;
      });

      it("returns a jwt token upon successful sign-in", async () => {
        process.env.PIPELINER_JWT_KEY = "myTestKey";

        await request(app)
          .post("/users/sign-in")
          .send(signIn)
          .expect(200)
          .then(async (res) => {
            const result = await jwt.verify(
              res.body,
              process.env.PIPELINER_JWT_KEY
            );

            expect(result).toHaveProperty("iat");
            expect(result).toHaveProperty("userId");
          });
      });
    });
  });
});
