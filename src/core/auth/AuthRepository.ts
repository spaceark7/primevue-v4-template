import type { LoginRequest, LoginResponse } from "./AuthEntity";

export interface AuthRepository {
  login(request: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
}