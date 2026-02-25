import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useVerifyOtp } from "../hooks/useVerifyOtp";

export const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const loginMutation = useLogin();
  const verifyMutation = useVerifyOtp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(
      { email },
      {
        onSuccess: (data) => {
          setShowOtp(true);
          console.log(data);
        },
      },
    );
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyMutation.mutate(
      { email, otp },
      {
        onSuccess: (data) => {
          if (data.emailVerified) {
            console.log("Authentication Complete", data);
          }
        },
      },
    );
  };

  if (showOtp) {
    return (
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Verify OTP
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Sent to {email}
        </p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-center tracking-widest text-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition"
            onClick={handleOtpSubmit}
          >
            Verify & Continue
          </button>
          <button
            type="button"
            onClick={() => setShowOtp(false)}
            className="w-full text-sm text-gray-500 hover:text-gray-300"
          >
            Back to Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        Login to your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition disabled:opacity-50"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && (
          <p className="text-red-500 text-sm text-center">
            {(loginMutation.error as any)?.message || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
};
