"use client";

import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">
        {/* Spacer for mobile menu button */}
        <div className="w-10 lg:hidden" />

        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="بحث في النظام..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-10 pe-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 end-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User info (desktop only) */}
          <div className="hidden md:flex items-center gap-2 ps-3 border-s border-gray-200">
            <div className="text-end">
              <p className="text-sm font-medium text-gray-900">
                {session?.user?.name ?? "المدير"}
              </p>
              <p className="text-xs text-gray-500">
                {session?.user?.role === "ADMIN" ? "مدير عام" : session?.user?.role ?? "مدير"}
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              {session?.user?.name?.[0] ?? "م"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
