import type { TestArrayEntity, TestEntity } from "@/core/test/TestEntity";
import { APP_CONFIG } from "@/helpers/Config";
import type { AxiosRequestConfig } from "axios";
import { HttpClient } from "./http-client";
import type { ResponseDTO } from "@/types/ResponseDTO";
import { ContentType, HttpMethod } from "@/types/HttpClient";

export class TestFetch extends HttpClient {
  private static _instance: TestFetch | null = null;

  private constructor() {
    super({
      baseURL: APP_CONFIG.API_URL,
      headers: {
        "Content-Type": ContentType.JSON,
      },
    });
  }

  public static getInstance(): TestFetch {
    if (!TestFetch._instance) {
      TestFetch._instance = new TestFetch();
    }
    return TestFetch._instance;
  }


  public async testFetch(params?: any, axiosConfig?: AxiosRequestConfig) {
    return this.request<ResponseDTO<TestEntity>>({
      method: HttpMethod.GET,
      url: '/test-endpoint',
      params,
      ...axiosConfig
    });
  }

  public async testFetchArray(params?: any, axiosConfig?: AxiosRequestConfig){
    return this.request<ResponseDTO<TestArrayEntity[]>>({
      method: HttpMethod.GET,
      url: '/books',
      params,
      ...axiosConfig
    });
  }

}

export const testFetchClient = TestFetch.getInstance();
