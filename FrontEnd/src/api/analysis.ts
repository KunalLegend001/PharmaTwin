import { backendUrl } from "@/constants/constants";
import axios from "axios";

const pharmaUrl: string = backendUrl + "/anyalsis";

export const analyzeVCF = async (file: File, drugs: string) => {
  const formData = new FormData();
  formData.append("vcf", file);
  formData.append("drugs", drugs);

  const response = await axios.post(
    pharmaUrl + "/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );

  return response.data;
};
