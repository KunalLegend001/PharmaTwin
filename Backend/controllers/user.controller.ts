import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { decodeToken } from "../utils/helpers/decodeToken.js";

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decodedToken: any = decodeToken(req.cookies.token, res);

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        email: true,
        name: true,
      },
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
