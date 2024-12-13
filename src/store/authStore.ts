import { create } from 'zustand';
import type { AuthState } from '../types/auth';
import { persist } from 'zustand/middleware';
import { loginApi, createAdminApi, checkAdminExistsApi } from '../lib/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      adminExists: false,
      token: null,

      checkAdminExists: async () => {
        try {
          const { exists } = await checkAdminExistsApi();
          set({ adminExists: exists, isInitialized: true });
        } catch (error) {
          console.error('Failed to check admin existence:', error);
          set({ isInitialized: true });
        }
      },

      createAdmin: async (username: string, password: string) => {
        try {
          const { user, token } = await createAdminApi({ username, password, confirmPassword: password });
          set({
            user: {
              id: user.id,
              username: user.username,
              role: user.role,
              permissions: []
            },
            isAuthenticated: true,
            adminExists: true,
            token
          });
        } catch (error) {
          console.error('Failed to create admin:', error);
          throw error;
        }
      },

      login: async (username: string, password: string) => {
        try {
          const { user, token } = await loginApi({ username, password });
          set({
            user: {
              id: user.id,
              username: user.username,
              role: user.role,
              permissions: []
            },
            isAuthenticated: true,
            token
          });
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, token: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);