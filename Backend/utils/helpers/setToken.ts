import type { Response } from "express";

// export const setToken = (res: Response, token: string) => {
//   res.cookie("token", token, {
//     maxAge: 28 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: "none",
//     secure: process.env.NODE_ENV === "production",
//     path: "/"
//   });
// };

// For running locally
export const setToken = (res: Response, token: string) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    maxAge: 28 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax", // "lax" works locally
    secure: isProduction, // true only in production (HTTPS)
    path: "/",
  });
};
