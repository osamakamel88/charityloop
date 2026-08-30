'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Filter,
  Users,
  CalendarDays,
  CheckCircle,
  Clock,
  FileCheck,
  ArrowRightLeft,
  XCircle,
} from 'lucide-react';

const MOCK_DATA = [
  { id: '1', firstName: 'أحمد', lastName: 'محمد السيد', nationalId: '28910150102456', category: 'POOR_FAMILY', status: 'APPROVED', familyMembers: 5, docsCount: 4, createdAt: '2023-10-01' },
  { id: '2', firstName: 'فاطمة', lastName: 'علي إبراهيم', nationalId: '29304120109876', category: 'ORPHAN', status: 'UNDER_REVIEW', familyMembers: 3, docsCount: 3, createdAt: '2023-10-05' },
  { id: '3', firstName: 'محمود', lastName: 'حسن النجار', nationalId: '27806190103421', category: 'POOR_FAMILY', status: 'NEW', familyMembers: 6, docsCount: 2, createdAt: '2023-10-10' },
  { id: '4', firstName: 'زينب', lastName: 'عمر عبدالرحمن', nationalId: '28509040108765', category: 'WIDOW', status: 'APPROVED', familyMembers: 4, docsCount: 5, createdAt: '2023-10-12' },
  { id: '5', firstName: 'عبدالله', lastName: 'سالم الشريف', nationalId: '29011220104567', category: 'PATIENT', status: 'UNDER_REVIEW', familyMembers: 2, docsCount: 4, createdAt: '2023-10-15' },
  { id: '6', firstName: 'نورة', lastName: 'عبدالرحمن الدسوقي', nationalId: '28203150107654', category: 'POOR_FAMILY', status: 'COMPLETED', familyMembers: 5, docsCount: 3, createdAt: '2023-10-18' },
  { id: '7', firstName: 'سعيد', lastName: 'خالد الصاوي', nationalId: '29508200109988', category: 'ELDERLY', status: 'APPROVED', familyMembers: 2, docsCount: 3, createdAt: '2023-10-20' },
  { id: '8', firstName: 'ليلى', lastName: 'يوسف القاضي', nationalId: '28812300101122', category: 'STUDENT', status: 'NEW', familyMembers: 4, docsCount: 2, createdAt: '2023-10-22' },
  { id: '9', firstName: 'عمر', lastName: 'إبراهيم غنيم', nationalId: '27501010103344', category: 'PATIENT', status: 'REJECTED', familyMembers: 3, docsCount: 1, createdAt: '2023-10-25' },
  { id: '10', firstName: 'مريم', lastName: 'صالح البدري', nationalId: '29107140105566', category: 'WIDOW', status: 'APPROVED', familyMembers: 3, docsCount: 4, createdAt: '2023-10-28' },
];

const STATUS_LABELS: Record<string, string> = {
  NEW: 'جديد (طلب وارد)',
  UNDER_REVIEW: 'قيد الدراسة والبحث',
  APPROVED: 'موافق عليه ومستحق',
  REJECTED: 'مرفوض',
  COMPLETED: 'منتهي الصرف',
};

const CATEGORY_LABELS: Record<string, string> = {
  POOR_FAMILY: 'أسر فقيرة',
  ORPHAN: 'أيتام',
  WIDOW: 'أرامل',
  PATIENT: 'مرضى',
  ELDERLY: 'كبار سن',
  STUDENT: 'طلاب علم',
};

