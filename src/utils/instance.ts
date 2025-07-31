import axios from "axios";

export function getServerInstance () {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    withCredentials: true,
  });
}
