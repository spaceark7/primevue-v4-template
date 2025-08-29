import { ContentType, type AuthConfig, type HttpClientOptions, type RequestOptions } from '@/types/HttpClient';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType as AxiosResponseType
} from 'axios';

import axios from 'axios';
import { serializeQuery } from 'prisma-query-tools';

const setupAxiosInterceptor = async (instance: AxiosInstance) => {
  const { setupInterceptors } = await import('@/plugins/AxiosInterceptors');
  setupInterceptors(instance);
}
/**
 * HTTP Client Service - Singleton implementation
 */
export class HttpClient {
  public instance: AxiosInstance;
  private authConfig: AuthConfig | null = null;
  private interceptorsSetup = false;
  /**
   * Private constructor to prevent direct instantiation
   */
   constructor(options: HttpClientOptions = {}) {
    // Create Axios instance with default configuration
    this.instance = axios.create({
      baseURL: options.baseURL || import.meta.env.VITE_API_URL,
      timeout: options.timeout || 30000,
      headers: {
        'Content-Type': ContentType.JSON,
        ...(options.headers)
      }
    });

    // Apply interceptors Later
     // setupInterceptors(this.instance);
  }

  /**
   * Set authentication configuration
   */
  public setAuth(config: AuthConfig | null): void {
    this.authConfig = config;
  }

  /**
   * Get current authentication configuration
   */
  public getAuth(): AuthConfig | null {
    return this.authConfig;
  }

  /**
   * Clear authentication configuration
   */
  public clearAuth(): void {
    this.authConfig = null;
  }

  /**
   * Create form data from an object
   */
  private createFormData(data: Record<string, any>): FormData {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return; // Skip null or undefined values
      }

      if (Array.isArray(value)) {
        // Handle arrays of values
        value.forEach((item, index) => {
          const itemKey = `${key}[${index}]`;
          if (item instanceof File || item instanceof Blob) {
            formData.append(itemKey, item);
          } else if (item === null || item === undefined) {
            // Skip null/undefined array items
          } else if (typeof item === 'object') {
            formData.append(itemKey, JSON.stringify(item));
          } else {
            formData.append(itemKey, String(item));
          }
        });
      } else if (value instanceof File || value instanceof Blob) {
        // Handle File/Blob objects
        formData.append(key, value);
      } else if (typeof value === 'object') {
        // Handle nested objects
        formData.append(key, JSON.stringify(value));
      } else {
        // Handle primitive values
        formData.append(key, String(value));
      }
    });

    return formData;
  }

  /**
   * Prepare request configuration
   */
  private prepareRequest<D = any>(options: RequestOptions<D>): AxiosRequestConfig {
    const {
      method,
      url,
      data,
      params,
      headers = {},
      requiresAuth = false,
      contentType = ContentType.JSON,
      responseType,
      timeout,
      baseURL
    } = options;

    // Add auth header if needed
    if (requiresAuth && this.authConfig) {
      headers['Authorization'] = `${this.authConfig.type} ${this.authConfig.token}`;
    }

    // Set content type if needed
    if (contentType && contentType !== ContentType.FORM_DATA) {
      headers['Content-Type'] = contentType;
    }

    // Process data based on content type
    let processedData: any = data;
    if (data && contentType === ContentType.FORM_DATA && typeof data === 'object') {
      processedData = this.createFormData(data as Record<string, any>);
    } else if (data && contentType === ContentType.TEXT && typeof data !== 'string') {
      processedData = JSON.stringify(data);
    }

    return {
      method,
      url,
      data: processedData,
      params,
      headers,
      responseType,
      ...(timeout ? { timeout } : {}),
      ...(baseURL ? { baseURL } : {})
    };
  }

  /**
   * Main request method
   */
  public async request<T = any, D = any>(options: RequestOptions<D>): Promise<AxiosResponse<T>> {
    if (!this.interceptorsSetup) {
      await setupAxiosInterceptor(this.instance);
      this.interceptorsSetup = true;
    }
      const config = this.prepareRequest<D>(options);
      if (config.responseType) {
        // Make sure responseType is in lowercase to match Axios expectations
        if (typeof config.responseType === 'string') {
          config.responseType = config.responseType.toLowerCase() as AxiosResponseType;
        } else if (typeof config.responseType === 'object') {
          // If it's an enum value, convert to string and lowercase
          config.responseType = String(config.responseType).toLowerCase() as AxiosResponseType;
        }
      }
    return this.instance.request<T>({
      ...config,
      paramsSerializer: (params) => {
        return serializeQuery(params, { startWithQuestionMark: false });
      }
    });
    }
  }


  // /**
  //  * GET request method
  //  */
  // public async get<T = any>(
  //   url: string,
  //   params?: Record<string, any>,
  //   options: Omit<RequestOptions<never>, 'method' | 'url' | 'data' | 'params'> = {}
  // ): Promise<T> {
  //   return this.request<T>({
  //     method: HttpMethod.GET,
  //     url,
  //     params,
  //     ...options
  //   });
  // }

  // /**
  //  * POST request method
  //  */
  // public async post<T = any, D = any>(
  //   url: string,
  //   data?: D,
  //   options: Omit<RequestOptions<D>, 'method' | 'url' | 'data'> = {}
  // ): Promise<T> {
  //   return this.request<T, D>({
  //     method: HttpMethod.POST,
  //     url,
  //     data,
  //     ...options
  //   });
  // }

  // /**
  //  * PUT request method
  //  */
  // public async put<T = any, D = any>(
  //   url: string,
  //   data?: D,
  //   options: Omit<RequestOptions<D>, 'method' | 'url' | 'data'> = {}
  // ): Promise<T> {
  //   return this.request<T, D>({
  //     method: HttpMethod.PUT,
  //     url,
  //     data,
  //     ...options
  //   });
  // }

  // /**
  //  * PATCH request method
  //  */
  // public async patch<T = any, D = any>(
  //   url: string,
  //   data?: D,
  //   options: Omit<RequestOptions<D>, 'method' | 'url' | 'data'> = {}
  // ): Promise<T> {
  //   return this.request<T, D>({
  //     method: HttpMethod.PATCH,
  //     url,
  //     data,
  //     ...options
  //   });
  // }

  // /**
  //  * DELETE request method
  //  */
  // public async delete<T = any>(
  //   url: string,
  //   options: Omit<RequestOptions<never>, 'method' | 'url'> = {}
  // ): Promise<T> {
  //   return this.request<T>({
  //     method: HttpMethod.DELETE,
  //     url,
  //     ...options
  //   });
// }
