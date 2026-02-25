import { useMutation } from "@tanstack/react-query";
import { getCurrentUser, verifyOtp } from "../services/authService";
import { VerifyOTPRequest, VerifyOTPResponse } from "../types/auth.type";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (request: VerifyOTPRequest) => verifyOtp(request),

    onSuccess: async (data: VerifyOTPResponse) => {
      if (data.emailVerified) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        try {
          if (data.userAlreadyExists) {
            const userData = await getCurrentUser();

            setAuth(userData);
            console.log("Existing user - Redirecting to Dashboard");
            navigate("/dashboard");
          } else {
            console.log("New user - Redirecting to Profile Setup");
            navigate("/onboarding");
          }
        } catch (err) {
          console.error("Failed to fetch current user", err);
        }
      }
    },

    onError: (error: any) => {
      console.error(
        "Verification failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
