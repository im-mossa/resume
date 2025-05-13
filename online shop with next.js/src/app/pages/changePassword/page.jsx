// src/app/pages/changePassword/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useUserApi from "@/app/hooks/useUserApi";
import { getCookie, setCookie } from "@/app/utils/helpers";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { changePassword } = useUserApi();

  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // بارگذاری username از کوکی
  useEffect(() => {
    const json = getCookie("currentUser");
    if (!json) {
      Swal.fire({
        icon: "error",
        title: "Not Logged In",
        text: "Please log in first.",
      }).then(() => router.push("/login"));
      return;
    }
    try {
      const user = JSON.parse(json);
      setUsername(user.username);
    } catch {
      router.push("/pages/login");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill in both passwords.",
      });
      return;
    }

    const json = getCookie("currentUser");
    const currentUser = JSON.parse(json);
    const payload = {
      ...currentUser,
      oldPassword: currentPassword,
      password: newPassword,
      repeatPassword: newPassword,
    };

    setLoading(true);
    await changePassword(payload, currentUser.token, (data) => {
      const updated = data[0];
      setCookie("currentUser", JSON.stringify(updated), 5);
      setCookie("token", updated.token, 5);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your password has been changed.",
      }).then(() => router.push("/panel"));
    });
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 my-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
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
            disabled
            className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
