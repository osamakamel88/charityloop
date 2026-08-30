"use client";

import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Info,
  Clock,
  Trash2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "SUCCESS" | "ERROR";
  isRead: boolean;
  time: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "تنبيه تجديد مساعدة",
    message: "حان موعد تجديد المساعدة الشهرية لأسرة المستفيد (محمد عبدالله العتيبي) - رقم الملف #1024.",
    type: "WARNING",
    isRead: false,
    time: "منذ 25 دقيقة",
  },
  {
    id: "2",
    title: "تبرع مالي جديد وارد",
    message: "تم استلام تبرع بقيمة 15,000 ر.س عبر التحويل البنكي مخصص لمشروع السلة الرمضانية.",
    type: "SUCCESS",
    isRead: false,
    time: "منذ ساعتين",
  },
  {
    id: "3",
    title: "تنبيه انخفاض مخزون",
    message: "رصيد (كرسي متحرك لكبار السن) وصل إلى 8 قطع وهو أقل من حد الأمان المحدد (15 قطعة).",
    type: "ERROR",
    isRead: false,
    time: "منذ 4 ساعات",
  },
  {
    id: "4",
    title: "اكتمال زيارة بحث ميدانية",
    message: "قام الباحث الميداني بتسليم تقرير الزيارة للحالة رقم #892 مع التوصية بالموافقة.",
    type: "INFO",
    isRead: true,
    time: "منذ يوم واحد",
  },
  {
    id: "5",
    title: "انضمام متطوع جديد",
    message: "تم تسجيل متطوع جديد متخصص في التوزيع الميداني والخدمات اللوجستية.",
    type: "INFO",
    isRead: true,
    time: "منذ يومين",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    toast.success("تم تحديد جميع الإشعارات كمقروءة");
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    toast.success("تم حذف الإشعار");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "WARNING":
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case "SUCCESS":
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case "ERROR":
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="w-7 h-7 text-emerald-600" />
            مركز الإشعارات والتنبيهات
          </h1>
          <p className="text-gray-500 mt-1">
            متابعة تنبيهات تجديد المساعدات، التبرعات الواردة، ونقص المخزون
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={markAllAsRead}
            className="rounded-xl gap-2 text-xs text-gray-700"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            تحديد الكل كمقروء ({unreadCount})
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={`transition-all ${
              !n.isRead ? "border-emerald-300 bg-emerald-50/20 shadow-sm" : "bg-white"
            }`}
          >
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0 p-2 rounded-xl bg-gray-50 border border-gray-100">
                  {getIcon(n.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{n.title}</h3>
                    {!n.isRead && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{n.time}</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteNotification(n.id)}
                className="text-gray-400 hover:text-rose-600 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
