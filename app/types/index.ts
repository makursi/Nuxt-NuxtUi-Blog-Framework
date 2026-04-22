// User related types
export interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  user: User;
  isLogged: boolean;
  message: string;
  token: string;
}

// Auth related types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Post related types
export interface Post {
  _id: string;
  title: string;
  post_content: string;
  slug: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostListResponse {
  data: Post[];
}

export interface PostResponse {
  _id: string;
  title: string;
  post_content: string;
  slug: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostCountResponse {
  data: number;
}

export interface PostFormInput {
  title: string;
  post_content: string;
}

export interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

// API Error type
export interface APIError {
  message: string;
  statusCode?: number;
}
