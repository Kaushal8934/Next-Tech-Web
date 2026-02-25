import { EmailVerification } from "./components/LoginForm";

function AuthScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wide">
              Next Tech
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-gray-800/50 p-1 rounded-3xl border border-white/10 backdrop-blur-xl">
        <EmailVerification />
      </div>

      <p className="mt-8 text-sm text-gray-500">
        &copy; 2026 Next Tech Technology pvt ltd. All rights reserved.
      </p>
    </div>
  );
}

export default AuthScreen;
