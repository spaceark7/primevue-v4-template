export interface IMetaResponse {
  status: string;
  statusCode: number;
  responseSpeed: string;
  serverTime: string;
  path: string;
  lang: string;
  dataCount?: number;
  pagination?: IPagination;
}

export interface IRemoteResponse {
  success: boolean;
  message: string | string[];
  meta: IMetaResponse;
  data?: any; // expected object | objec[] | Record<string,any>
}

export interface IPagination {
  itemFound: number;
  itemTotal: number;
  itemPerPage: number;
  totalPage: number;
  currentPage: number;
  linkPage: ILinkPage;
}

export interface ILinkPage {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface INonDataResponse {
  success: boolean;
  message: string;
}

/**
 * This is the interface for the response data with meta
 * @param T - the data type
 */
export interface IDataMetaResponse<T> {
  data: T;
  meta: IMetaResponse;
}

/**
 * This is the interface for the response data with pagination meta
 * @param T - the data type
 */
export interface IDataPaginationResponse<T> {
  data: T;
  pagination?: IPagination;
}
