"use client";

import { useState } from "react";
import {
  Warehouse,
  Plus,
  Search,
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Barcode,
  Package,
  Boxes,
  CheckCircle2,
  QrCode,
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

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  unit: string;
  quantity: number;
  minQuantity: number;
  barcode: string;
  location: string;
  lastUpdated: string;
}

interface InventoryTransaction {
  id: string;
  itemName: string;
  type: "IN" | "OUT";
  quantity: number;
  reason: string;
  date: string;
  handledBy: string;
}

const initialItems: InventoryItem[] = [
  {
    id: "1",
    name: "سلة غذائية رمضانية متكاملة",
    category: "مواد غذائية",
    unit: "كرتون",
    quantity: 340,
    minQuantity: 50,
    barcode: "87123901283",
    location: "المستودع الرئيسي - قسم أ1",
    lastUpdated: "2024-03-01",
  },
  {
    id: "2",
    name: "كرسي متحرك لكبار السن وذوي الإعاقة",
    category: "أجهزة طبية",
    unit: "قطعة",
    quantity: 8,
    minQuantity: 15,
    barcode: "74892019482",
    location: "مستودع الأجهزة - رف 3",
    lastUpdated: "2024-02-28",
  },
  {
    id: "3",
    name: "بطانية شتوية فاخرة طبقتين",
    category: "كسوة ومفروشات",
    unit: "حبة",
    quantity: 45,
    minQuantity: 100,
    barcode: "92837482910",
    location: "المستودع الرئيسي - قسم ج2",
    lastUpdated: "2024-01-20",
  },
  {
    id: "4",
    name: "أكياس أرز درجة أولى (10 كجم)",
    category: "مواد غذائية",
    unit: "كيس",
    quantity: 520,
    minQuantity: 80,
    barcode: "62810928374",
    location: "مستودع الأغذية - منصة 4",
    lastUpdated: "2024-03-02",
  },
  {
    id: "5",
    name: "جهاز قياس السكر وضغط الدم",
    category: "أجهزة طبية",
    unit: "جهاز",
    quantity: 22,
    minQuantity: 20,
    barcode: "54829103948",
    location: "مستودع الأجهزة - خزنة 1",
    lastUpdated: "2024-02-15",
  },
  {
    id: "6",
    name: "حقيبة مدرسية متكاملة بالقرطاسية",
    category: "مستلزمات دراسية",
    unit: "حقيبة",
    quantity: 180,
    minQuantity: 40,
    barcode: "63729104928",
    location: "المستودع الفرعي - قسم ب",
    lastUpdated: "2024-02-10",
  },
];

