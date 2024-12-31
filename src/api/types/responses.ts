export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  createdAt: string;
} 