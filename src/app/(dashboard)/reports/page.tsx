"use client";

import { useState } from "react";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
  Calendar,
  Filter,
  PieChart as PieIcon,
  TrendingUp,
  DollarSign,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { formatNumber } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const donationVsExpenseData = [
  { month: "يناير", donations: 120000, expenses: 85000, projects: 70000 },
  { month: "فبراير", donations: 145000, expenses: 95000, projects: 80000 },
  { month: "مارس", donations: 230000, expenses: 180000, projects: 160000 },
  { month: "أبريل", donations: 190000, expenses: 140000, projects: 125000 },
  { month: "مايو", donations: 160000, expenses: 110000, projects: 95000 },
  { month: "يونيو", donations: 210000, expenses: 155000, projects: 135000 },
];

const categoryDistribution = [
  { name: "أيتام", value: 312, color: "#10b981" },
  { name: "أرامل", value: 248, color: "#3b82f6" },
  { name: "مرضى", value: 187, color: "#f59e0b" },
  { name: "أسر فقيرة", value: 213, color: "#8b5cf6" },
  { name: "كبار سن", value: 162, color: "#ec4899" },
  { name: "طلاب علم", value: 125, color: "#06b6d4" },
];

const districtDistribution = [
  { district: "حي الملز", count: 245, amount: 145000 },
  { district: "حي الشفا", count: 310, amount: 185000 },
  { district: "حي النسيم", count: 290, amount: 160000 },
  { district: "حي اليرموك", count: 180, amount: 98000 },
  { district: "حي العزيزية", count: 222, amount: 132000 },
];

