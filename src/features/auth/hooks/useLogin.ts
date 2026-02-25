import { useMutation } from "@tanstack/react-query";
import { LoginCredentials } from "../types/auth.type";
import { loginUser } from "../services/authService";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data: String) => {
      // Logic after successful login:
      // Save token to localStorage or update your Zustand store
      console.log(data);
    },
    onError: (error: any) => {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
