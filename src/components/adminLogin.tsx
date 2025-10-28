import React, { useState } from "react";

export const AdminLogin = ({
  onLogin,
}: {
  onLogin: (role: "admin" | "manager" | "staff") => void;
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userRoles: Record<string, "admin" | "manager" | "staff"> = {
    "admin@goldlakshmi.com": "admin",
    "manager@goldlakshmi.com": "manager",
    "staff@goldlakshmi.com": "staff",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return alert("Please enter credentials.");

    const role = userRoles[email];
    if (role) {
      onLogin(role);
    } else {
      alert("Unauthorized user or email not assigned a role.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          ERP Login
        </h1>
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
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
