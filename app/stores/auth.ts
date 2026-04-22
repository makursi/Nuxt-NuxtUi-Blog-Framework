import { defineStore } from 'pinia';
import type { User, AuthState } from '~/types';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => state.isLoggedIn && !!state.token,
    userName: (state) => state.user?.name || 'Guest',
  },

  actions: {
    setUser(user: User) {
      this.user = user;
      this.isLoggedIn = true;
    },

    setToken(token: string) {
      this.token = token;
    },

    clearUser() {
      this.user = null;
      this.token = null;
      this.isLoggedIn = false;
    },

    clearError() {
      this.error = null;
    },

    setLoading(loading: boolean) {
      this.loading = loading;
    },

    setError(error: string | null) {
      this.error = error;
    },

    // Initialize auth state from localStorage (for client-side persistence)
    initAuth() {
      if (import.meta.client) {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          try {
            this.user = JSON.parse(storedUser);
            this.token = storedToken;
            this.isLoggedIn = true;
          } catch (e) {
            this.clearUser();
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }
      }
    },

    // Persist auth state to localStorage
    persistAuth() {
      if (import.meta.client) {
        if (this.user && this.token) {
          localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', this.token);
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    },
  },
});
