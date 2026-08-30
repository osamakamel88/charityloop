"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useCurrency } from "@/lib/currency-context";

const data = [
  { name: "يناير", donations: 120000, expenses: 80000 },
  { name: "فبراير", donations: 150000, expenses: 95000 },
  { name: "مارس", donations: 90000, expenses: 85000 },
  { name: "أبريل", donations: 180000, expenses: 110000 },
  { name: "مايو", donations: 130000, expenses: 100000 },
  { name: "يونيو", donations: 210000, expenses: 125000 },
];

export function MonthlyChart() {
  const { currency, formatAmount } = useCurrency();

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.5} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: 'currentColor', opacity: 0.7 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `${value / 1000}k`}
            tick={{ fill: 'currentColor', opacity: 0.7 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', direction: 'rtl' }}
            formatter={(value: any) => [formatAmount(Number(value) || 0), '']}
          />
          <Legend />
          <Bar dataKey="donations" name="التبرعات" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" name="المصروفات" fill="#f43f5e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
