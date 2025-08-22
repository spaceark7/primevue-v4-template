import type { LoginRequest, LoginResponse } from "@/core/auth/AuthEntity";
import { HttpClient } from "./http-client";
import type { AxiosRequestConfig } from "axios";
import { ContentType, HttpMethod } from "@/types/HttpClient";
//TODO: Move it to configs
const BASE_API_URL = import.meta.env.VITE_APP_API_BASE_URL

export class Auth extends HttpClient {
  private static _instance: Auth | null = null;

  private constructor() {
    super({
      baseURL: `${BASE_API_URL}`,
      headers: {
        "Content-Type": ContentType.JSON,
      },
    });
  }

  public static getInstance(): Auth {
    if (!Auth._instance) {
      Auth._instance = new Auth();
    }
    return Auth._instance;
  }


  public async login(request: LoginRequest, axiosConfig?: AxiosRequestConfig): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>({
      method: HttpMethod.POST,
      url: '/auth/login',
      data: request,
      headers: {
        'Require-Token': false, // Disable token requirement by default
      },
      ...axiosConfig
    });
    console.log(`Remote_Source:${this.instance.name}`, response);
    return response.data;
  }

}

export const authClient = Auth.getInstance();
