import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { setToken } from "../utils/helpers/setToken.js";
import { validateLogin, validateSignup } from "../validation/auth.validation.js";
import argon2 from "argon2";
import { errorResponse } from "../utils/helpers/errorResponse.js";
import { prisma } from "../lib/prisma.js";

const secret: string = process.env.JWT_SECRET!;

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parsed = validateSignup.safeParse(req.body);

    if (!parsed.success) {
      return errorResponse(res, 400, "Invalid Data.");
    }

    const data = parsed.data;

    const hashedPassword = await argon2.hash(data.password);

    const oldUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (oldUser) {
      return errorResponse(res, 409, "User already exists.");
    }

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,

        waterUser: {
          create: {
                municipalCorporation: {
                  connect: { id: "144b0aa8-87c5-49b3-8f80-3ec5977b5813" },
                },
          },
        },
      },
      include: {
        waterUser: true,
      },
    });

    const token = jwt.sign(
      { id: user.id },
      secret,
      { expiresIn: "28d" }
    );

    setToken(res, token);

    return res.status(201).json({
      success: true,
      msg: "Signup successful.",
      user,
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = validateLogin.safeParse(req.body);

    if (!body.success) return errorResponse(res, 400, "Invalid Data.");

    const data = body.data;

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) return errorResponse(res, 404, "User does not exist.");

    const passwordVerify: boolean = await argon2.verify(
      user.password,
      data.password,
    );

    if (!passwordVerify) return errorResponse(res, 400, "Incorrect password.");

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "28d" });

    setToken(res, token);

    return res.status(200).json({
      success: true,
      user: {
        email: user.email,
      },
      msg: "Login successful.",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, msg: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

export const check = (req: Request, res: Response) => {
  try {
    const token = req.cookies?.token;

    if (!token) return errorResponse(res, 401, "User is not logged in.");

    return res.status(200).json({
      success: true,
      msg: "User is logged in.",
    });
  } catch (error: any) {
    throw new Error(error);
  }
};
