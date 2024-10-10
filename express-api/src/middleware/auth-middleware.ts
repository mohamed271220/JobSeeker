import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { userRequest } from "../interfaces";

export function authenticateToken(
  req: userRequest,
  res: Response,
  next: NextFunction
) {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];
  try {
    const token = req.cookies.auth_token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = verifyToken(token);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = {
      id: user.id,
      roles: user.roles.map((role) => role.toLocaleLowerCase()),
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export function optionalAuthenticateToken(
  req: userRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.auth_token;

    if (!token) return next();

    const user = verifyToken(token);
    if (!user) return next();
    req.user = {
      id: user.id,
      roles: user.roles.map((role) => role.toLocaleLowerCase()),
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}