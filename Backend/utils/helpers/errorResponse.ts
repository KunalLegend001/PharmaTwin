import type { Response } from "express";
import { serverError } from "../constants/string.constant.js";

export const errorResponse = (
  res: Response,
  code: number,
  msg: string,
) => {
  return res.status(code).json({
    success: false,
    message: msg || serverError,
  });
};
