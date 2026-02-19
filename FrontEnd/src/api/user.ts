import { backendUrl } from "@/constants/constants";
import axios from "axios";

const url: string = backendUrl + "/user";

export const profile = async () => {
  const response = await axios.get(url + "/profile", {
    withCredentials: true,
  });
  console.log("profile() response = ", response);
  return response.data;
};
