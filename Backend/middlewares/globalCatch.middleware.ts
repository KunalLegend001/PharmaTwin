import type { NextFunction, Request, Response } from "express";

export const globalCatch = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Global Error:", err.message);

  res.status(err.status || 500).json({
    msg: err.message || "Something is up with our server",
  });
};
