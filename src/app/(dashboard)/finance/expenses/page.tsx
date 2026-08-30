"use client";

import { useState } from "react";
import { Plus, Search, Filter, FileDown, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { EXPENSE_TYPE_LABELS } from "@/lib/constants";
import { useCurrency } from "@/lib/currency-context";
import { formatDate } from "@/lib/utils";

const DEMO_EXPENSES = [
  { id: "1", description: "دعم مالي لأسرة الأرملة فاطمة", amount: 1500, type: "FINANCIAL_AID", beneficiary: "فاطمة أحمد", date: "2024-03-16" },
  { id: "2", description: "إيجار مقر الجمعية - مارس", amount: 3500, type: "RENT", beneficiary: "-", date: "2024-03-15" },
  { id: "3", description: "تكلفة عملية جراحية لليتيم خالد", amount: 8000, type: "MEDICAL", beneficiary: "خالد سعيد", date: "2024-03-12" },
  { id: "4", description: "شراء سلال غذائية لرمضان", amount: 12000, type: "PROJECT", beneficiary: "-", date: "2024-03-10" },
  { id: "5", description: "رواتب الموظفين - فبراير", amount: 25000, type: "SALARY", beneficiary: "-", date: "2024-02-28" },
  { id: "6", description: "فاتورة الكهرباء والماء", amount: 450, type: "UTILITIES", beneficiary: "-", date: "2024-02-25" },
  { id: "7", description: "أدوات مكتبية وقرطاسية", amount: 320, type: "ADMIN", beneficiary: "-", date: "2024-02-20" },
  { id: "8", description: "مساعدة زواج للشاب محمد", amount: 5000, type: "FINANCIAL_AID", beneficiary: "محمد عبدالله", date: "2024-02-18" },
  { id: "9", description: "إيجار شقة عائلة الأيتام", amount: 1200, type: "RENT", beneficiary: "عائلة اليتيم علي", date: "2024-02-15" },
  { id: "10", description: "صيانة سيارة التوزيع", amount: 850, type: "OTHER", beneficiary: "-", date: "2024-02-10" },
];

export default function ExpensesPage() {
  const { formatAmount: formatCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast.success("تم إضافة المصروف بنجاح");
  };

  const filteredExpenses = DEMO_EXPENSES.filter((expense) =>
    expense.description.includes(searchTerm) || expense.beneficiary.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">المصروفات</h2>
          <p className="text-muted-foreground mt-1">إدارة مصروفات ومدفوعات الجمعية</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="me-2 h-4 w-4" />
              إضافة مصروف
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة مصروف جديد</DialogTitle>
              <DialogDescription>
                قم بإدخال بيانات المصروف الجديد.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="description">الوصف *</Label>
                <Input id="description" placeholder="وصف المصروف" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">المبلغ *</Label>
                  <Input id="amount" type="number" min="1" placeholder="0" required dir="ltr" className="text-end" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">التاريخ *</Label>
                  <Input id="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">نوع المصروف *</Label>
                  <Select required defaultValue="FINANCIAL_AID">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(EXPENSE_TYPE_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="beneficiary">المستفيد (اختياري)</Label>
                  <Input id="beneficiary" placeholder="اسم المستفيد إن وجد" />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>إلغاء</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">حفظ المصروف</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(57820)}</div>
            <p className="text-xs text-muted-foreground mt-1">منذ بداية العام</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مصروفات هذا الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(25000)}</div>
            <p className="text-xs text-muted-foreground mt-1">4 عمليات صرف</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مساعدات مالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(6500)}</div>
            <p className="text-xs text-muted-foreground mt-1">لهذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مصروفات إدارية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(3500)}</div>
            <p className="text-xs text-muted-foreground mt-1">لهذا الشهر</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث في المصروفات..."
                className="pe-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <Filter className="me-2 h-4 w-4" />
                تصفية
              </Button>
              <Button variant="outline" className="flex-1 sm:flex-none">
                <FileDown className="me-2 h-4 w-4" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">الوصف</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">المستفيد</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      لا توجد مصروفات مطابقة للبحث
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell className="font-semibold text-red-600">{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-orange-50 text-orange-700 hover:bg-orange-100">
                          {EXPENSE_TYPE_LABELS[expense.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>{expense.beneficiary}</TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell className="text-left">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-emerald-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
