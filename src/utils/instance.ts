import axios from "axios";

export function getServerInstance () {
  return axios.create({
    baseURL: 'http://localhost:3030',
    timeout: 10000,
    withCredentials: true,
  });
}
