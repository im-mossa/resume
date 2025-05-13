// src/components/LoginForm.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useUserApi from "../hooks/useUserApi";
import { setCookie } from "../utils/helpers";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useUserApi();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields!",
      });
      return;
    }
    setLoading(true);
    try {
      await login({ username, password }, (data) => {
        const user = data[0];
        setCookie("currentUser", JSON.stringify(user), 5);
        setCookie("token", user.token, 5);
        Swal.fire({ icon: "success", title: "Welcome!" });
        router.push("/pages/panel");
      });
    } catch {
      // errors handled by useBaseApi
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Please wait..." : "Login"}
          </button>
          <Link href="../pages/signUp" className="text-sm text-blue-600 hover:underline cursor-pointer">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
