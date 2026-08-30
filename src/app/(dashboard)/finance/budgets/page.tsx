"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

import { useCurrency } from "@/lib/currency-context";

const formatPercentage = (percent: number) => {
  return new Intl.NumberFormat("ar-EG", { style: "percent", maximumFractionDigits: 1 }).format(percent / 100);
};

const DEMO_BUDGETS = [
  { id: "1", name: "ميزانية رمضان 2024", category: "مشاريع موسمية", period: "الربع الأول", totalAmount: 150000, spentAmount: 142000 },
  { id: "2", name: "ميزانية المساعدات الشهرية", category: "مساعدات مالية", period: "مارس 2024", totalAmount: 50000, spentAmount: 32000 },
  { id: "3", name: "ميزانية الإيجارات", category: "مصروفات إدارية", period: "عام 2024", totalAmount: 120000, spentAmount: 30000 },
  { id: "4", name: "كفالة الأيتام", category: "كفالات", period: "الربع الأول", totalAmount: 80000, spentAmount: 75000 },
  { id: "5", name: "الرواتب والأجور", category: "مصروفات إدارية", period: "مارس 2024", totalAmount: 35000, spentAmount: 35000 },
  { id: "6", name: "ميزانية التدريب والتطوير", category: "مشاريع", period: "عام 2024", totalAmount: 40000, spentAmount: 5000 },
];

export default function BudgetsPage() {
  const { formatAmount: formatCurrency } = useCurrency();
  const totalBudget = DEMO_BUDGETS.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalSpent = DEMO_BUDGETS.reduce((sum, b) => sum + b.spentAmount, 0);
  const totalRemaining = totalBudget - totalSpent;
  const totalPercentage = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">الميزانيات</h2>
          <p className="text-muted-foreground mt-1">متابعة الميزانيات المعتمدة ونسب الصرف</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="me-2 h-4 w-4" />
          إضافة ميزانية
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-4 bg-emerald-50 border-emerald-100">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-4 items-center">
              <div>
                <p className="text-sm font-medium text-emerald-800 mb-1">إجمالي الميزانيات المعتمدة</p>
                <div className="text-3xl font-bold text-emerald-900">{formatCurrency(totalBudget)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">إجمالي المصروفات</p>
                <div className="text-2xl font-bold text-red-900">{formatCurrency(totalSpent)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">المتبقي</p>
                <div className="text-2xl font-bold text-blue-900">{formatCurrency(totalRemaining)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-800 mb-2">نسبة الصرف الكلية</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-emerald-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-600 rounded-full" 
                      style={{ width: `${Math.min(totalPercentage, 100)}%` }}
                    />
                  </div>
                  <span className="font-bold text-emerald-900">{formatPercentage(totalPercentage)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-4">تفاصيل الميزانيات</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_BUDGETS.map((budget) => {
          const percentage = (budget.spentAmount / budget.totalAmount) * 100;
          let barColor = "bg-emerald-500";
          
          if (percentage >= 85) barColor = "bg-red-500";
          else if (percentage >= 60) barColor = "bg-yellow-500";

          return (
            <Card key={budget.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{budget.name}</CardTitle>
                    <CardDescription className="mt-1">{budget.category} • {budget.period}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">نسبة الصرف</span>
                  <span className="font-bold">{formatPercentage(percentage)}</span>
                </div>
                <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${barColor} rounded-full transition-all`} 
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 flex justify-between border-t text-sm">
                <div>
                  <span className="text-muted-foreground block text-xs">المعتمد</span>
                  <span className="font-semibold">{formatCurrency(budget.totalAmount)}</span>
                </div>
                <div className="text-end">
                  <span className="text-muted-foreground block text-xs">المصروف</span>
                  <span className="font-semibold text-red-600">{formatCurrency(budget.spentAmount)}</span>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
