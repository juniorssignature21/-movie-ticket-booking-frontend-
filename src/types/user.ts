export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  is_staff: boolean;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
