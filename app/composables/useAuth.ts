import type { LoginInput, RegisterInput, LoginResponse, UserResponse } from '~/types';
import { loginSchema, registerSchema } from '../../schemas/auth.schema';

export const useAuth = () => {
  const { $csrfFetch } = useNuxtApp();
  const authStore = useAuthStore();
  const toast = useToast();
  const router = useRouter();

  const handleError = (error: any, context?: string) => {
    console.error(`[${context}]`, error);

    let message = 'An unexpected error occurred';

    if (error.response) {
      const status = error.response.status;
      const data = error.response._data;

      switch (status) {
        case 400:
          message = data.message || 'Invalid request';
          break;
        case 401:
          message = 'Please login to continue';
          authStore.clearUser();
          router.push('/login');
          break;
        case 403:
          message = 'You do not have permission';
          break;
        case 404:
          message = 'Resource not found';
          break;
        case 500:
          message = 'Server error, please try again later';
          break;
        default:
          message = data.message || 'Request failed';
      }
    } else if (error.message) {
      message = error.message;
    }

    toast.add({
      title: 'Error',
      description: message,
      color: 'error',
      icon: 'i-tabler-alert-circle',
    });

    return message;
  };

  const login = async (credentials: LoginInput): Promise<LoginResponse | null> => {
    try {
      // Validate input
      const validated = loginSchema.parse(credentials);
      
      authStore.setLoading(true);
      authStore.clearError();

      const response = await $csrfFetch<LoginResponse>('/api/login', {
        method: 'POST',
        body: validated,
      });

      authStore.setUser(response.user);
      authStore.setToken(response.token);
      authStore.persistAuth();

      toast.add({
        title: 'Success',
        description: 'Login successful',
        color: 'success',
      });

      return response;
    } catch (error: any) {
      const message = handleError(error, 'login');
      authStore.setError(message);
      return null;
    } finally {
      authStore.setLoading(false);
    }
  };

  const register = async (data: RegisterInput): Promise<UserResponse | null> => {
    try {
      // Validate input
      const validated = registerSchema.parse(data);
      
      authStore.setLoading(true);
      authStore.clearError();

      const response = await $csrfFetch<UserResponse>('/api/register', {
        method: 'POST',
        body: validated,
      });

      toast.add({
        title: 'Success',
        description: 'Registration successful. Please login.',
        color: 'success',
      });

      return response;
    } catch (error: any) {
      const message = handleError(error, 'register');
      authStore.setError(message);
      return null;
    } finally {
      authStore.setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      authStore.setLoading(true);

      await $csrfFetch('/api/logout', { method: 'POST' });

      authStore.clearUser();
      authStore.persistAuth();

      toast.add({
        title: 'Success',
        description: 'Logged out successfully',
        color: 'success',
      });

      router.push('/');
    } catch (error: any) {
      handleError(error, 'logout');
    } finally {
      authStore.setLoading(false);
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await $csrfFetch<{ success: boolean }>('/api/check/user/loggedin');
      
      if (response.success) {
        authStore.isLoggedIn = true;
        return true;
      }
      
      return false;
    } catch (error) {
      authStore.clearUser();
      return false;
    }
  };

  return {
    login,
    register,
    logout,
    checkAuth,
    handleError,
  };
};
