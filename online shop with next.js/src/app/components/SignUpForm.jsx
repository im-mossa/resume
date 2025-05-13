// src/components/SignUpForm.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import useUserApi from "../hooks/useUserApi";
import { setCookie } from "../utils/helpers";

export default function SignUpForm() {
  const router = useRouter();
  const { signUp } = useUserApi();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    postalCode: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    for (const key in formData) {
      if (!formData[key]) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields!",
        });
        return;
      }
    }
    setLoading(true);
    try {
      await signUp(formData, (data) => {
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
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Username", name: "username", type: "text" },
          { label: "Password", name: "password", type: "password" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Postal Code", name: "postalCode", type: "text" },
          { label: "Address", name: "address", type: "text" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label
              htmlFor={name}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}
