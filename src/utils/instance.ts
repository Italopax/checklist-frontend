import { refershToken } from "@/actions/auth";
import axios from "axios";

export function getServerInstance () {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
  });

  instance.interceptors.response.use((response) => response, async (error) => {
    const stausCode = error.response.data.status;
    if (stausCode === 401) {
      await refershToken();
      return instance(error.config);
    }

    return Promise.reject(error);
  });

  return instance;
}
