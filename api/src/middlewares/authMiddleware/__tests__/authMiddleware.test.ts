import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { authMiddleware } from "../authMiddleware";

process.env.PIPELINER_JWT_KEY = "myTestKey";

describe("authMiddleware", () => {
  it("returns 401 on missing authToken cookie", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const request = ({ headers: { cookie: "" } } as any) as Request;
    const response = ({ status } as any) as Response;

    authMiddleware(request, response, () => {});
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith("Unauthorized");
  });

  it("returns 401 on empty authToken cookie", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const request = ({ headers: { cookie: "authToken=" } } as any) as Request;
    const response = ({ status } as any) as Response;

    authMiddleware(request, response, () => {});
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith("Unauthorized");
  });

  it("returns 401 on invalid authToken cookie", () => {
    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });
    const request = ({ headers: { cookie: "authToken=!!" } } as any) as Request;
    const response = ({ status } as any) as Response;

    authMiddleware(request, response, () => {});
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith("Unauthorized");
  });

  it("enriches request with encoded userId and calls next", () => {
    const token = jwt.sign({ userId: "USERID" }, process.env.PIPELINER_JWT_KEY);
    const next = jest.fn();
    const request = ({
      headers: { cookie: `authToken=${token}` },
    } as any) as Request;

    authMiddleware(request, null, next);

    expect(request["user"]).toHaveProperty("iat");
    expect(request["user"].userId).toBe("USERID");
    expect(next).toHaveBeenCalled();
  });
});
