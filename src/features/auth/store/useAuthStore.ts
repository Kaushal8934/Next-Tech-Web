import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserDetails } from "../types/auth.type";

interface AuthState {
  user: UserDetails | null;
  setAuth: (user: UserDetails) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setAuth: (user) => set({ user }),

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
