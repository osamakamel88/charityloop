"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CircleDollarSign, FolderKanban, HandHeart } from "lucide-react";
import { MonthlyChart } from "./_components/monthly-chart";
import { useCurrency } from "@/lib/currency-context";
import { formatNumber } from "@/lib/utils";

const beneficiaries = [
  { type: "أيتام", count: 312, percent: 25, color: "bg-emerald-500" },
  { type: "أرامل", count: 248, percent: 20, color: "bg-blue-500" },
  { type: "مرضى", count: 187, percent: 15, color: "bg-amber-500" },
  { type: "كبار سن", count: 162, percent: 13, color: "bg-purple-500" },
  { type: "أسر فقيرة", count: 213, percent: 17, color: "bg-rose-500" },
  { type: "طلاب", count: 125, percent: 10, color: "bg-teal-500" },
];

const latestBeneficiaries = [
  { id: 1, name: "محمد عبدالله أحمد", category: "أسر فقيرة", status: "جديد", date: "2024-03-01" },
  { id: 2, name: "فاطمة علي حسن", category: "أرامل", status: "موافق عليه", date: "2024-02-28" },
  { id: 3, name: "خالد سعيد الغامدي", category: "مرضى", status: "قيد الدراسة", date: "2024-02-25" },
  { id: 4, name: "سارة محمد العتيبي", category: "أيتام", status: "موافق عليه", date: "2024-02-20" },
  { id: 5, name: "عبدالرحمن فهد", category: "طلاب", status: "جديد", date: "2024-02-18" },
];

const latestDonations = [
  { id: 1, donor: "فاعل خير", amount: 5000, type: "زكاة", date: "2024-03-01" },
  { id: 2, donor: "شركة الأمل للتجارة", amount: 25000, type: "صدقات", date: "2024-02-28" },
  { id: 3, donor: "سعود بن فيصل", amount: 10000, type: "كفارات", date: "2024-02-27" },
  { id: 4, donor: "أحمد بن إبراهيم", amount: 1500, type: "صدقات", date: "2024-02-25" },
  { id: 5, donor: "فاعل خير", amount: 3000, type: "زكاة", date: "2024-02-24" },
];

export default function DashboardPage() {
  const { formatAmount } = useCurrency();

  const stats = [
    {
      title: "إجمالي المستفيدين",
      value: "1,247",
      change: "+12% هذا الشهر",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "إجمالي التبرعات",
      value: formatAmount(534200),
      change: "+8% هذا الشهر",
      icon: CircleDollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
    {
      title: "المشاريع النشطة",
      value: "12",
      change: "+3 مشاريع جديدة",
      icon: FolderKanban,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "المتطوعين النشطين",
      value: "89",
      change: "+5 متطوعين",
      icon: HandHeart,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">لوحة التحكم</h1>
        <p className="text-muted-foreground mt-1">مرحباً بك في نظام إدارة الجمعية الخيرية</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200">
                    {stat.change}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                  <p className="text-2xl font-bold mt-1 text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Categories Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>التبرعات والمصروفات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع المستفيدين حسب التصنيف</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {beneficiaries.map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.type}</span>
                    <span className="text-muted-foreground">
                      {formatNumber(item.count)} ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>آخر المستفيدين المضافين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="text-muted-foreground border-b border-border">
                  <tr>
                    <th className="pb-3 font-medium">الاسم</th>
                    <th className="pb-3 font-medium">التصنيف</th>
                    <th className="pb-3 font-medium">الحالة</th>
                    <th className="pb-3 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {latestBeneficiaries.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="py-3">{item.category}</td>
                      <td className="py-3">
                        <Badge
                          variant={
                            item.status === "موافق عليه"
                              ? "default"
                              : item.status === "جديد"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آخر التبرعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-right">
                <thead className="text-muted-foreground border-b border-border">
                  <tr>
                    <th className="pb-3 font-medium">المتبرع</th>
                    <th className="pb-3 font-medium">المبلغ</th>
                    <th className="pb-3 font-medium">النوع</th>
                    <th className="pb-3 font-medium">التاريخ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {latestDonations.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-medium">{item.donor}</td>
                      <td className="py-3 text-emerald-600 font-bold">
                        {formatAmount(item.amount)}
                      </td>
                      <td className="py-3">{item.type}</td>
                      <td className="py-3 text-muted-foreground">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
