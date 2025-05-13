// src/components/PanelSection.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePanelApi } from "../hooks/usePanelApi";
import { getCookie, logOutSystem } from "../utils/helpers";

export default function PanelSection() {
  const { getUserInfo } = usePanelApi();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUserJson = getCookie("currentUser");
    if (!currentUserJson) return;
    const currentUser = JSON.parse(currentUserJson);

    getUserInfo(currentUser.token, (data) => {
      setUser(data[0]?.customer ?? null);
    });
  }, [getUserInfo]);

  if (!user) {
    return <div className="py-20 text-center">Loading dashboard…</div>;
  }

  const cards = [
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Phone", value: user.phone },
    { label: "Postal Code", value: user.postalCode },
    { label: "Address", value: user.address },
  ];

  return (
    <div className="px-4 py-6">
      {/* کارت‌های اطلاعات کاربر */}
      <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <p className="mb-2 text-sm font-medium text-gray-600">{label}</p>
            <p className="text-lg font-semibold text-gray-800">{value}</p>
          </div>
        ))}
      </div>

      {/* دکمه‌های پایین */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/pages/invoices"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-center"
        >
          View My Invoices
        </Link>
        <Link
          href="/pages/changePassword"
          className="px-6 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition text-center"
        >
          Change Password
        </Link>
        <button
          onClick={logOutSystem}
          className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
