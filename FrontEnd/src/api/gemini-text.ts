import axios from "axios";
import { backendUrl } from "@/constants/constants";

export const Pharmachatbot = async (data: { message: string }) => {
  const response = await axios.post(`${backendUrl}/gemini/Pharmachatbot`, data, {
    withCredentials: true,
  });
  return response.data;
};