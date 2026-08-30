import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CharityLoop - نظام إدارة الجمعيات الخيرية",
  description: "منصة متكاملة لإدارة كافة عمليات الجمعية الخيرية بكفاءة وشفافية",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <body className="min-h-full font-cairo antialiased bg-gray-50 text-gray-900">
        {children}
        <Toaster
          position="top-center"
          dir="rtl"
          toastOptions={{
            className: "font-cairo",
          }}
        />
      </body>
    </html>
  );
}
