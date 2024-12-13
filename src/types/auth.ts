import { User } from './index';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  adminExists: boolean;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  createAdmin: (username: string, password: string) => Promise<void>;
  checkAdminExists: () => Promise<void>;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  confirmPassword: string;
}