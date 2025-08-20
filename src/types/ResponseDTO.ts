export interface ResponseDTO<T> {
  data?: T;
  message?: string;
  status?: boolean
}
