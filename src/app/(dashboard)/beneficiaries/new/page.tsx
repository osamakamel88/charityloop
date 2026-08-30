'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  UploadCloud,
  FileText,
  FileCheck,
  Paperclip,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { useCurrency } from '@/lib/currency-context';

const STEPS = [
  'البيانات الشخصية',
  'البيانات العائلية',
  'نوع الاحتياج',
  'المستندات والمرفقات',
  'مراجعة وتأكيد',
];

interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
}

export default function NewBeneficiaryPage() {
  const router = useRouter();
  const { currency } = useCurrency();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    phone: '',
    email: '',
    socialStatus: 'MARRIED',
    address: '',
    city: 'القاهرة',
    district: '',
    familyMembers: '4',
    monthlyIncome: '2500',
    category: 'POOR_FAMILY',
    needType: '',
    initialStatus: 'NEW',
    notes: '',
  });

  const [familyMembersList, setFamilyMembersList] = useState([
    { name: 'فاطمة محمد', relation: 'زوجة', age: '32' },
    { name: 'يوسف أحمد', relation: 'ابن', age: '8' },
  ]);

  // Documents state
  const [documents, setDocuments] = useState<UploadedDoc[]>([
    {
      id: 'doc-1',
      name: 'صورة_بطاقة_الرقم_القومي_لرب_الأسرة.pdf',
      type: 'صورة الهوية / البطاقة',
      size: '1.2 MB',
      uploadDate: new Date().toLocaleDateString('ar-EG'),
    },
    {
      id: 'doc-2',
      name: 'فاتورة_كهرباء_حديثة_يناير.pdf',
      type: 'فواتير مرافق / إيجار',
      size: '850 KB',
      uploadDate: new Date().toLocaleDateString('ar-EG'),
    },
  ]);

  const [newDocType, setNewDocType] = useState('تقرير طبي');
  const [customDocName, setCustomDocName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addFamilyMember = () => {
    setFamilyMembersList([...familyMembersList, { name: '', relation: '', age: '' }]);
  };

  const removeFamilyMember = (index: number) => {
    const list = [...familyMembersList];
    list.splice(index, 1);
    setFamilyMembersList(list);
  };

  const handleFamilyMemberChange = (index: number, field: string, value: string) => {
    const list = [...familyMembersList] as any;
    list[index][field] = value;
    setFamilyMembersList(list);
  };

  // Mock document upload handler
  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const newDoc: UploadedDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: newDocType,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toLocaleDateString('ar-EG'),
      };
      setDocuments((prev) => [...prev, newDoc]);
      toast.success(`تم رفع المستند بنجاح: ${file.name}`);
      e.target.value = '';
    }
  };

  const handleAddManualDoc = () => {
    if (!customDocName.trim()) {
      toast.error('يرجى كتابة اسم المستند');
      return;
    }
    const newDoc: UploadedDoc = {
      id: `doc-${Date.now()}`,
      name: `${customDocName.trim()}.pdf`,
      type: newDocType,
      size: '1.4 MB',
      uploadDate: new Date().toLocaleDateString('ar-EG'),
    };
    setDocuments((prev) => [...prev, newDoc]);
    setCustomDocName('');
    toast.success(`تم إرفاق المستند: ${newDoc.name}`);
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    toast.info('تم حذف المستند');
  };

  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.firstName || !formData.lastName || !formData.nationalId || !formData.phone) {
        toast.error('الرجاء تعبئة الحقول الإلزامية (الاسم، الهوية، الجوال)');
        return false;
      }
    } else if (currentStep === 1) {
      if (!formData.familyMembers || !formData.monthlyIncome) {
        toast.error('الرجاء إدخال عدد أفراد الأسرة والدخل الشهري');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.category || !formData.needType) {
        toast.error('الرجاء تحديد تصنيف الحالة ووصف الاحتياج');
        return false;
      }
    } else if (currentStep === 3) {
      if (documents.length === 0) {
        toast.error('يرجى إرفاق مستند واحد على الأقل (مثل صورة الهوية أو التقارير الطبية)');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('تم تسجيل وتوجيه طلب المستفيد بنجاح وهو الآن (قيد الدراسة والبحث)!');
    router.push('/beneficiaries');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          تسجيل مستفيد وطلب مساعدة جديد
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          إدخال بيانات الحالة، إرفاق المستندات الرسمية، وتحديد مسار دراسة الطلب
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-8 relative px-2">
        <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
        {STEPS.map((step, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5 bg-gray-50 px-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                index < currentStep
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : index === currentStep
                  ? 'bg-emerald-600 border-emerald-600 text-white ring-4 ring-emerald-100'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <span
              className={`text-xs font-semibold ${
                index <= currentStep ? 'text-emerald-800 font-bold' : 'text-gray-400'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-gray-900 font-bold">
                {STEPS[currentStep]}
              </CardTitle>
              <CardDescription className="text-xs">
                الخطوة {currentStep + 1} من {STEPS.length}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 text-xs">
              طلب مساعدة جديد
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form id="beneficiary-form" onSubmit={handleSubmit}>
            {/* Step 1: Personal Info */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs font-semibold text-gray-700">
                    الاسم الأول <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="مثال: أحمد"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs font-semibold text-gray-700">
                    اسم العائلة / اللقب <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="مثال: السيد"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nationalId" className="text-xs font-semibold text-gray-700">
                    رقم الهوية / الرقم القومي <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nationalId"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    placeholder="14 رقم للرقم القومي"
                    dir="ltr"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-semibold text-gray-700">
                    رقم الهاتف المحمول <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    dir="ltr"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="socialStatus" className="text-xs font-semibold text-gray-700">
                    الحالة الاجتماعية
                  </Label>
                  <Select
                    value={formData.socialStatus}
                    onValueChange={(val) => handleSelectChange('socialStatus', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة الاجتماعية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MARRIED">متزوج / رب أسرة</SelectItem>
                      <SelectItem value="SINGLE">أعزب</SelectItem>
                      <SelectItem value="WIDOWED">أرمل / أرملة</SelectItem>
                      <SelectItem value="DIVORCED">مطلق / مطلقة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-gray-700">
                    البريد الإلكتروني (اختياري)
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="address" className="text-xs font-semibold text-gray-700">
                    العنوان بالتفصيل
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="الشارع، رقم المبنى، علامة مميزة"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-xs font-semibold text-gray-700">
                    المحافظة / المدينة
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="القاهرة / الجيزة / الإسكندرية..."
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="district" className="text-xs font-semibold text-gray-700">
                    الحي / المركز
                  </Label>
                  <Input
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="اسم الحي أو القرية"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Family Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="familyMembers" className="text-xs font-semibold text-gray-700">
                      عدد أفراد الأسرة المقيمين <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="familyMembers"
                      name="familyMembers"
                      type="number"
                      value={formData.familyMembers}
                      onChange={handleInputChange}
                      required
                      min="1"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="monthlyIncome" className="text-xs font-semibold text-gray-700">
                      الدخل الشهري الإجمالي ({currency.symbol}) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="monthlyIncome"
                      name="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">أفراد الأسرة المعالين</h3>
                      <p className="text-xs text-gray-500">سجل أسماء وأعمار الأبناء والتابعين للأسرة</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={addFamilyMember} className="rounded-xl gap-1.5 text-xs">
                      <Plus className="h-3.5 w-3.5" />
                      إضافة فرد
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {familyMembersList.map((member, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-3 items-end bg-gray-50 p-3.5 rounded-xl border border-gray-200">
                        <div className="space-y-1 flex-1 w-full">
                          <Label className="text-xs">الاسم</Label>
                          <Input
                            value={member.name}
                            onChange={(e) => handleFamilyMemberChange(idx, 'name', e.target.value)}
                            placeholder="اسم الفرد"
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1 flex-1 w-full">
                          <Label className="text-xs">صلة القرابة</Label>
                          <Input
                            value={member.relation}
                            onChange={(e) => handleFamilyMemberChange(idx, 'relation', e.target.value)}
                            placeholder="ابن / ابنة / والدة"
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-1 w-full sm:w-28">
                          <Label className="text-xs">العمر</Label>
                          <Input
                            type="number"
                            value={member.age}
                            onChange={(e) => handleFamilyMemberChange(idx, 'age', e.target.value)}
                            placeholder="العمر"
                            className="bg-white"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:bg-red-50 shrink-0"
                          onClick={() => removeFamilyMember(idx)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Need Type */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-xs font-semibold text-gray-700">
                      تصنيف الحالة المحتاجة <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(val) => handleSelectChange('category', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التصنيف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="POOR_FAMILY">أسر فقيرة ومعدومة</SelectItem>
                        <SelectItem value="ORPHAN">أيتام</SelectItem>
                        <SelectItem value="WIDOW">أرامل</SelectItem>
                        <SelectItem value="PATIENT">مرضى وعمليات جراحية</SelectItem>
                        <SelectItem value="ELDERLY">كبار سن وعجزة</SelectItem>
                        <SelectItem value="STUDENT">طلاب علم</SelectItem>
                        <SelectItem value="OTHER">حالات أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="initialStatus" className="text-xs font-semibold text-gray-700">
                      المسار الأولي لحالة الطلب
                    </Label>
                    <Select
                      value={formData.initialStatus}
                      onValueChange={(val) => handleSelectChange('initialStatus', val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="حالة الطلب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEW">طلب جديد (بانتظار الفرز)</SelectItem>
                        <SelectItem value="UNDER_REVIEW">قيد الدراسة والبحث الميداني</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="needType" className="text-xs font-semibold text-gray-700">
                    نوع الاحتياج وتفاصيل المساعدة المطلوبة <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="needType"
                    name="needType"
                    value={formData.needType}
                    onChange={handleInputChange}
                    placeholder="مثال: طلب مساعدة مالية شهرية لشراء علاج وفاتورة كهرباء متراكمة وسلة غذائية للأطفال..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notes" className="text-xs font-semibold text-gray-700">
                    ملاحظات الباحث الاجتماعي / المستلم
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="أي ملاحظات مبدئية تفيد لجنة البحث والمساعدات..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Documents Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">
                    رفع المستندات والوثائق المطلوبة
                  </h3>
                  <p className="text-xs text-gray-500">
                    صورة بطاقة الرقم القومي، تقارير طبية، فواتير مرافق، مفردات مرتب، أو عقود إيجار
                  </p>
                </div>

                {/* Upload Box */}
                <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/40 rounded-2xl p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">
                      اختر ملفًا من جهازك أو اسحبه هنا
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      يدعم ملفات PDF، الصور (PNG, JPG)، والمستندات بحد أقصى 10MB للملف
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <div className="w-48 text-right">
                      <Select value={newDocType} onValueChange={setNewDocType}>
                        <SelectTrigger className="bg-white text-xs">
                          <SelectValue placeholder="نوع المستند" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="صورة الهوية / البطاقة">صورة الهوية / البطاقة</SelectItem>
                          <SelectItem value="تقرير طبي">تقرير طبي / روشتة علاج</SelectItem>
                          <SelectItem value="فواتير مرافق / إيجار">فواتير مرافق / عقد إيجار</SelectItem>
                          <SelectItem value="شهادة دخل / بحث اجتماعي">شهادة دخل / بحث اجتماعي</SelectItem>
                          <SelectItem value="شهادات ميلاد أطفال">شهادات ميلاد أطفال</SelectItem>
                          <SelectItem value="مستندات أخرى">مستندات أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <label className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors inline-flex items-center gap-1.5">
                      <Paperclip className="w-4 h-4" />
                      اختيار ورفع ملف
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleSimulateFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      />
                    </label>
                  </div>
                </div>

                {/* Quick Manual Attachment (for testing/easy entry) */}
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row gap-2.5 items-center">
                  <Input
                    placeholder="أو اكتب اسم مستند سريع لإرفاقه (مثال: تقرير_مستشفى_الحسين.pdf)"
                    value={customDocName}
                    onChange={(e) => setCustomDocName(e.target.value)}
                    className="bg-white text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddManualDoc}
                    className="shrink-0 text-xs gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    إرفاق فوري
                  </Button>
                </div>

                {/* Uploaded Documents List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700">
                      المستندات المرفقة حاليًا ({documents.length}):
                    </span>
                    {documents.length >= 2 && (
                      <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <FileCheck className="w-3.5 h-3.5" />
                        المستندات الأساسية مكتملة
                      </span>
                    )}
                  </div>

                  {documents.length === 0 ? (
                    <div className="text-center py-6 text-xs text-gray-400 border rounded-xl">
                      لم يتم إرفاق أي مستندات حتى الآن
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3.5 bg-white border border-gray-200 rounded-xl shadow-xs hover:border-emerald-300 transition-all"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-gray-900 truncate">
                                {doc.name}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                                  {doc.type}
                                </Badge>
                                <span className="text-[11px] text-gray-400">{doc.size}</span>
                              </div>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDocument(doc.id)}
                            className="text-gray-400 hover:text-red-600 shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Summary */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200/60 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-emerald-950 mb-3 border-b border-emerald-200 pb-2">
                      1. البيانات الشخصية ومحل الإقامة
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 block mb-0.5">الاسم الكامل:</span>
                        <span className="font-bold text-gray-900">
                          {formData.firstName} {formData.lastName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-0.5">الرقم القومي / الهوية:</span>
                        <span className="font-bold text-gray-900 font-mono" dir="ltr">
                          {formData.nationalId}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-0.5">رقم الجوال:</span>
                        <span className="font-bold text-gray-900 font-mono" dir="ltr">
                          {formData.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-0.5">الحالة الاجتماعية:</span>
                        <span className="font-bold text-gray-900">{formData.socialStatus}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 block mb-0.5">العنوان:</span>
                        <span className="font-medium text-gray-800">
                          {formData.city} - {formData.district} - {formData.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-950 mb-3 border-b border-emerald-200 pb-2">
                      2. الحالة الاقتصادية والأسرة
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 block mb-0.5">عدد أفراد الأسرة:</span>
                        <span className="font-bold text-gray-900">{formData.familyMembers} أفراد</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-0.5">الدخل الشهري:</span>
                        <span className="font-bold text-emerald-700 text-sm">
                          {formData.monthlyIncome} {currency.symbol}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block mb-0.5">تصنيف الحالة:</span>
                        <Badge className="bg-emerald-700 text-white">{formData.category}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 text-xs">
                      <span className="text-gray-500 block mb-1">تفاصيل الاحتياج:</span>
                      <p className="p-3 bg-white rounded-xl border border-emerald-100 text-gray-800">
                        {formData.needType}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-emerald-950 mb-3 border-b border-emerald-200 pb-2">
                      3. المستندات المرفقة للطلب ({documents.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {documents.map((d) => (
                        <div
                          key={d.id}
                          className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100"
                        >
                          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-medium text-gray-900 truncate">{d.name}</span>
                          <span className="text-gray-400 text-[10px] shrink-0">({d.type})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-5 bg-gray-50/50">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="rounded-xl text-xs"
          >
            <ChevronRight className="me-1 h-4 w-4" />
            السابق
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs"
            >
              التالي
              <ChevronLeft className="ms-1 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              form="beneficiary-form"
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs gap-1.5"
            >
              <Check className="w-4 h-4" />
              تأكيد وتسجيل طلب المساعدة
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
