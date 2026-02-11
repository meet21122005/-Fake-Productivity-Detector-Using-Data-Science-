import { motion } from "motion/react";
import { Activity, Chrome, User, Lock } from "lucide-react";
import { useState } from "react";

interface LoginPageProps {
  onLogin: (userData: { name: string; email: string; photo: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleGoogleLogin = () => {
    // Mock Google login - in production, integrate with Firebase Auth or Google OAuth
    const mockUserData = {
      name: "rohitbabadkar",
      email: "",
      photo: "https://ui-avatars.com/api/?name=R&background=4F46E5&color=FFFFFF&size=100",
    };
    onLogin(mockUserData);
  };

  const handleUsernameLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      const mockUserData = {
        name: username,
        email: "",
        photo: `https://ui-avatars.com/api/?name=${username.charAt(0).toUpperCase()}&background=4F46E5&color=FFFFFF&size=100`,
      };
      onLogin(mockUserData);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="backdrop-blur-lg bg-white/70 border border-white/50 rounded-3xl shadow-2xl p-12 w-full max-w-md">
          {/* Logo and Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Activity className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fake Productivity Detector
            </h1>
            <p className="text-gray-600 text-sm">
              Analyze your activity and discover your true productivity
            </p>
          </motion.div>

          {/* Login Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-4"
          >
            {/* Toggle between login modes */}
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button
                  onClick={() => setIsLoginMode(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    isLoginMode
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Username Login
                </button>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    !isLoginMode
                      ? "bg-white text-gray-800 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Google Login
                </button>
              </div>
            </div>

            {isLoginMode ? (
              /* Username/Password Login */
              <form onSubmit={handleUsernameLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              </form>
            ) : (
              /* Google Login */
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white hover:bg-gray-50 text-gray-800 py-4 px-6 rounded-xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Chrome className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                <span>Sign in with Google</span>
              </button>
            )}

            <p className="text-xs text-gray-500 text-center mt-6">
              Academic Project • Data Science & Web Technologies
            </p>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