export default function BeneficiariesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border border-blue-200">جديد (وارد)</Badge>;
      case 'UNDER_REVIEW':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border border-amber-200">قيد الدراسة والبحث</Badge>;
      case 'APPROVED':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border border-emerald-300">موافق عليه ✓</Badge>;
      case 'REJECTED':
        return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 border border-rose-200">مرفوض ✗</Badge>;
      case 'COMPLETED':
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border border-gray-300">منتهي</Badge>;
      default:
        return <Badge variant="outline">{STATUS_LABELS[status] || status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    return <Badge variant="outline" className="font-normal text-xs">{CATEGORY_LABELS[category] || category}</Badge>;
  };

  const filteredData = MOCK_DATA.filter((item) => {
    const matchesSearch =
      item.firstName.includes(searchTerm) ||
      item.lastName.includes(searchTerm) ||
      item.nationalId.includes(searchTerm);
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalCount = MOCK_DATA.length;
  const newCount = MOCK_DATA.filter((m) => m.status === 'NEW').length;
  const underReviewCount = MOCK_DATA.filter((m) => m.status === 'UNDER_REVIEW').length;
  const approvedCount = MOCK_DATA.filter((m) => m.status === 'APPROVED').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            وحدة إدارة المستفيدين (الحالات والمحتاجين)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            تسجيل الحالات، متابعة مسار دراسة الطلبات، فحص المستندات المرفقة، واعتماد المساعدات
          </p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1.5 text-xs">
          <Link href="/beneficiaries/new">
            <Plus className="h-4 w-4" />
            تسجيل مستفيد وطلب جديد
          </Link>
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">إجمالي الحالات المسجلة</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">1,247 حالة</p>
              <span className="text-[11px] text-gray-400">تشمل جميع الفئات</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">طلبات واردة جديدة</p>
              <p className="text-xl font-bold text-amber-700 mt-0.5">{newCount} طلبات</p>
              <span className="text-[11px] text-amber-600 font-medium">بانتظار الفرز والبحث</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">قيد الدراسة الميدانية</p>
              <p className="text-xl font-bold text-purple-700 mt-0.5">{underReviewCount} حالات</p>
              <span className="text-[11px] text-purple-600 font-medium">زيارات وتقييم تقارير</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">الحالات المعتمدة (موافق عليها)</p>
              <p className="text-xl font-bold text-emerald-700 mt-0.5">{approvedCount} حالة</p>
              <span className="text-[11px] text-emerald-600 font-medium">مستحقة وجاهزة للصرف</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">قائمة المستفيدين والطلبات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="بحث باسم المستفيد أو الرقم القومي / الهوية..."
                className="ps-9 bg-white text-xs rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[190px] bg-white text-xs rounded-xl">
                  <Filter className="me-1.5 h-3.5 w-3.5 text-gray-400" />
                  <SelectValue placeholder="حالة الطلب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">جميع الحالات (الكل)</SelectItem>
                  {Object.entries(STATUS_LABELS).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[170px] bg-white text-xs rounded-xl">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">جميع التصنيفات</SelectItem>
                  {Object.entries(CATEGORY_LABELS).map(([key, value]) => (
                    <SelectItem key={key} value={key}>{value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="table-responsive border rounded-xl overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/70">
                <TableRow>
                  <TableHead className="text-right text-xs font-bold">اسم المستفيد</TableHead>
                  <TableHead className="text-right text-xs font-bold">الرقم القومي / الهوية</TableHead>
                  <TableHead className="text-right text-xs font-bold">التصنيف</TableHead>
                  <TableHead className="text-right text-xs font-bold">حالة الطلب</TableHead>
                  <TableHead className="text-right text-xs font-bold">المستندات المرفقة</TableHead>
                  <TableHead className="text-right text-xs font-bold">أفراد الأسرة</TableHead>
                  <TableHead className="text-right text-xs font-bold">تاريخ الطلب</TableHead>
                  <TableHead className="text-center text-xs font-bold">إجراءات ومتابعة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((beneficiary) => (
                    <TableRow key={beneficiary.id} className="hover:bg-gray-50/50">
                      <TableCell className="font-bold text-xs text-gray-900">
                        <Link href={`/beneficiaries/${beneficiary.id}`} className="hover:text-emerald-700 transition-colors">
                          {beneficiary.firstName} {beneficiary.lastName}
                        </Link>
                      </TableCell>
                      <TableCell className="text-xs font-mono" dir="ltr">{beneficiary.nationalId}</TableCell>
                      <TableCell>{getCategoryBadge(beneficiary.category)}</TableCell>
                      <TableCell>{getStatusBadge(beneficiary.status)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                          {beneficiary.docsCount} مستندات
                        </span>
                      </TableCell>
                      <TableCell className="text-xs">{beneficiary.familyMembers} أفراد</TableCell>
                      <TableCell className="text-xs text-gray-500">{beneficiary.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="sm" asChild className="h-8 px-2.5 text-xs text-emerald-700 hover:bg-emerald-50 rounded-lg">
                            <Link href={`/beneficiaries/${beneficiary.id}`}>
                              <Eye className="h-3.5 w-3.5 me-1" />
                              عرض ومتابعة
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-xs text-gray-400">
                      لا توجد حالات مطابقة لمعايير البحث
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
