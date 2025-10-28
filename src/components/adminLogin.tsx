// ...existing code...
import React, { useState } from "react";

interface AdminLoginProps {
  onLogin: (role: "admin" | "manager" | "staff") => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRoles: Record<string, "admin" | "manager" | "staff"> = {
    "admin@goldlakshmi.com": "admin",
    "manager@goldlakshmi.com": "manager",
    "staff@goldlakshmi.com": "staff",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter your credentials.");
      return;
    }

    const role = userRoles[email.trim().toLowerCase()];
    if (role) {
      onLogin(role);
    } else {
      alert("Unauthorized user or email not assigned a role.");
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center   p-4">
      <div className="bg-white  border px-4 py-4 rounded-xl  shadow-2xl w-full max-w-md ">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">ERP ADMIN LOGIN</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
               autoComplete="email"
              className="mt-1 w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
};

