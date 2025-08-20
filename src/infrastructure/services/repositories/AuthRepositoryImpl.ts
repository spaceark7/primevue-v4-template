import type { LoginRequest, LoginResponse } from "@/core/auth/AuthEntity";
import type { AuthRepository } from "@/core/auth/AuthRepository";
import { Auth, authClient } from '../data-sources/Auth';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private authClient: Auth) {}
  
  login(request: LoginRequest): Promise<LoginResponse> {
    return this.authClient.login(request);
  }
  
  logout(): Promise<void> {
    // Implementation using this.authClient
    return Promise.resolve();
  }
  
  refreshToken(): Promise<string> {
    // Implementation using this.authClient
    return Promise.resolve('new-token');
  }
}

// Create an instance using the singleton authClient
export const authRepository = new AuthRepositoryImpl(authClient);