export default function ReportsPage() {
  const { formatAmount: formatCurrency, currency } = useCurrency();
  const [reportPeriod, setReportPeriod] = useState("YEAR");
  const [activeTab, setActiveTab] = useState("financial");

  const handleExport = (format: string, reportName: string) => {
    toast.success(`جارٍ تجهيز وتحميل ${reportName} بصيغة ${format}...`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-emerald-600" />
            التقارير والإحصائيات الشاملة
          </h1>
          <p className="text-gray-500 mt-1">
            استخراج التقارير المالية والتشغيلية، مؤشرات الأداء، والتصدير بصيغ (Excel - PDF - Word)
          </p>
        </div>

        {/* Global Export Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => handleExport("Excel", "التقرير الشامل")}
            className="rounded-xl gap-2 text-emerald-700 border-emerald-300 hover:bg-emerald-50 text-xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            تصدير Excel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleExport("PDF", "التقرير الشامل")}
            className="rounded-xl gap-2 text-rose-700 border-rose-300 hover:bg-rose-50 text-xs"
          >
            <FileText className="w-4 h-4 text-rose-600" />
            تصدير PDF
          </Button>
          <Button
            variant="outline"
            onClick={() => window.print()}
            className="rounded-xl gap-2 text-gray-700 border-gray-300 hover:bg-gray-50 text-xs no-print"
          >
            <Printer className="w-4 h-4" />
            طباعة
          </Button>
        </div>
      </div>

      {/* KPI Top Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-gray-500">كفاءة الإنفاق الخيري</span>
            <p className="text-2xl font-bold text-emerald-600 mt-1">88.4%</p>
            <span className="text-[11px] text-gray-500">
              88.4% للمشاريع والمساعدات مقابل 11.6% مصاريف تشغيلية
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-gray-500">إجمالي التبرعات السنوية</span>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {formatCurrency(1055000)}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">+14% عن العام السابق</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-gray-500">إجمالي المساعدات المصروفة</span>
            <p className="text-2xl font-bold text-rose-600 mt-1">
              {formatCurrency(775000)}
            </p>
            <span className="text-[11px] text-gray-500">تغطي 1,247 أسرة مستفيدة</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-gray-500">العائد التطوعي التقديري</span>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              {formatCurrency(54000)}
            </p>
            <span className="text-[11px] text-blue-600 font-medium">وفق معيار الساعات التطوعية</span>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Different Report Categories */}
      <Tabs defaultValue="financial" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="financial" className="rounded-lg data-[state=active]:bg-white">
            التقارير المالية والمحاسبية
          </TabsTrigger>
          <TabsTrigger value="beneficiaries" className="rounded-lg data-[state=active]:bg-white">
            إحصائيات وتوزيع المستفيدين
          </TabsTrigger>
          <TabsTrigger value="volunteers" className="rounded-lg data-[state=active]:bg-white">
            أداء التطوع والميدان
          </TabsTrigger>
        </TabsList>

        {/* Financial Tab */}
        <TabsContent value="financial" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Card */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-base font-bold text-gray-900">
                    مقارنة الإيرادات والمصروفات والإنفاق على المشاريع
                  </CardTitle>
                  <CardDescription className="text-xs">
                    بيانات النصف الأول من السنة المالية الحالية
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  نصف سنوي
                </Badge>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-72 w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={donationVsExpenseData}>
                      <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
                      <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                      <Tooltip
                        formatter={(val: any) => formatCurrency(Number(val) || 0)}
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          direction: "rtl",
                        }}
                      />
                      <Legend
                        formatter={(val) => {
                          if (val === "donations") return "التبرعات الواردة";
                          if (val === "expenses") return "إجمالي المصروفات";
                          if (val === "projects") return "مصروفات المشاريع";
                          return val;
                        }}
                      />
                      <Bar dataKey="donations" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="projects" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Financial Ratio Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-gray-900">
                  توزيع المصروفات حسب المعايير المحاسبية
                </CardTitle>
                <CardDescription className="text-xs">
                  الالتزام بمعايير هيئة الأوقاف والجهات الإشرافية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-emerald-700">برامج ومساعدات المستفيدين</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[72%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-purple-700">مشاريع موسمية وتنموية</span>
                    <span>16.4%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[16.4%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-amber-700">مصاريف إدارية وتشغيلية</span>
                    <span>8.2%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full w-[8.2%]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-blue-700">تسويق وتنمية الموارد</span>
                    <span>3.4%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[3.4%]" />
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-800 flex items-center gap-2 mt-4">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>النسبة التشغيلية ممتازة ومتوافقة مع المعايير الحكومية (أقل من 20%).</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Beneficiaries Tab */}
        <TabsContent value="beneficiaries" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Classification Pie */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-gray-900">
                  توزيع الحالات حسب الفئات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => `${val} حالة`}
                        contentStyle={{
                          backgroundColor: "#fff",
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          direction: "rtl",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {categoryDistribution.map((c) => (
                    <div key={c.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span>{c.name}: {c.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Geographical Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold text-gray-900">
                  التوزيع الجغرافي للمساعدات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="table-responsive">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50/50">
                        <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الحي / المنطقة</th>
                        <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">عدد المستفيدين</th>
                        <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">المبالغ المصروفة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {districtDistribution.map((d) => (
                        <tr key={d.district} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{d.district}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{d.count} أسرة</td>
                          <td className="px-4 py-3 text-sm font-bold text-emerald-700">{formatCurrency(d.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Volunteers Tab */}
        <TabsContent value="volunteers" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold text-gray-900">
                ملخص أداء الفرق التطوعية والميدانية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-gray-500">إجمالي الزيارات الميدانية المنفذة</span>
                  <p className="text-2xl font-bold text-gray-900">342 زيارة بحث</p>
                  <span className="text-xs text-emerald-600">اعتماد 89% من الحالات</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-gray-500">ساعات العمل الميداني</span>
                  <p className="text-2xl font-bold text-emerald-700">602 ساعة</p>
                  <span className="text-xs text-gray-500">توزيع سلات وكسوة</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-gray-500">رضا المستفيدين عن التوزيع</span>
                  <p className="text-2xl font-bold text-purple-700">96.5%</p>
                  <span className="text-xs text-purple-600">استبيانات الجودة</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
