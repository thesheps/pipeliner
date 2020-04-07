import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { InvalidAuthTokenError } from "../../errors";

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

    console.log(tokenString);
    req["authToken"] = jwt.verify(tokenString, process.env.PIPELINER_JWT_KEY);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json("Unauthorized");
  }
};
