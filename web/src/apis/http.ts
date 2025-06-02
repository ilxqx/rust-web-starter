import axios from "axios";

import { useAppStore } from "../stores";

export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}

const TOKEN_KEY = "__TOKEN__";

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
  timeout: 10000,
  validateStatus: () => true,
});

instance.interceptors.request.use(config => {
  const token = useAppStore.getState().credentials?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
