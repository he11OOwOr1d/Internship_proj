import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }
    // Placeholder for actual submission logic
    localStorage.setItem('user', JSON.stringify({ email }));
    alert('Sign in successful');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-teal-500">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to your account</p>
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              onClick={toggleVisibility}
            >
              {isVisible ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button
          className="w-full mt-8 bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          onClick={handleSubmit}
        >
          Sign In
        </button>
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
        </div>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
}
