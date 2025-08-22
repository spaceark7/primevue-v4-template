import type {
  ResponseType as AxiosResponseType
} from 'axios';
/**
 * HTTP request methods enum
 */
export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  HEAD = 'head',
  OPTIONS = 'options',
}

/**
 * Content types for HTTP requests
 */
export enum ContentType {
  JSON = 'application/json',
  FORM_DATA = 'multipart/form-data',
  URL_ENCODED = 'application/x-www-form-urlencoded',
  TEXT = 'text/plain',
}


/**
 * Authorization token types
 */
export enum TokenType {
  BEARER = 'Bearer',
  BASIC = 'Basic',
}

/**
 * Authentication configuration
 */
export interface AuthConfig {
  token: string;
  type: TokenType;
  refreshToken?: string;
  expiry?: number;
}

/**
 * HTTP request options
 */
export interface RequestOptions<D = any> {
  method: HttpMethod | any;
  url: string;
  data?: D;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  requiresAuth?: boolean;
  contentType?: ContentType;
  responseType?: ResponseType | AxiosResponseType;
  timeout?: number;
  baseURL?: string; // Override the default baseURL
}

/**
 * HTTP Client Options for initialization
 */
export interface HttpClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;

}

/**
 * Type for response data parsing
 */
export enum ResponseType {
  ARRAYBUFFER = 'arraybuffer',
  BLOB = 'blob',
  DOCUMENT = 'document',
  JSON = 'json',
  TEXT = 'text',
  STREAM = 'stream'
}
