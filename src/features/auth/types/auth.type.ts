export interface LoginCredentials {
  email: string;
}

export interface VerifyOTPRequest {
  email: string;
  otp: string;
}

export interface VerifyOTPResponse {
  email: string;
  emailVerified: boolean;
  userAlreadyExists: boolean;
  token?: string;
}

export interface UserDetails {
  user_id: number;
  user_name: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile_number: number;
  profile_pic: string;
  email_verified: boolean;
  phone_verified: boolean;
}
