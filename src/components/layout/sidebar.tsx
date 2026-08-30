"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Heart,
  LayoutDashboard,
  Users,
  HandHeart,
  Wallet,
  FolderKanban,
  Warehouse,
  BarChart3,
  UserCog,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  CircleDollarSign,
  Receipt,
  PiggyBank,
} from "lucide-react";

const navigation = [
  {
    title: "الرئيسية",
    items: [
      { name: "لوحة التحكم", href: "/", icon: LayoutDashboard },
    ],
  },
  {
    title: "إدارة الحالات",
    items: [
      { name: "المستفيدين", href: "/beneficiaries", icon: Users },
      { name: "المتطوعين", href: "/volunteers", icon: HandHeart },
    ],
  },
  {
    title: "الشؤون المالية",
    items: [
      { name: "التبرعات", href: "/finance/donations", icon: CircleDollarSign },
      { name: "المصروفات", href: "/finance/expenses", icon: Receipt },
      { name: "الميزانيات", href: "/finance/budgets", icon: PiggyBank },
    ],
  },
  {
    title: "المشاريع والمخازن",
    items: [
      { name: "المشاريع", href: "/projects", icon: FolderKanban },
      { name: "المخازن", href: "/inventory", icon: Warehouse },
    ],
  },
  {
    title: "النظام",
    items: [
      { name: "التقارير", href: "/reports", icon: BarChart3 },
      { name: "المستخدمين", href: "/users", icon: UserCog },
      { name: "الإشعارات", href: "/notifications", icon: Bell },
      { name: "الإعدادات", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-emerald-700/30">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 text-white shrink-0">
          <Heart className="w-6 h-6" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-white truncate">CharityLoop</h1>
            <p className="text-xs text-emerald-200 truncate">إدارة الجمعيات الخيرية</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navigation.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="text-xs font-medium text-emerald-300/70 uppercase tracking-wider px-3 mb-2">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-emerald-100/80 hover:bg-white/10 hover:text-white"
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-emerald-700/30 p-4">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {session?.user?.name?.[0] ?? "م"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name ?? "المدير"}
              </p>
              <p className="text-xs text-emerald-200 truncate">
                {session?.user?.email ?? "admin@charityloop.com"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-emerald-200 hover:text-white transition-colors"
              title="تسجيل الخروج"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center text-emerald-200 hover:text-white transition-colors py-2"
            title="تسجيل الخروج"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 start-4 z-50 p-2 bg-emerald-600 text-white rounded-xl shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed inset-y-0 start-0 z-50 w-72 bg-gradient-to-b from-emerald-800 to-emerald-900 transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 end-4 text-white/80 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-gradient-to-b from-emerald-800 to-emerald-900 transition-all duration-300 shrink-0 ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        {sidebarContent}
        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center py-3 text-emerald-200 hover:text-white transition-colors border-t border-emerald-700/30"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </aside>
    </>
  );
}
