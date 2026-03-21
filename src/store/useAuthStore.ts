import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  firstName: string;
  lastName: string;
  phone: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => {
        // Also set a cookie for middleware (Edge runtime can't read localStorage)
        document.cookie = `taleora_auth_token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        // Clear the cookie
        document.cookie = "taleora_auth_token=; path=/; max-age=0; SameSite=Lax";
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "taleora_auth",
      // Rehydrate isAuthenticated from persisted token
      onRehydrateStorage: () => (state) => {
        if (state && state.token) {
          state.isAuthenticated = true;
        }
      },
    },
  ),
);
