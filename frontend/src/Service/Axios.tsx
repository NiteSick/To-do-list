import axios from "axios";

const BASE_URL = "http://localhost:3500/api";
const ApiService = axios.create({
  baseURL: BASE_URL,
});

export const ApiServicePrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default ApiService;
