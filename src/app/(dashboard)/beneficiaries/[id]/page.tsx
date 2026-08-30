'use client';

import React, { useState } from 'react';
import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pencil,
  Trash2,
  User,
  Phone,
  MapPin,
  Users,
  HeartHandshake,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  FileCheck,
  UploadCloud,
  Eye,
  Download,
  Plus,
  RefreshCw,
  ArrowRightLeft,
  Check,
} from 'lucide-react';
import { useCurrency } from '@/lib/currency-context';
import { toast } from 'sonner';

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  verified: boolean;
}

interface StatusHistoryItem {
  id: string;
  fromStatus: string;
  toStatus: string;
  reason: string;
  changedBy: string;
  date: string;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; color: string; badgeVariant: string; icon: React.ComponentType<any> }
> = {
  NEW: { label: 'جديد (طلب مساعدة وارد)', color: 'text-blue-700 bg-blue-50 border-blue-200', badgeVariant: 'secondary', icon: Clock },
  UNDER_REVIEW: { label: 'قيد الدراسة والبحث الميداني', color: 'text-amber-700 bg-amber-50 border-amber-200', badgeVariant: 'secondary', icon: RefreshCw },
  APPROVED: { label: 'موافق عليه ومستحق للمساعدة', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', badgeVariant: 'default', icon: CheckCircle2 },
  REJECTED: { label: 'مرفوض (غير مستوفي الشروط)', color: 'text-rose-700 bg-rose-50 border-rose-200', badgeVariant: 'destructive', icon: XCircle },
  COMPLETED: { label: 'منتهي (تم استيفاء الدعم)', color: 'text-gray-700 bg-gray-100 border-gray-300', badgeVariant: 'outline', icon: Check },
};

export default function BeneficiaryDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { formatAmount, currency } = useCurrency();

  // Current Application Status
  const [currentStatus, setCurrentStatus] = useState<string>('APPROVED');
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatusValue, setNewStatusValue] = useState('APPROVED');
  const [statusReason, setStatusReason] = useState('');

  // Documents state
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      name: 'صورة_بطاقة_الرقم_القومي.pdf',
      type: 'صورة الهوية / البطاقة',
      size: '1.4 MB',
      date: '2023-10-01',
      verified: true,
    },
    {
      id: '2',
      name: 'تقرير_طبي_مستشفى_قصر_العيني.pdf',
      type: 'تقرير طبي وعلاج',
      size: '2.8 MB',
      date: '2023-10-02',
      verified: true,
    },
    {
      id: '3',
      name: 'فاتورة_كهرباء_وعقد_إيجار.pdf',
      type: 'فواتير مرافق / إيجار',
      size: '950 KB',
      date: '2023-10-03',
      verified: true,
    },
    {
      id: '4',
      name: 'تقرير_البحث_الاجتماعي_الميداني.pdf',
      type: 'بحث اجتماعي',
      size: '1.1 MB',
      date: '2023-10-15',
      verified: true,
    },
  ]);

  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [newDocForm, setNewDocForm] = useState({ name: '', type: 'تقرير طبي' });

  // Status Change History
  const [statusHistory, setStatusHistory] = useState<StatusHistoryItem[]>([
    {
      id: 'h1',
      fromStatus: 'NEW',
      toStatus: 'UNDER_REVIEW',
      reason: 'تم تحويل الطلب للباحث الاجتماعي لجدولة زيارة ميدانية وفحص المستندات.',
      changedBy: 'أحمد علي (مسؤول الفرز)',
      date: '2023-10-05',
    },
    {
      id: 'h2',
      fromStatus: 'UNDER_REVIEW',
      toStatus: 'APPROVED',
      reason: 'استيفاء الشروط وتأكيد عجز الدخل والحاجة الماسة للمساعدة الشهرية.',
      changedBy: 'مدير اللجنة الاجتماعية',
      date: '2023-10-16',
    },
  ]);

  // Beneficiary Info
  const beneficiary = {
    id,
    firstName: 'أحمد',
    lastName: 'محمد السيد',
    nationalId: '28910150102456',
    phone: '01098765432',
    email: 'ahmed.m@example.com',
    socialStatus: 'متزوج ورب أسرة',
    address: 'شارع الجمهورية - عمارة 14',
    city: 'القاهرة',
    district: 'حي السيدة زينب',
    familyMembers: 5,
    monthlyIncome: 2200,
    category: 'أسر فقيرة ومعدومة',
    needType: 'طلب مساعدة مالية شهرية لشراء علاج القلب للأب، وسلة غذائية دورية لـ 4 أطفال.',
    createdAt: '2023-10-01',
    nextRenewalDate: '2024-04-01',
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStatusValue === currentStatus) {
      setIsStatusDialogOpen(false);
      return;
    }

    const newHistoryEntry: StatusHistoryItem = {
      id: `h-${Date.now()}`,
      fromStatus: currentStatus,
      toStatus: newStatusValue,
      reason: statusReason.trim() || 'تحديث حالة الطلب بناءً على المراجعة الدورية.',
      changedBy: 'المدير العام (أنت)',
      date: new Date().toISOString().split('T')[0],
    };

    setStatusHistory([newHistoryEntry, ...statusHistory]);
    setCurrentStatus(newStatusValue);
    setIsStatusDialogOpen(false);
    setStatusReason('');
    toast.success(`تم تحديث حالة الطلب إلى: ${STATUS_CONFIG[newStatusValue]?.label}`);
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocForm.name.trim()) {
      toast.error('يرجى كتابة اسم المستند');
      return;
    }

    const doc: DocumentItem = {
      id: `doc-${Date.now()}`,
      name: newDocForm.name.endsWith('.pdf') ? newDocForm.name : `${newDocForm.name}.pdf`,
      type: newDocForm.type,
      size: '1.5 MB',
      date: new Date().toISOString().split('T')[0],
      verified: true,
    };

    setDocuments([doc, ...documents]);
    setIsUploadDocOpen(false);
    setNewDocForm({ name: '', type: 'تقرير طبي' });
    toast.success('تم رفع وإرفاق المستند بنجاح!');
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments(documents.filter((d) => d.id !== docId));
    toast.info('تم حذف المستند');
  };

  const StatusIcon = STATUS_CONFIG[currentStatus]?.icon || Clock;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Basic Profile */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center text-2xl font-bold shrink-0">
              {beneficiary.firstName[0]}
              {beneficiary.lastName[0]}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {beneficiary.firstName} {beneficiary.lastName}
                </h1>
                <Badge variant="outline" className="text-xs">
                  ملف #{beneficiary.id}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-gray-500">
                <span className="flex items-center gap-1 font-mono" dir="ltr">
                  <User className="h-3.5 w-3.5 text-gray-400" /> {beneficiary.nationalId}
                </span>
                <span className="flex items-center gap-1 font-mono" dir="ltr">
                  <Phone className="h-3.5 w-3.5 text-gray-400" /> {beneficiary.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" /> {beneficiary.city} - {beneficiary.district}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => {
                setNewStatusValue(currentStatus);
                setIsStatusDialogOpen(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 text-xs"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              تحديث حالة الطلب
            </Button>
            <Button variant="outline" className="rounded-xl gap-1.5 text-xs">
              <Pencil className="h-3.5 w-3.5" /> تعديل البيانات
            </Button>
          </div>
        </div>

        {/* Status Pipeline Banner */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${STATUS_CONFIG[currentStatus]?.color}`}>
              <StatusIcon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-gray-500 font-semibold block">
                حالة الطلب الحالية:
              </span>
              <span className="font-bold text-sm text-gray-900">
                {STATUS_CONFIG[currentStatus]?.label}
              </span>
            </div>
          </div>

          {/* Stepper overview */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto w-full md:w-auto py-1">
            {['NEW', 'UNDER_REVIEW', 'APPROVED', 'COMPLETED'].map((st, i) => {
              const isActive = currentStatus === st;
              const isPast =
                (currentStatus === 'APPROVED' && (st === 'NEW' || st === 'UNDER_REVIEW')) ||
                (currentStatus === 'COMPLETED' && st !== 'COMPLETED');
              return (
                <React.Fragment key={st}>
                  <div
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : isPast
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-white border text-gray-400'
                    }`}
                  >
                    {st === 'NEW' && '1. جديد'}
                    {st === 'UNDER_REVIEW' && '2. قيد الدراسة'}
                    {st === 'APPROVED' && '3. موافق عليه'}
                    {st === 'COMPLETED' && '4. منتهي'}
                  </div>
                  {i < 3 && <span className="text-gray-300">➔</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tabs Area (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-xl w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview" className="rounded-lg text-xs">معلومات عامة</TabsTrigger>
              <TabsTrigger value="documents" className="rounded-lg text-xs">
                المستندات والمرفقات ({documents.length})
              </TabsTrigger>
              <TabsTrigger value="statusHistory" className="rounded-lg text-xs">
                سجل تتبع حالة الطلب ({statusHistory.length})
              </TabsTrigger>
              <TabsTrigger value="family" className="rounded-lg text-xs">أفراد الأسرة</TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg text-xs">سجل المساعدات</TabsTrigger>
              <TabsTrigger value="visits" className="rounded-lg text-xs">الزيارات الميدانية</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-600" />
                    بيانات الاحتياج والمساعدة المطلوبة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-gray-800 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                    {beneficiary.needType}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-gray-50 p-3 rounded-xl border">
                      <span className="text-gray-500 block mb-0.5">تصنيف الحالة:</span>
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                        {beneficiary.category}
                      </Badge>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border">
                      <span className="text-gray-500 block mb-0.5">تاريخ تسجيل الطلب:</span>
                      <span className="font-bold text-gray-900">{beneficiary.createdAt}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border">
                      <span className="text-gray-500 block mb-0.5">موعد تجديد المساعدة:</span>
                      <span className="font-bold text-emerald-700">{beneficiary.nextRenewalDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    العنوان ومعلومات الاتصال
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-500 block mb-1">العنوان التفصيلي:</span>
                    <span className="font-medium text-gray-900">{beneficiary.address}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">المدينة / الحي:</span>
                    <span className="font-medium text-gray-900">{beneficiary.city} - {beneficiary.district}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">رقم الهاتف:</span>
                    <span className="font-medium text-gray-900 font-mono" dir="ltr">{beneficiary.phone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">البريد الإلكتروني:</span>
                    <span className="font-medium text-gray-900 font-mono" dir="ltr">{beneficiary.email}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab (CRITICAL REQUIREMENT) */}
            <TabsContent value="documents" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-emerald-600" />
                      المستندات المرفقة للحالة
                    </CardTitle>
                    <CardDescription className="text-xs">
                      صور الهوية، التقارير الطبية، فواتير المرافق، وبحوث الحالة
                    </CardDescription>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setIsUploadDocOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-1.5 text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    إرفاق مستند جديد
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-300 hover:shadow-xs transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-gray-900 truncate">
                                {doc.name}
                              </h4>
                              <span className="text-[11px] text-gray-500 block mt-0.5">
                                {doc.type}
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 text-[10px] shrink-0">
                            معتمد ✓
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                          <span>الحجم: {doc.size} • {doc.date}</span>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toast.success(`فتح معاينة: ${doc.name}`)}
                              className="h-7 px-2 text-xs text-gray-600 hover:text-emerald-700"
                            >
                              <Eye className="w-3.5 h-3.5 me-1" />
                              معاينة
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toast.success(`جارٍ تحميل: ${doc.name}`)}
                              className="h-7 px-2 text-xs text-gray-600 hover:text-blue-700"
                            >
                              <Download className="w-3.5 h-3.5 me-1" />
                              تحميل
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="h-7 w-7 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Status History Tab (CRITICAL REQUIREMENT) */}
            <TabsContent value="statusHistory" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    سجل متابعة وتحديثات حالة الطلب
                  </CardTitle>
                  <CardDescription className="text-xs">
                    تتبع جميع قرارات الموافقة والرفض والتحديثات الإدارية للحالة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative border-s-2 border-emerald-200 ms-3 space-y-6 py-2">
                    {statusHistory.map((item) => (
                      <div key={item.id} className="ms-6 relative">
                        <span className="absolute flex items-center justify-center w-6 h-6 bg-emerald-600 text-white rounded-full -start-9 ring-4 ring-white">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {STATUS_CONFIG[item.fromStatus]?.label?.split(' ')[0] || item.fromStatus}
                              </Badge>
                              <span className="text-xs text-gray-400">➔</span>
                              <Badge className="bg-emerald-700 text-white text-xs">
                                {STATUS_CONFIG[item.toStatus]?.label?.split(' ')[0] || item.toStatus}
                              </Badge>
                            </div>
                            <span className="text-[11px] text-gray-400">{item.date}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed font-medium">
                            {item.reason}
                          </p>
                          <span className="text-[11px] text-gray-400 block pt-1 border-t border-gray-200">
                            بواسطة: {item.changedBy}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Family Tab */}
            <TabsContent value="family" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">بيانات الأسرة والمعالين</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 text-blue-900 p-4 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                    <span className="font-bold">إجمالي أفراد الأسرة: {beneficiary.familyMembers} أفراد</span>
                    <span className="font-bold">الدخل الشهري: {formatAmount(beneficiary.monthlyIncome)}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      <p className="font-bold text-gray-900">فاطمة محمد (32 سنة)</p>
                      <span className="text-gray-500">صلة القرابة: زوجة - ربة منزل</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      <p className="font-bold text-gray-900">يوسف أحمد (8 سنوات)</p>
                      <span className="text-gray-500">صلة القرابة: ابن - طالب ابتدائي</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      <p className="font-bold text-gray-900">مريم أحمد (5 سنوات)</p>
                      <span className="text-gray-500">صلة القرابة: ابنة</span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      <p className="font-bold text-gray-900">كريم أحمد (سنتين)</p>
                      <span className="text-gray-500">صلة القرابة: رضيع</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">سجل المساعدات المصروفة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3.5 bg-gray-50 rounded-xl border flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-gray-900">مساعدة مالية شهرية (فبراير 2024)</h4>
                      <span className="text-gray-500">صرف نقدي لحساب المستفيد</span>
                    </div>
                    <span className="font-bold text-emerald-700">{formatAmount(1500)}</span>
                  </div>
                  <div className="p-3.5 bg-gray-50 rounded-xl border flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-gray-900">سلة غذائية رمضانية</h4>
                      <span className="text-gray-500">تبرع عيني من المستودع الرئيسي</span>
                    </div>
                    <span className="font-bold text-emerald-700">1 سلة متكاملة</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Field Visits Tab */}
            <TabsContent value="visits" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <CardTitle className="text-base font-bold">الزيارات الميدانية والبحث الاجتماعي</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toast.success('تم جدولة موعد زيارة ميدانية جديدة')}
                    className="rounded-xl text-xs gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    جدولة زيارة
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3 text-xs">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900">زيارة تقييم حالة أولية</span>
                      <Badge className="bg-green-100 text-green-800 text-[10px]">مكتملة ✓</Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      قام الباحث الاجتماعي بزيارة منزل الأسرة في حي السيدة زينب، وتمت معاينة الوضع المعيشي والتأكد من انعدام الدخل الثابت. التوصية: استحقاق كامل.
                    </p>
                    <span className="text-[11px] text-gray-400 block pt-1 border-t">
                      الباحث: محمود الزيات • التاريخ: 15 أكتوبر 2023
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Summary Area (1 Col) */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="bg-gray-50/50 border-b pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-600" />
                ملخص بيانات الحالة
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">الحالة الاجتماعية</span>
                <span className="font-bold text-gray-900">{beneficiary.socialStatus}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">عدد المعالين</span>
                <span className="font-bold text-gray-900">{beneficiary.familyMembers} أفراد</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">الدخل الشهري</span>
                <span className="font-bold text-emerald-700">{formatAmount(beneficiary.monthlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                <span className="text-gray-500">حالة الطلب</span>
                <span className="font-bold text-emerald-700">{STATUS_CONFIG[currentStatus]?.label?.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-gray-500">المستندات المرفقة</span>
                <span className="font-bold text-gray-900">{documents.length} ملفات</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50/60 border-emerald-200/80">
            <CardContent className="p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-sm text-emerald-950">إدراج في برامج المساعدات</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                هذه الحالة معتمدة ويمكن صرف مساعدات مالية أو سلات غذائية أو كفالة أسرية لها مباشرة.
              </p>
              <Button
                onClick={() => toast.success('تم إدراج الحالة في كشوف الصرف القادمة')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-xl"
              >
                صرف مساعدة فورية
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Update Status Dialog (CRITICAL REQUIREMENT) */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[480px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-800">
              <ArrowRightLeft className="w-5 h-5 text-emerald-600" />
              تحديث مسار وحالة الطلب
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateStatus} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                اختر الحالة الجديدة للطلب:
              </label>
              <Select value={newStatusValue} onValueChange={setNewStatusValue}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">1. جديد (طلب وارد بانتظار الفرز)</SelectItem>
                  <SelectItem value="UNDER_REVIEW">2. قيد الدراسة والبحث الميداني</SelectItem>
                  <SelectItem value="APPROVED">3. موافق عليه (مستحق للدعم)</SelectItem>
                  <SelectItem value="REJECTED">4. مرفوض (غير مستوفي الشروط)</SelectItem>
                  <SelectItem value="COMPLETED">5. منتهي (تم استيفاء وصرف الدعم بالكامل)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                سبب القرار / ملاحظات اللجنة:
              </label>
              <Textarea
                placeholder="اكتب مبررات التغيير أو تقرير الباحث الميداني..."
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                rows={3}
                required
              />
            </div>

            <DialogFooter className="pt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsStatusDialogOpen(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                تأكيد وحفظ الحالة
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload Document Dialog (CRITICAL REQUIREMENT) */}
      <Dialog open={isUploadDocOpen} onOpenChange={setIsUploadDocOpen}>
        <DialogContent className="sm:max-w-[460px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-800">
              <UploadCloud className="w-5 h-5 text-emerald-600" />
              إرفاق مستند جديد لملف الحالة
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddDocument} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                اسم المستند / البيان *
              </label>
              <Input
                placeholder="مثال: روشتة_علاج_مستشفى_الحسين"
                value={newDocForm.name}
                onChange={(e) => setNewDocForm({ ...newDocForm, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                نوع وتصنيف المستند
              </label>
              <Select
                value={newDocForm.type}
                onValueChange={(val) => setNewDocForm({ ...newDocForm, type: val })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="نوع المستند" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="صورة الهوية / البطاقة">صورة بطاقة الرقم القومي / الهوية</SelectItem>
                  <SelectItem value="تقرير طبي">تقرير طبي / روشتة علاج وفحوصات</SelectItem>
                  <SelectItem value="فواتير مرافق / إيجار">فواتير مرافق (كهرباء/غاز/ماء) / عقد إيجار</SelectItem>
                  <SelectItem value="شهادة دخل / مفردات مرتب">شهادة دخل / مفردات مرتب</SelectItem>
                  <SelectItem value="بحث اجتماعي">بحث اجتماعي وزيارة ميدانية</SelectItem>
                  <SelectItem value="شهادات ميلاد أطفال">شهادات ميلاد أطفال</SelectItem>
                  <SelectItem value="مستندات أخرى">مستندات أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border border-dashed border-emerald-300 bg-emerald-50/50 p-4 rounded-xl text-center space-y-1">
              <UploadCloud className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-gray-800">اختر الملف من جهازك</p>
              <p className="text-[11px] text-gray-400">PDF, PNG, JPG حتى 10MB</p>
            </div>

            <DialogFooter className="pt-2 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsUploadDocOpen(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                حفظ وإرفاق المستند
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
