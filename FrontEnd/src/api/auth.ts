import type { User1, User2 } from "@/types/auth";
import { backendUrl } from "@/constants/constants";
import axios from "axios";

const url: string = backendUrl + "/auth";

export const login = async (user: User1) => {
  console.log("LOGIN URL:", url);
  console.log("LOGIN USER:", user);

  const response = await axios.post(url + "/login", user, {
    withCredentials: true,
  });

  return response.data;
};

export const signup = async (user: User2) => {
  const response = await axios.post(url + "/signup", user, {
    withCredentials: true,
  });

  return response.data;
};

export const check = async () => {
  const response = await axios.get(url + "/check", {
    withCredentials: true,
  });

  return response.data;
};

export const logout = async () => {
  const response = await axios.get(url + "/logout", {
    withCredentials: true,
  });

  return response.data;
};
