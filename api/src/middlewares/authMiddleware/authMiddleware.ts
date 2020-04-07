import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { InvalidAuthTokenError } from "../../errors";
import { User } from "@pipeliner/db/src";

const parseCookie = (cookie: string): string => {
  var value = "; " + cookie;
  var parts = value.split("; authToken=");

  if (parts.length == 2) return parts.pop().split(";").shift();

  return "";
};

export const authMiddleware = (req: Request, res: Response, next: Function) => {
  try {
    const tokenString = parseCookie(req.headers.cookie);
    if (!tokenString?.length) throw new InvalidAuthTokenError();

    const payload = jwt.verify(tokenString, process.env.PIPELINER_JWT_KEY);
    req["user"] = payload as User;

    next();
  } catch (error) {
    res.status(401).json("Unauthorized");
  }
};
