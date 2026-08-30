"use client";

import { useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  Calendar,
  DollarSign,
  Users,
  CheckCircle2,
  Clock,
  HeartHandshake,
  TrendingUp,
  Package,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { formatNumber } from "@/lib/utils";
import { useCurrency } from "@/lib/currency-context";
import {
  PROJECT_TYPE_LABELS,
  PROJECT_SEASON_LABELS,
  PROJECT_STATUS_LABELS,
} from "@/lib/constants";

interface Project {
  id: string;
  name: string;
  type: string;
  season?: string;
  status: string;
  budget: number;
  spent: number;
  beneficiaryCount: number;
  targetCount: number;
  startDate: string;
  endDate: string;
  phases: { name: string; completed: boolean }[];
  description: string;
}

interface Sponsorship {
  id: string;
  name: string;
  type: "ORPHAN" | "FAMILY" | "STUDENT";
  beneficiaryName: string;
  monthlyAmount: number;
  status: "ACTIVE" | "PAUSED" | "COMPLETED";
  sponsorName: string;
  startDate: string;
}

const initialProjects: Project[] = [
  {
    id: "1",
    name: "مشروع السلة الغذائية الرمضانية 1445هـ",
    type: "SEASONAL",
    season: "RAMADAN",
    status: "ACTIVE",
    budget: 250000,
    spent: 195000,
    beneficiaryCount: 850,
    targetCount: 1000,
    startDate: "2024-02-15",
    endDate: "2024-04-10",
    description: "تأمين وتوزيع 1000 سلة غذائية متكاملة للأسر المحتاجة خلال شهر رمضان المبارك.",
    phases: [
      { name: "حصر الحالات المستحقة", completed: true },
      { name: "شراء المواد والتعبئة", completed: true },
      { name: "التوزيع الميداني المرحلة 1", completed: true },
      { name: "التوزيع الميداني المرحلة 2", completed: false },
      { name: "إعداد التقرير الختامي", completed: false },
    ],
  },
  {
    id: "2",
    name: "برنامج كسوة الشتاء والدفء",
    type: "SEASONAL",
    season: "WINTER",
    status: "COMPLETED",
    budget: 180000,
    spent: 178500,
    beneficiaryCount: 620,
    targetCount: 600,
    startDate: "2023-11-01",
    endDate: "2024-01-30",
    description: "توزيع بطانيات ومدافئ وملابس شتوية للأسر المتعففة وكبار السن.",
    phases: [
      { name: "استقبال التبرعات", completed: true },
      { name: "شراء المستلزمات", completed: true },
      { name: "التوزيع عبر الفرق التطوعية", completed: true },
      { name: "إغلاق المشروع واعتماد المصاريف", completed: true },
    ],
  },
  {
    id: "3",
    name: "مشروع الحقيبة والزي المدرسي",
    type: "SEASONAL",
    season: "BACK_TO_SCHOOL",
    status: "PLANNED",
    budget: 120000,
    spent: 15000,
    beneficiaryCount: 0,
    targetCount: 450,
    startDate: "2024-07-01",
    endDate: "2024-09-01",
    description: "توفير الحقائب والأدوات المدرسية والزي للطلاب الأيتام وأبناء الأسر ذات الدخل المحدود.",
    phases: [
      { name: "تحديد قوائم الطلاب", completed: true },
      { name: "التعاقد مع الموردين", completed: false },
      { name: "استلام وتجهيز الحقائب", completed: false },
      { name: "تسليم الطلاب قبل بداية العام", completed: false },
    ],
  },
  {
    id: "4",
    name: "توفير الأجهزة الطبية المنزلية",
    type: "DISTRIBUTION",
    status: "ACTIVE",
    budget: 300000,
    spent: 210000,
    beneficiaryCount: 140,
    targetCount: 200,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    description: "تأمين كراسي متحركة، أسرّة طبية، وأجهزة توليد الأكسجين للمرضى المحتاجين.",
    phases: [
      { name: "فرز الطلبات والتقارير الطبية", completed: true },
      { name: "فحص الاحتياج وزيارة المرضى", completed: true },
      { name: "تسليم الأجهزة والتدريب", completed: false },
      { name: "متابعة الصيانة الدورية", completed: false },
    ],
  },
];

const initialSponsorships: Sponsorship[] = [
  {
    id: "1",
    name: "كفالة يتيم - برنامج الأمل",
    type: "ORPHAN",
    beneficiaryName: "يوسف فهد المطيري (9 سنوات)",
    monthlyAmount: 300,
    status: "ACTIVE",
    sponsorName: "فاعل خير - بالرياض",
    startDate: "2023-01-01",
  },
  {
    id: "2",
    name: "كفالة أسرة متعففة",
    type: "FAMILY",
    beneficiaryName: "أسرة أم عبدالله (6 أفراد)",
    monthlyAmount: 1500,
    status: "ACTIVE",
    sponsorName: "شركة الخير للتجارة",
    startDate: "2023-06-01",
  },
  {
    id: "3",
    name: "كفالة طالب علم جامعي",
    type: "STUDENT",
    beneficiaryName: "أنس إبراهيم الشريف (كلية الهندسة)",
    monthlyAmount: 800,
    status: "ACTIVE",
    sponsorName: "د. سعود البقمي",
    startDate: "2023-09-01",
  },
  {
    id: "4",
    name: "كفالة يتيم - برنامج الرعاية",
    type: "ORPHAN",
    beneficiaryName: "ريم سلطان العتيبي (7 سنوات)",
    monthlyAmount: 300,
    status: "ACTIVE",
    sponsorName: "نورة عبدالرحمن",
    startDate: "2023-04-15",
  },
];

export default function ProjectsPage() {
  const { formatAmount: formatCurrency } = useCurrency();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [sponsorships, setSponsorships] = useState<Sponsorship[]>(initialSponsorships);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "SEASONAL",
    season: "RAMADAN",
    budget: "",
    targetCount: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.budget) {
      toast.error("يرجى إدخال اسم المشروع والميزانية");
      return;
    }

    const newProj: Project = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      season: formData.season,
      status: "PLANNED",
      budget: Number(formData.budget),
      spent: 0,
      beneficiaryCount: 0,
      targetCount: Number(formData.targetCount) || 100,
      startDate: formData.startDate || new Date().toISOString().split("T")[0],
      endDate: formData.endDate || "",
      description: formData.description,
      phases: [
        { name: "التخطيط والاعتماد", completed: true },
        { name: "التنفيذ الميداني", completed: false },
        { name: "التقييم والتسليم", completed: false },
      ],
    };

    setProjects([newProj, ...projects]);
    setIsAddOpen(false);
    toast.success("تم إنشاء المشروع الجديد بنجاح!");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">نشط</Badge>;
      case "COMPLETED":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">مكتمل</Badge>;
      case "PLANNED":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">مخطط</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalSpent = projects.reduce((acc, p) => acc + p.spent, 0);
  const totalBeneficiaries = projects.reduce((acc, p) => acc + p.beneficiaryCount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FolderKanban className="w-7 h-7 text-emerald-600" />
            إدارة المشاريع والخدمات
          </h1>
          <p className="text-gray-500 mt-1">
            إدارة المشاريع الموسمية، حملات التوزيع، وبرامج الكفالات التكافلية
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
        >
          <Plus className="w-4 h-4" />
          إنشاء مشروع جديد
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">إجمالي المشاريع</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{projects.length}</p>
              <span className="text-xs text-emerald-600 font-medium">
                {projects.filter((p) => p.status === "ACTIVE").length} مشاريع قيد التنفيذ
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">الميزانية المعتمدة</p>
              <p className="text-xl font-bold text-emerald-600 mt-0.5">
                {formatCurrency(totalBudget)}
              </p>
              <span className="text-xs text-gray-500">
                المصروف: {formatCurrency(totalSpent)} ({Math.round((totalSpent / totalBudget) * 100)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">المستفيدون من المشاريع</p>
              <p className="text-xl font-bold text-blue-600 mt-0.5">
                {formatNumber(totalBeneficiaries)} مستفيد
              </p>
              <span className="text-xs text-blue-600 font-medium">حسب تقارير الإنجاز</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">برامج الكفالة النشطة</p>
              <p className="text-xl font-bold text-amber-600 mt-0.5">
                {sponsorships.length} كفالة
              </p>
              <span className="text-xs text-amber-600 font-medium">أيتام، أسر، وطلاب</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Projects vs Sponsorships */}
      <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-white">
            المشاريع والحملات الموسمية ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="sponsorships" className="rounded-lg data-[state=active]:bg-white">
            برامج الكفالة التكافلية ({sponsorships.length})
          </TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => {
              const progressPct = Math.min(100, Math.round((p.spent / p.budget) * 100));
              const targetPct =
                p.targetCount > 0
                  ? Math.min(100, Math.round((p.beneficiaryCount / p.targetCount) * 100))
                  : 0;

              return (
                <Card key={p.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gray-50/50 pb-3 border-b border-gray-100">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(p.status)}
                          {p.season && (
                            <Badge variant="outline" className="text-xs">
                              {PROJECT_SEASON_LABELS[p.season] || p.season}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base font-bold text-gray-900">
                          {p.name}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed">{p.description}</p>

                    {/* Progress Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-gray-50 p-2.5 rounded-xl">
                        <span className="text-gray-500 block">الميزانية والمصروف:</span>
                        <div className="font-bold text-gray-900 text-sm mt-0.5">
                          {formatCurrency(p.spent)}{" "}
                          <span className="text-xs font-normal text-gray-400">
                            / {formatCurrency(p.budget)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block">
                          تم صرف {progressPct}% من الميزانية
                        </span>
                      </div>

                      <div className="bg-gray-50 p-2.5 rounded-xl">
                        <span className="text-gray-500 block">الإنجاز والمستفيدون:</span>
                        <div className="font-bold text-emerald-700 text-sm mt-0.5">
                          {formatNumber(p.beneficiaryCount)}{" "}
                          <span className="text-xs font-normal text-gray-400">
                            / {formatNumber(p.targetCount)} مستفيد
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
                          <div
                            className="bg-blue-600 h-full rounded-full"
                            style={{ width: `${targetPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-gray-500 mt-1 block">
                          تحقيق {targetPct}% من المستهدف
                        </span>
                      </div>
                    </div>

                    {/* Execution Phases */}
                    <div className="pt-2">
                      <span className="text-xs font-bold text-gray-700 block mb-2">
                        مراحل التنفيذ:
                      </span>
                      <div className="space-y-1.5">
                        {p.phases.map((ph, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-gray-700"
                          >
                            {ph.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <Clock className="w-4 h-4 text-gray-300 shrink-0" />
                            )}
                            <span className={ph.completed ? "line-through text-gray-400" : ""}>
                              {ph.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Sponsorships Tab */}
        <TabsContent value="sponsorships" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sponsorships.map((s) => (
              <Card key={s.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        s.type === "ORPHAN"
                          ? "bg-purple-100 text-purple-800"
                          : s.type === "FAMILY"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-blue-100 text-blue-800"
                      }
                    >
                      {s.type === "ORPHAN"
                        ? "كفالة يتيم"
                        : s.type === "FAMILY"
                        ? "كفالة أسرة"
                        : "كفالة طالب علم"}
                    </Badge>
                    <span className="text-xs text-green-600 font-bold">● مستمرة</span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-base">{s.name}</h3>

                  <div className="space-y-1 text-xs text-gray-600 pt-1 border-t border-gray-100">
                    <p>
                      <span className="text-gray-400">المستفيد: </span>
                      <span className="font-semibold text-gray-800">{s.beneficiaryName}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">الكافل: </span>
                      <span className="font-semibold text-gray-800">{s.sponsorName}</span>
                    </p>
                    <p>
                      <span className="text-gray-400">تاريخ البدء: </span>
                      <span>{s.startDate}</span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500">المبلغ الشهري</span>
                    <span className="text-base font-bold text-emerald-700">
                      {formatCurrency(s.monthlyAmount)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Project Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[550px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>إنشاء مشروع أو مبادرة جديدة</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProject} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                اسم المشروع / المبادرة *
              </label>
              <Input
                placeholder="مشروع كسوة العيد للأيتام"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  نوع المشروع
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.entries(PROJECT_TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  الموسم (اختياري)
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Object.entries(PROJECT_SEASON_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  الميزانية المقدرة (ر.س) *
                </label>
                <Input
                  type="number"
                  placeholder="50000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  العدد المستهدف من المستفيدين
                </label>
                <Input
                  type="number"
                  placeholder="300"
                  value={formData.targetCount}
                  onChange={(e) => setFormData({ ...formData, targetCount: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                وصف المشروع وأهدافه
              </label>
              <Input
                placeholder="تفاصيل التوزيع وآلية الوصول للمستفيدين..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                حفظ وإنشاء المشروع
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
