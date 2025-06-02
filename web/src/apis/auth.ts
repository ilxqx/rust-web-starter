import type { ApiResult } from "./http";

import http from "./http";

export interface LoginParams {
  account: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
}

export interface UserInfo {
  id: string;
  name: string;
}

export async function login(params: LoginParams) {
  const { data } = await http.post<ApiResult<LoginResult>>("/auth/login", params);

  if (data.code !== 0) {
    throw new Error(data.message);
  }

  return data.data;
}

export async function logout() {
  const { data } = await http.post("/auth/logout");

  if (data.code !== 0) {
    throw new Error(data.message);
  }
}

export async function getUserInfo() {
  const { data } = await http.get<ApiResult<UserInfo>>("/auth/user-info");

  if (data.code !== 0) {
    throw new Error(data.message);
  }

  return data.data;
}
