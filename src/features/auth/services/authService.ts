import { api } from "../../../lib/api";
import {
  LoginCredentials,
  UserDetails,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from "../types/auth.type";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<String> => {
  const { data } = await api.post<String>(
    "/api/auth/generate-otp",
    credentials,
  );
  return data;
};

export const verifyOtp = async (
  request: VerifyOTPRequest,
): Promise<VerifyOTPResponse> => {
  const { data } = await api.post<VerifyOTPResponse>(
    "/api/auth/verify-otp",
    request,
  );
  return data;
};

export const getCurrentUser = async (): Promise<UserDetails> => {
  const { data } = await api.get<UserDetails>("/api/user/getCurrentUser");
  console.log("Maurya", data);
  return data;
};
