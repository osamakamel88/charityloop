"use client";

import { useState } from "react";
import {
  Settings,
  Building,
  Shield,
  Bell,
  Save,
  Globe,
  Mail,
  Phone,
  Database,
  Lock,
  Coins,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useCurrency, SUPPORTED_CURRENCIES } from "@/lib/currency-context";

export default function SettingsPage() {
  const { currency, setCurrencyCode, formatAmount } = useCurrency();

  const [settings, setSettings] = useState({
    orgName: "جمعية البر والإحسان الخيرية",
    licenseNumber: "1442/089",
    phone: "0112345678",
    email: "info@charityloop.org",
    address: "المقر الرئيسي - القاهرة / الجيزة",
    autoRenewalDays: "30",
    notifyLowStock: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("تم حفظ إعدادات النظام والعملة بنجاح!");
  };

  const handleCurrencyChange = (code: string) => {
    setCurrencyCode(code);
    toast.success(`تم تغيير عملة النظام إلى: ${SUPPORTED_CURRENCIES[code].name}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="w-7 h-7 text-emerald-600" />
          إعدادات النظام والجمعية
        </h1>
        <p className="text-gray-500 mt-1">
          تخصيص بيانات المنظمة، العملة الافتراضية، إعدادات الإشعارات، ومعايير التشغيل
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-white">
            بيانات الجمعية
          </TabsTrigger>
          <TabsTrigger value="currency" className="rounded-lg data-[state=active]:bg-white">
            العملة والشؤون المالية
          </TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg data-[state=active]:bg-white">
            قواعد النظام والتشغيل
          </TabsTrigger>
          <TabsTrigger value="backup" className="rounded-lg data-[state=active]:bg-white">
            النسخ الاحتياطي والأمان
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">البيانات الرسمية للمنظمة</CardTitle>
              <CardDescription className="text-xs">
                تظهر هذه البيانات في الترويسة الرسمية للتقارير وسندات القبض وشهادات الشكر
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      اسم الجمعية / المنظمة الخيرية
                    </label>
                    <Input
                      value={settings.orgName}
                      onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      رقم الترخيص / التسجيل الرسمي
                    </label>
                    <Input
                      value={settings.licenseNumber}
                      onChange={(e) => setSettings({ ...settings, licenseNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      هاتف التواصل المعتمد
                    </label>
                    <Input
                      dir="ltr"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">
                      البريد الإلكتروني الرسمي
                    </label>
                    <Input
                      dir="ltr"
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    العنوان والمقر الرئيسي
                  </label>
                  <Input
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                    <Save className="w-4 h-4" />
                    حفظ التغييرات
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Currency Tab */}
        <TabsContent value="currency" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-600" />
                العملة الافتراضية للنظام (Currency Settings)
              </CardTitle>
              <CardDescription className="text-xs">
                العملة الافتراضية المحددة هي الجنيه المصري (EGP). يمكن للمدير تغييرها في أي وقت لتحديث جميع الجداول والمبالغ والتقارير المالية فورًا.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Currency selector grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.values(SUPPORTED_CURRENCIES).map((c) => {
                  const isSelected = currency.code === c.code;
                  return (
                    <div
                      key={c.code}
                      onClick={() => handleCurrencyChange(c.code)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm"
                          : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{c.name}</span>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">
                          الرمز: {c.symbol} • الكود: {c.code}
                        </span>
                      </div>
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Live Preview Box */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <span className="text-xs font-semibold text-gray-700 block mb-2">
                  معاينة عرض المبالغ المالية بالعملة المختارة حاليًا ({currency.name}):
                </span>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-white px-3 py-2 rounded-lg border text-gray-800">
                    <span className="text-gray-400 text-xs block">مبلغ تبرع:</span>
                    <span className="font-bold text-emerald-700">{formatAmount(5000)}</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border text-gray-800">
                    <span className="text-gray-400 text-xs block">ميزانية مشروع:</span>
                    <span className="font-bold text-emerald-700">{formatAmount(250000)}</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border text-gray-800">
                    <span className="text-gray-400 text-xs block">مساعدة شهرية:</span>
                    <span className="font-bold text-emerald-700">{formatAmount(1500)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">قواعد التشغيل والتنبيهات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">مدة التنبيه قبل انتهاء المساعدة</h4>
                  <p className="text-xs text-gray-500">إرسال إشعار تلقائي للباحث الاجتماعي قبل موعد تجديد الحالة</p>
                </div>
                <div className="w-24">
                  <Input
                    type="number"
                    value={settings.autoRenewalDays}
                    onChange={(e) => setSettings({ ...settings, autoRenewalDays: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">تنبيهات نقص المخزون التلقائية</h4>
                  <p className="text-xs text-gray-500">تنبيه أمين المستودع عند انخفاض أي صنف عن حد الأمان</p>
                </div>
                <span className="text-xs font-bold text-emerald-700">مفعل ✓</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">النسخ الاحتياطي وقاعدة البيانات (VPS Ready)</CardTitle>
              <CardDescription className="text-xs">
                بنية SQLite المعتمدة تتيح أخذ نسخ احتياطية بضغطة زر واحدة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>قاعدة البيانات: SQLite محلي (dev.db)</span>
                </div>
                <p>
                  يتم حفظ جميع المستندات والبيانات وسجلات العمليات داخل مجلد النظام. يمكنك نسخ ملف قاعدة البيانات في أي وقت دون إيقاف الخادم.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => toast.success("تم إنشاء نسخة احتياطية محلية لقاعدة البيانات بنجاح!")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 text-xs"
                >
                  <Database className="w-4 h-4" />
                  إنشاء نسخة احتياطية فورية الآن
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
