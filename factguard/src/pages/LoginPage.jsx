// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLogin) {
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      navigate("/analyze");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/analyze");
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-10 relative">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-24 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,181,0.15)_0%,_transparent_70%)] blur-2xl pointer-events-none z-0" />

      <div className="w-full max-w-md bg-[#0c0c0c]/60 backdrop-blur-md border border-[#2c2c2c] rounded-2xl p-8 z-10 shadow-[0_8px_40px_rgba(0,255,255,0.06)] hover:shadow-[0_0_40px_rgba(0,240,181,0.15)] transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? "Sign in" : "Create account"}
        </h2>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#111] text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a1a1a] transition mb-6 border border-[#2c2c2c]"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="relative text-center text-xs mb-6 text-white/50">
          <span className="bg-[#0c0c0c]/60 px-2 relative">
            or {isLogin ? "Sign in" : "sign up"} with credentials
          </span>
          <div className="absolute left-0 top-1/2 w-full border-t border-[#2c2c2c] transform -translate-y-1/2" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-white">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-white/70">Full Name</label>
              <div className="flex items-center border border-[#2c2c2c] rounded-lg px-3">
                <User size={16} className="text-white/50 mr-2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Asfandyar Shabbir"
                  required
                  className="bg-transparent flex-1 py-2 text-sm focus:outline-none text-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-white/70">Email</label>
            <div className="flex items-center border border-[#2c2c2c] rounded-lg px-3">
              <Mail size={16} className="text-white/50 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="bg-transparent flex-1 py-2 text-sm focus:outline-none text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-white/70">Password</label>
            <div className="relative flex items-center border border-[#2c2c2c] rounded-lg px-3">
              <Lock size={16} className="text-white/50 mr-2" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-transparent flex-1 py-2 text-sm focus:outline-none text-white"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 text-white/50"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="text-sm font-medium text-white/70">Confirm Password</label>
              <div className="flex items-center border border-[#2c2c2c] rounded-lg px-3">
                <Lock size={16} className="text-white/50 mr-2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                  className="bg-transparent flex-1 py-2 text-sm focus:outline-none text-white"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#00F0B5] to-[#9B59B6] text-black font-semibold py-2 rounded-lg hover:scale-[1.01] transition shadow"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00F0B5] hover:underline font-medium"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

