import type { LoginRequest, LoginResponse } from "@/core/auth/AuthEntity";
import type { AuthRepository } from "@/core/auth/AuthRepository";
import { Auth, authClient } from '../data-sources/Auth';
import axios from "axios";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private authClient: Auth) {}

  async login(request: LoginRequest): Promise<LoginResponse> {
    try {
      const remoteResponse = await this.authClient.login(request);
      const resData = remoteResponse.data;
      return resData?.data as LoginResponse;
    } catch (error) {
      console.error('AuthRepositoryImpl:login:error', error);
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        const axiosInstance = error.response;
        const remoteResponse = axiosInstance?.data;
        console.error('Axios error response:', remoteResponse);
        throw new Error(remoteResponse ? (Array.isArray(remoteResponse.message) ? remoteResponse.message.join(', ') : remoteResponse.message) : error.message);
      } else if (error instanceof Error) {
        // Handle generic error
        console.error('Error occurred:', error);
        throw new Error(error.message);
      }
      throw error;
    }
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
