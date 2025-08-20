
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
}

export type AuthEntity = {
  user: {
    name: string;
    email: string;
  };
  accessToken: string;
};
