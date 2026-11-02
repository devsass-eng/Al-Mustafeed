export type UserRole = 'dev' | 'admin' | 'teacher';

export interface DemoUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  avatarInitials: string;
  responsibilities: string[];
}

export interface LoginFormState {
  identifier: string; // username or email
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  identifier?: string;
  password?: string;
  general?: string;
}

