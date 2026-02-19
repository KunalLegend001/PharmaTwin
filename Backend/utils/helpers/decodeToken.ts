import type { Response } from "express";
import { errorResponse } from "./errorResponse.js";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"

export const decodeToken = (token: string, res: Response) => {
  if (!token)
    return errorResponse(res, 404, "No autorization token was found.");

  const decodedToken: string | JwtPayload = jwt.decode(token)!;

  return decodedToken;
};