const initialTransactions: InventoryTransaction[] = [
  {
    id: "1",
    itemName: "سلة غذائية رمضانية متكاملة",
    type: "IN",
    quantity: 200,
    reason: "تبرع عيني من مؤسسة الراجحي الخيرية",
    date: "2024-03-01",
    handledBy: "فهد العتيبي",
  },
  {
    id: "2",
    itemName: "كرسي متحرك لكبار السن وذوي الإعاقة",
    type: "OUT",
    quantity: 4,
    reason: "صرف لمستفيدي حي الشفا المسجلين",
    date: "2024-02-28",
    handledBy: "خالد السبيعي",
  },
  {
    id: "3",
    itemName: "أكياس أرز درجة أولى (10 كجم)",
    type: "IN",
    quantity: 300,
    reason: "شراء من الميزانية المعتمدة للسلات",
    date: "2024-02-25",
    handledBy: "فهد العتيبي",
  },
  {
    id: "4",
    itemName: "بطانية شتوية فاخرة طبقتين",
    type: "OUT",
    quantity: 80,
    reason: "توزيع حملة دفء الشتاء للأسر المحتاجة",
    date: "2024-01-20",
    handledBy: "عمر الشمري",
  },
];

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>(initialTransactions);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isTxOpen, setIsTxOpen] = useState(false);
  const [selectedItemForTx, setSelectedItemForTx] = useState<InventoryItem | null>(null);

  // Form State Item
  const [itemFormData, setItemFormData] = useState({
    name: "",
    category: "مواد غذائية",
    unit: "قطعة",
    quantity: "",
    minQuantity: "",
    barcode: "",
    location: "",
  });

  // Form State Transaction
  const [txFormData, setTxFormData] = useState({
    type: "IN" as "IN" | "OUT",
    quantity: "",
    reason: "",
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemFormData.name || !itemFormData.quantity) {
      toast.error("يرجى إدخال اسم الصنف والكمية");
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: itemFormData.name,
      category: itemFormData.category,
      unit: itemFormData.unit || "قطعة",
      quantity: Number(itemFormData.quantity),
      minQuantity: Number(itemFormData.minQuantity) || 10,
      barcode: itemFormData.barcode || Math.floor(10000000000 + Math.random() * 90000000000).toString(),
      location: itemFormData.location || "المستودع العام",
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setItems([newItem, ...items]);
    setIsAddItemOpen(false);
    toast.success("تم إضافة الصنف الجديد بنجاح!");
  };

  const handleRecordTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForTx || !txFormData.quantity) return;

    const qty = Number(txFormData.quantity);
    if (txFormData.type === "OUT" && qty > selectedItemForTx.quantity) {
      toast.error("الكمية المطلوبة للصرف أكبر من الرصيد المتوفر بالمستودع!");
      return;
    }

    const updatedItems = items.map((itm) => {
      if (itm.id === selectedItemForTx.id) {
        return {
          ...itm,
          quantity:
            txFormData.type === "IN"
              ? itm.quantity + qty
              : itm.quantity - qty,
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      }
      return itm;
    });

    const newTx: InventoryTransaction = {
      id: Date.now().toString(),
      itemName: selectedItemForTx.name,
      type: txFormData.type,
      quantity: qty,
      reason: txFormData.reason || "حركة مستودعية",
      date: new Date().toISOString().split("T")[0],
      handledBy: "المشرف الحالي",
    };

    setItems(updatedItems);
    setTransactions([newTx, ...transactions]);
    setIsTxOpen(false);
    toast.success(`تم تسجيل عملية ${txFormData.type === "IN" ? "الإدخال" : "الصرف"} بنجاح!`);
  };

  const lowStockItems = items.filter((i) => i.quantity <= i.minQuantity);
  const totalStockUnits = items.reduce((acc, i) => acc + i.quantity, 0);

  const filteredItems = items.filter((i) => {
    const matchesSearch =
      i.name.includes(search) ||
      i.barcode.includes(search) ||
      i.location.includes(search);
    const matchesCat = selectedCategory === "ALL" || i.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Warehouse className="w-7 h-7 text-emerald-600" />
            إدارة المخازن والأصناف العينية
          </h1>
          <p className="text-gray-500 mt-1">
            متابعة المخزون، صرف التبرعات العينية، تنبيهات النقص، وحركة الوارد والمنصرف
          </p>
        </div>
        <Button
          onClick={() => setIsAddItemOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة صنف جديد
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">إجمالي الأصناف المسجلة</p>
              <p className="text-xl font-bold text-gray-900 mt-0.5">{items.length} صنف</p>
              <span className="text-xs text-blue-600 font-medium">موزعة على 4 تصنيفات</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">إجمالي الوحدات بالمخزن</p>
              <p className="text-xl font-bold text-emerald-600 mt-0.5">
                {formatNumber(totalStockUnits)} وحدة
              </p>
              <span className="text-xs text-emerald-600 font-medium">رصيد جاهز للتوزيع</span>
            </div>
          </CardContent>
        </Card>

        <Card className={lowStockItems.length > 0 ? "border-amber-300 bg-amber-50/20" : ""}>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">تنبيهات نقص المخزون</p>
              <p className="text-xl font-bold text-amber-700 mt-0.5">
                {lowStockItems.length} أصناف
              </p>
              <span className="text-xs text-amber-600 font-medium">أقل من حد الأمان</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Barcode className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">العمليات المنفذة مؤخرًا</p>
              <p className="text-xl font-bold text-purple-600 mt-0.5">
                {transactions.length} حركة
              </p>
              <span className="text-xs text-purple-600 font-medium">إدخال وصرف عيني</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Stock List vs Transactions */}
      <Tabs defaultValue="items">
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger value="items" className="rounded-lg data-[state=active]:bg-white">
            قائمة المخزون والأصناف ({items.length})
          </TabsTrigger>
          <TabsTrigger value="transactions" className="rounded-lg data-[state=active]:bg-white">
            سجل حركات الإدخال والصرف ({transactions.length})
          </TabsTrigger>
        </TabsList>

        {/* Items List Tab */}
        <TabsContent value="items" className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="بحث باسم الصنف، الباركود، أو موقع التخزين..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ps-10 bg-white rounded-xl"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ALL">جميع التصنيفات</option>
              <option value="مواد غذائية">مواد غذائية</option>
              <option value="أجهزة طبية">أجهزة طبية</option>
              <option value="كسوة ومفروشات">كسوة ومفروشات</option>
              <option value="مستلزمات دراسية">مستلزمات دراسية</option>
            </select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="table-responsive">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الصنف</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">التصنيف</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الباركود</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">موقع التخزين</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الرصيد الحالي</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الحالة</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredItems.map((itm) => {
                      const isLow = itm.quantity <= itm.minQuantity;
                      return (
                        <tr key={itm.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="text-sm font-medium text-gray-900">{itm.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary" className="text-xs">
                              {itm.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-gray-600 font-mono flex items-center gap-1">
                              <Barcode className="w-3.5 h-3.5 text-gray-400" />
                              {itm.barcode}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-600">{itm.location}</td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-bold text-gray-900">
                              {formatNumber(itm.quantity)} {itm.unit}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {isLow ? (
                              <Badge className="bg-amber-100 text-amber-800 gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                منخفض (حد الأمان: {itm.minQuantity})
                              </Badge>
                            ) : (
                              <Badge className="bg-emerald-100 text-emerald-800">متوفر</Badge>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedItemForTx(itm);
                                setIsTxOpen(true);
                              }}
                              className="rounded-lg text-xs"
                            >
                              إدخال / صرف
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4 mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="table-responsive">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/50">
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">النوع</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الصنف</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">الكمية</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">السبب / البيان</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">المسؤول</th>
                      <th className="text-start text-xs font-medium text-gray-500 uppercase px-4 py-3">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3">
                          {tx.type === "IN" ? (
                            <Badge className="bg-green-100 text-green-800 gap-1">
                              <ArrowDownLeft className="w-3.5 h-3.5" />
                              إدخال (وارد)
                            </Badge>
                          ) : (
                            <Badge className="bg-rose-100 text-rose-800 gap-1">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                              صرف (صادر)
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium text-sm text-gray-900">{tx.itemName}</td>
                        <td className="px-4 py-3 font-bold text-sm">
                          {tx.type === "IN" ? `+${tx.quantity}` : `-${tx.quantity}`}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">{tx.reason}</td>
                        <td className="px-4 py-3 text-xs text-gray-700">{tx.handledBy}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Item Dialog */}
      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent className="sm:max-w-[500px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة صنف جديد للمستودع</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddItem} className="space-y-4 py-2">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">اسم الصنف *</label>
              <Input
                placeholder="أرز بسمتي 10 كجم"
                value={itemFormData.name}
                onChange={(e) => setItemFormData({ ...itemFormData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">التصنيف</label>
                <select
                  value={itemFormData.category}
                  onChange={(e) => setItemFormData({ ...itemFormData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="مواد غذائية">مواد غذائية</option>
                  <option value="أجهزة طبية">أجهزة طبية</option>
                  <option value="كسوة ومفروشات">كسوة ومفروشات</option>
                  <option value="مستلزمات دراسية">مستلزمات دراسية</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">وحدة القياس</label>
                <Input
                  placeholder="كرتون / حبة / كيس"
                  value={itemFormData.unit}
                  onChange={(e) => setItemFormData({ ...itemFormData, unit: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">الكمية الافتتاحية *</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={itemFormData.quantity}
                  onChange={(e) => setItemFormData({ ...itemFormData, quantity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">حد الأمان (تنبيه النقص)</label>
                <Input
                  type="number"
                  placeholder="20"
                  value={itemFormData.minQuantity}
                  onChange={(e) => setItemFormData({ ...itemFormData, minQuantity: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">الباركود (اختياري)</label>
                <Input
                  placeholder="62810..."
                  value={itemFormData.barcode}
                  onChange={(e) => setItemFormData({ ...itemFormData, barcode: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">موقع التخزين بالمستودع</label>
                <Input
                  placeholder="قسم أ - رف 2"
                  value={itemFormData.location}
                  onChange={(e) => setItemFormData({ ...itemFormData, location: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddItemOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                حفظ الصنف
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Record In/Out Transaction Dialog */}
      <Dialog open={isTxOpen} onOpenChange={setIsTxOpen}>
        <DialogContent className="sm:max-w-[480px]" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              تسجيل حركة مستودعية: {selectedItemForTx?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRecordTransaction} className="space-y-4 py-2">
            <div className="bg-gray-50 p-3 rounded-xl text-xs space-y-1">
              <p>
                <span className="text-gray-500">الرصيد الحالي بالمستودع: </span>
                <span className="font-bold text-gray-900 text-sm">
                  {selectedItemForTx?.quantity} {selectedItemForTx?.unit}
                </span>
              </p>
              <p>
                <span className="text-gray-500">الموقع: </span>
                <span>{selectedItemForTx?.location}</span>
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">نوع الحركة</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTxFormData({ ...txFormData, type: "IN" })}
                  className={`py-2.5 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    txFormData.type === "IN"
                      ? "bg-green-50 border-green-600 text-green-700 shadow-sm"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  إدخال (توريد / تبرع وارد)
                </button>
                <button
                  type="button"
                  onClick={() => setTxFormData({ ...txFormData, type: "OUT" })}
                  className={`py-2.5 rounded-xl border font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    txFormData.type === "OUT"
                      ? "bg-rose-50 border-rose-600 text-rose-700 shadow-sm"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  صرف (توزيع لمستفيدين)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">الكمية *</label>
              <Input
                type="number"
                placeholder="20"
                value={txFormData.quantity}
                onChange={(e) => setTxFormData({ ...txFormData, quantity: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">السبب / البيان</label>
              <Input
                placeholder="صرف للأسر المسجلة في حي الملز..."
                value={txFormData.reason}
                onChange={(e) => setTxFormData({ ...txFormData, reason: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsTxOpen(false)}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                تأكيد الحركة
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
