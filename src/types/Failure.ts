export enum EFailureType {
  ResponseTimeout = 'ResponseTimeout',
  ResponseInvalid = 'ResponseInvalid',
  RequestTimeout = 'RequestTimeout',
  NoInternet = 'NoInternet',
  ValidationForm = 'ValidationForm',
  Unexpected = 'Unexpected',
  Unknown = 'Unknown',
}

export interface IFailure {
  type: EFailureType | any;
  message: string | string[];
  code?: number;
}
