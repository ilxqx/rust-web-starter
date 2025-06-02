import type { ApiResult } from "./http";

import http from "./http";

export interface User {
  id: string;
  name: string;
  gender: "male" | "female";
  account: string;
  password?: string;
  mobilePhone: string;
  birthday: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Page<T> {
  page: number;
  size: number;
  total: number;
  items: T[];
}

export interface UserQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface UserParams {
  id?: string;
  name: string;
  gender: "male" | "female";
  account: string;
  password?: string;
  mobilePhone: string;
  birthday: string;
  enabled: boolean;
}

// 获取用户分页数据
export async function getUserPage(params?: UserQueryParams): Promise<ApiResult<Page<User>>> {
  const { data } = await http.get<ApiResult<Page<User>>>("/users", { params });

  if (data.code !== 0) {
    throw new Error(data.message);
  }

  return data;
}

// 创建用户
export async function createUser(params: UserParams): Promise<ApiResult<User>> {
  const { data } = await http.post<ApiResult<User>>("/users", params);

  if (data.code !== 0) {
    throw new Error(data.message);
  }

  return data;
}

// 更新用户
export async function updateUser({ id, ...params }: UserParams): Promise<ApiResult<User>> {
  params.password = params.password || "";
  const { data } = await http.put<ApiResult<User>>(`/users/${id}`, params);

  if (data.code !== 0) {
    throw new Error(data.message);
  }

  return data;
}

// 删除用户
export async function deleteUser(id: string): Promise<ApiResult<void>> {
  const { data } = await http.delete<ApiResult<void>>(`/users/${id}`);

  if (data.code !== 0) {
    throw new Error(data.message);
  }

  return data;
}
