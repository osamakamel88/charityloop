"use client";

import { useState } from "react";
import {
  HandHeart,
  Plus,
  Search,
  Award,
  Clock,
  Star,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Filter,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { VOLUNTEER_SPECIALIZATION_LABELS } from "@/lib/constants";

interface Volunteer {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialization: string;
  skills: string;
  area: string;
  totalHours: number;
  rating: number;
  tasksCount: number;
  isActive: boolean;
  joinedDate: string;
}

const initialVolunteers: Volunteer[] = [
  {
    id: "1",
    name: "عبدالرحمن فهد السبيعي",
    phone: "0551234890",
    email: "abdulrahman@example.com",
    specialization: "DISTRIBUTION",
    skills: "قيادة مركبات، تنظيم ميداني، إسعافات أولية",
    area: "الرياض - حي الملز",
    totalHours: 145,
    rating: 4.9,
    tasksCount: 28,
    isActive: true,
    joinedDate: "2023-05-10",
  },
  {
    id: "2",
    name: "سارة خالد الشمري",
    phone: "0549876512",
    email: "sara.sh@example.com",
    specialization: "TRAINING",
    skills: "تدريب حاسب آلي، لغة إنجليزية، دعم نفسي",
    area: "الرياض - حي النرجس",
    totalHours: 98,
    rating: 4.8,
    tasksCount: 16,
    isActive: true,
    joinedDate: "2023-08-14",
  },
  {
    id: "3",
    name: "محمد إبراهيم الزهراني",
    phone: "0563214587",
    email: "m.zahrani@example.com",
    specialization: "FIELD_VISITS",
    skills: "بحث اجتماعي، تقييم حالات، توثيق",
    area: "الرياض - حي الشفا",
    totalHours: 210,
    rating: 5.0,
    tasksCount: 42,
    isActive: true,
    joinedDate: "2023-01-20",
  },
  {
    id: "4",
    name: "نوف مسفر الدوسري",
    phone: "0534567891",
    email: "nouf.d@example.com",
    specialization: "ADMIN",
    skills: "إدخال بيانات، تصميم جرافيك، إدارة منصات",
    area: "الرياض - حي الروضة",
    totalHours: 64,
    rating: 4.6,
    tasksCount: 12,
    isActive: true,
    joinedDate: "2024-02-01",
  },
  {
    id: "5",
    name: "ياسر سلطان المطيري",
    phone: "0509988776",
    email: "yasser.m@example.com",
    specialization: "DISTRIBUTION",
    skills: "فرز وتعبئة، خدمات لوجستية",
    area: "الرياض - حي اليرموك",
    totalHours: 85,
    rating: 4.7,
    tasksCount: 19,
    isActive: false,
    joinedDate: "2023-11-05",
  },
];

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("ALL");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [certModalOpen, setCertModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    specialization: "DISTRIBUTION",
    skills: "",
    area: "",
  });

  const handleAddVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("يرجى إدخال الاسم ورقم الجوال");
      return;
    }

    const newVolunteer: Volunteer = {
      id: Date.now().toString(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || "volunteer@example.com",
      specialization: formData.specialization,
      skills: formData.skills || "توزيع، عمل عام",
      area: formData.area || "الرياض",
      totalHours: 0,
      rating: 5.0,
      tasksCount: 0,
      isActive: true,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setVolunteers([newVolunteer, ...volunteers]);
    setIsAddOpen(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      specialization: "DISTRIBUTION",
      skills: "",
      area: "",
    });
    toast.success("تم تسجيل المتطوع الجديد بنجاح!");
  };

  const handleIssueCertificate = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setCertModalOpen(true);
  };

  const filteredVolunteers = volunteers.filter((v) => {
    const matchesSearch =
      v.name.includes(search) ||
      v.phone.includes(search) ||
      v.area.includes(search) ||
      v.skills.includes(search);
    const matchesSpec = selectedSpec === "ALL" || v.specialization === selectedSpec;
    return matchesSearch && matchesSpec;
  });

  const totalVolunteers = volunteers.length;
  const activeVolunteers = volunteers.filter((v) => v.isActive).length;
  const totalHours = volunteers.reduce((acc, v) => acc + v.totalHours, 0);
  const totalTasks = volunteers.reduce((acc, v) => acc + v.tasksCount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <HandHeart className="w-7 h-7 text-emerald-600" />
            إدارة المتطوعين
          </h1>
          <p className="text-gray-500 mt-1">
            متابعة بيانات المتطوعين، توزيع المهام، الساعات المنفذة، وشهادات التكريم
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
        >
          <Plus className="w-4 h-4" />
          تسجيل متطوع جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">إجمالي المتطوعين</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{totalVolunteers}</p>
              <span className="text-xs text-emerald-600 font-medium">
                {activeVolunteers} متطوع نشط
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">ساعات التطوع المنفذة</p>
              <p className="text-xl font-bold text-emerald-600 mt-0.5">
                {totalHours} ساعة
              </p>
              <span className="text-xs text-gray-500">معدل {Math.round(totalHours / totalVolunteers)} س/متطوع</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">المهام المنجزة</p>
              <p className="text-xl font-bold text-purple-600 mt-0.5">{totalTasks}</p>
              <span className="text-xs text-purple-600 font-medium">مهمة ميدانية وإدارية</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">متوسط التقييم</p>
              <p className="text-xl font-bold text-amber-600 mt-0.5">4.8 / 5.0</p>
              <span className="text-xs text-amber-600 font-medium">أداء استثنائي</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="بحث باسم المتطوع، الحي، الجوال، المهارات..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-10 bg-white rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedSpec}
            onChange={(e) => setSelectedSpec(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">جميع التخصصات</option>
            {Object.entries(VOLUNTEER_SPECIALIZATION_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Volunteers Grid / Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVolunteers.map((v) => (
          <Card key={v.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-lg">
                    {v.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{v.name}</h3>
                    <Badge variant="secondary" className="mt-0.5 text-xs">
                      {VOLUNTEER_SPECIALIZATION_LABELS[v.specialization] || v.specialization}
                    </Badge>
                  </div>
                </div>
                <Badge
                  className={
                    v.isActive
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                  }
                >
                  {v.isActive ? "نشط" : "غير متاح"}
                </Badge>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <span dir="ltr">{v.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{v.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-medium">{v.rating} / 5.0</span>
                  <span className="text-gray-400">• {v.tasksCount} مهمة منجزة</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-2.5 text-xs text-gray-700">
                <span className="font-semibold block mb-0.5">المهارات:</span>
                <p className="line-clamp-2 text-gray-600">{v.skills}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="text-xs">
                  <span className="text-gray-400 block">إجمالي الساعات</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    {v.totalHours} ساعة
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleIssueCertificate(v)}
                  className="rounded-xl text-xs gap-1.5 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                >
                  <Award className="w-3.5 h-3.5" />
                  شهادة شكر
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Volunteer Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>تسجيل متطوع جديد</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddVolunteer} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                الاسم الكامل *
              </label>
              <Input
                placeholder="أحمد محمد"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  رقم الجوال *
                </label>
                <Input
                  placeholder="05xxxxxxxx"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  البريد الإلكتروني
                </label>
                <Input
                  type="email"
                  placeholder="example@domain.com"
                  dir="ltr"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  التخصص والتصنيف
                </label>
                <select
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.entries(VOLUNTEER_SPECIALIZATION_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  المنطقة / الحي
                </label>
                <Input
                  placeholder="الرياض - حي النخيل"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                المهارات وأوقات التفرغ
              </label>
              <Input
                placeholder="قيادة سيارة، إدخال بيانات، نهاية الأسبوع"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
              >
                إلغاء
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                حفظ المتطوع
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Certificate Modal */}
      <Dialog open={certModalOpen} onOpenChange={setCertModalOpen}>
        <DialogContent className="sm:max-w-[600px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-700">
              <Award className="w-6 h-6" />
              شهادة شكر وتقدير للمتطوع
            </DialogTitle>
          </DialogHeader>
          {selectedVolunteer && (
            <div className="border-4 border-double border-emerald-600 p-8 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 text-center space-y-4 shadow-inner">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <Award className="w-9 h-9" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
                شهادة شكر وعرفان
              </h2>
              <p className="text-sm text-gray-600">
                تتقدم إدارة الجمعية الخيرية بأسمى آيات الشكر والتقدير للمتطوع/ـة:
              </p>
              <h3 className="text-xl font-bold text-emerald-800 py-1">
                {selectedVolunteer.name}
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed max-w-md mx-auto">
                تقديرًا لجهوده المتميزة وعطائه المبارك وتفانيه في إنجاز{" "}
                <span className="font-bold text-emerald-700">
                  {selectedVolunteer.totalHours} ساعة تطوعية
                </span>{" "}
                والمشاركة في {selectedVolunteer.tasksCount} مهمة خيرية لخدمة المجتمع.
              </p>
              <div className="pt-6 flex items-center justify-between text-xs text-gray-500 border-t border-emerald-200/60">
                <div>
                  <span className="block font-semibold text-gray-700">تاريخ الإصدار</span>
                  <span>{new Date().toLocaleDateString("ar-SA")}</span>
                </div>
                <div>
                  <span className="block font-semibold text-gray-700">الختم والاعتماد</span>
                  <span className="text-emerald-700 font-bold">معتمد إلكترونيًا ✓</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="pt-2 flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCertModalOpen(false)}
            >
              إغلاق
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                toast.success("تم إرسال الشهادة الإلكترونية للمتطوع عبر البريد والجوال!");
                setCertModalOpen(false);
              }}
            >
              طباعة / إرسال الشهادة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
