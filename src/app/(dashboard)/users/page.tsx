"use client";

import { useState } from "react";
import {
  UserCog,
  Plus,
  Search,
  Pencil,
  Trash2,
  Shield,
  Mail,
  Phone,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { USER_ROLE_LABELS } from "@/lib/constants";

const demoUsers = [
  { id: "1", name: "أحمد محمد العلي", email: "admin@charityloop.com", phone: "0501234567", role: "ADMIN", isActive: true, createdAt: "2024-01-15" },
  { id: "2", name: "فاطمة عبدالله الحربي", email: "fatima@charityloop.com", phone: "0559876543", role: "MANAGER", isActive: true, createdAt: "2024-02-20" },
  { id: "3", name: "خالد سعد القحطاني", email: "khaled@charityloop.com", phone: "0541112233", role: "EMPLOYEE", isActive: true, createdAt: "2024-03-10" },
  { id: "4", name: "نورة إبراهيم المطيري", email: "noura@charityloop.com", phone: "0567778899", role: "EMPLOYEE", isActive: true, createdAt: "2024-04-05" },
  { id: "5", name: "عمر يوسف الشمري", email: "omar@charityloop.com", phone: "0533445566", role: "AUDITOR", isActive: true, createdAt: "2024-05-12" },
  { id: "6", name: "سارة ناصر الدوسري", email: "sara@charityloop.com", phone: "0522334455", role: "VOLUNTEER", isActive: false, createdAt: "2024-06-01" },
];

const getRoleBadge = (role: string) => {
  const colors: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-800",
    MANAGER: "bg-blue-100 text-blue-800",
    EMPLOYEE: "bg-emerald-100 text-emerald-800",
    AUDITOR: "bg-amber-100 text-amber-800",
    VOLUNTEER: "bg-gray-100 text-gray-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[role] || "bg-gray-100 text-gray-800"}`}>
      {USER_ROLE_LABELS[role] || role}
    </span>
  );
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", role: "EMPLOYEE", password: "" });

  const filteredUsers = demoUsers.filter(
    (u) =>
      u.name.includes(search) ||
      u.email.includes(search) ||
      u.phone.includes(search)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <UserCog className="w-7 h-7 text-emerald-600" />
            إدارة المستخدمين
          </h1>
          <p className="text-gray-500 mt-1">إدارة مستخدمي النظام وصلاحياتهم</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          إضافة مستخدم
        </button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إضافة مستخدم جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="أدخل الاسم الكامل"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="example@charityloop.com"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                >
                  {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  حفظ المستخدم
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">إجمالي المستخدمين</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{demoUsers.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">المستخدمين النشطين</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{demoUsers.filter(u => u.isActive).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">المدراء</p>
            <p className="text-2xl font-bold text-purple-600 mt-1">{demoUsers.filter(u => u.role === "ADMIN" || u.role === "MANAGER").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">المتطوعين</p>
            <p className="text-2xl font-bold text-orange-600 mt-1">{demoUsers.filter(u => u.role === "VOLUNTEER").length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="بحث بالاسم أو البريد أو الجوال..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full ps-10 pe-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">المستخدم</th>
                  <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">البريد الإلكتروني</th>
                  <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الجوال</th>
                  <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الدور</th>
                  <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الحالة</th>
                  <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0">
                          {user.name[0]}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 flex items-center gap-1.5" dir="ltr">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {user.email}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600 flex items-center gap-1.5" dir="ltr">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        {user.phone}
                      </span>
                    </td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {user.isActive ? "نشط" : "معطل"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="تعديل">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Roles Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            الأدوار والصلاحيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                {getRoleBadge("ADMIN")}
              </div>
              <p className="text-xs text-gray-500">صلاحيات كاملة — إدارة جميع الوحدات والمستخدمين والإعدادات</p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                {getRoleBadge("MANAGER")}
              </div>
              <p className="text-xs text-gray-500">إدارة الوحدة — إضافة وتعديل وحذف البيانات في الوحدة المسؤول عنها</p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                {getRoleBadge("EMPLOYEE")}
              </div>
              <p className="text-xs text-gray-500">موظف — إضافة وتعديل البيانات بدون حذف</p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                {getRoleBadge("AUDITOR")}
              </div>
              <p className="text-xs text-gray-500">مدقق — عرض جميع البيانات والتقارير بدون تعديل</p>
            </div>
            <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                {getRoleBadge("VOLUNTEER")}
              </div>
              <p className="text-xs text-gray-500">متطوع — عرض المهام المسندة وتسجيل ساعات التطوع</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
