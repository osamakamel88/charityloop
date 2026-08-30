"use client";

import { useState } from "react";
import { Plus, Search, Filter, FileDown, MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
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
import { DONATION_TYPE_LABELS, DONATION_CHANNEL_LABELS } from "@/lib/constants";
import { useCurrency } from "@/lib/currency-context";
import { formatDate } from "@/lib/utils";

const DEMO_DONATIONS = [
  { id: "1", donorName: "أحمد عبدالله", amount: 5000, type: "ZAKAT", channel: "BANK", date: "2024-03-15" },
  { id: "2", donorName: "فاطمة سالم", amount: 1200, type: "SADAQAH", channel: "APP", date: "2024-03-14" },
  { id: "3", donorName: "محمد علي", amount: 300, type: "KAFFARAH", channel: "WEBSITE", date: "2024-03-12" },
  { id: "4", donorName: "فاعل خير", amount: 15000, type: "ZAKAT", channel: "DIRECT", date: "2024-03-10" },
  { id: "5", donorName: "عمر خالد", amount: 500, type: "SADAQAH", channel: "BOX", date: "2024-03-08" },
  { id: "6", donorName: "سارة محمد", amount: 2000, type: "CASH", channel: "DIRECT", date: "2024-03-05" },
  { id: "7", donorName: "شركة الأمل", amount: 25000, type: "OTHER", channel: "BANK", date: "2024-03-01" },
  { id: "8", donorName: "عبدالرحمن سعيد", amount: 750, type: "SADAQAH", channel: "APP", date: "2024-02-28" },
  { id: "9", donorName: "نورة القحطاني", amount: 3000, type: "ZAKAT", channel: "WEBSITE", date: "2024-02-25" },
  { id: "10", donorName: "فاعل خير", amount: 100, type: "SADAQAH", channel: "BOX", date: "2024-02-20" },
];

export default function DonationsPage() {
  const { formatAmount: formatCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    toast.success("تم إضافة التبرع بنجاح");
  };

  const filteredDonations = DEMO_DONATIONS.filter((donation) =>
    donation.donorName.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">التبرعات</h2>
          <p className="text-muted-foreground mt-1">إدارة تبرعات الجمعية ومتابعتها</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="me-2 h-4 w-4" />
              إضافة تبرع
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>إضافة تبرع جديد</DialogTitle>
              <DialogDescription>
                قم بإدخال بيانات التبرع الجديد. الحقول المميزة بنجمة (*) مطلوبة.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="donorName">اسم المتبرع *</Label>
                  <Input id="donorName" placeholder="اسم المتبرع أو فاعل خير" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donorPhone">رقم الجوال</Label>
                  <Input id="donorPhone" placeholder="05XXXXXXXX" dir="ltr" className="text-end" />
                </div>
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
                  <Label htmlFor="type">نوع التبرع *</Label>
                  <Select required defaultValue="SADAQAH">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DONATION_TYPE_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel">قناة التبرع *</Label>
                  <Select required defaultValue="APP">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القناة" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(DONATION_CHANNEL_LABELS).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">ملاحظات</Label>
                <Textarea id="description" placeholder="أي تفاصيل إضافية حول التبرع..." />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>إلغاء</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">حفظ التبرع</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التبرعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{formatCurrency(52850)}</div>
            <p className="text-xs text-muted-foreground mt-1">+20% عن الشهر الماضي</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تبرعات هذا الشهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(12400)}</div>
            <p className="text-xs text-muted-foreground mt-1">15 عملية تبرع</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">عدد المتبرعين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground mt-1">8 متبرعين جدد هذا الشهر</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">متوسط التبرع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(372)}</div>
            <p className="text-xs text-muted-foreground mt-1">لكل عملية تبرع</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن متبرع..."
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
                  <TableHead className="text-right">المتبرع</TableHead>
                  <TableHead className="text-right">المبلغ</TableHead>
                  <TableHead className="text-right">النوع</TableHead>
                  <TableHead className="text-right">القناة</TableHead>
                  <TableHead className="text-right">التاريخ</TableHead>
                  <TableHead className="text-left">إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      لا توجد تبرعات مطابقة للبحث
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="font-medium">{donation.donorName}</TableCell>
                      <TableCell className="font-semibold text-emerald-600">{formatCurrency(donation.amount)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100">
                          {DONATION_TYPE_LABELS[donation.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{DONATION_CHANNEL_LABELS[donation.channel]}</Badge>
                      </TableCell>
                      <TableCell>{formatDate(donation.date)}</TableCell>
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
