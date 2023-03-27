import axios from "axios";

const baseUrl: string | undefined = process.env.REACT_APP_BASE_URL;

// This is an axios instance
export const instance = axios.create({
  baseURL: baseUrl,
  // timeout: 1000,
});
