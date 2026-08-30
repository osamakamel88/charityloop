import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/providers";
import Link from "next/link";
import { Heart, ExternalLink } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 flex flex-col justify-between">
            <div>{children}</div>

            {/* Dashboard Footer */}
            <footer className="mt-8 pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
              <p>© {new Date().getFullYear()} CharityLoop. جميع الحقوق محفوظة.</p>
              <div className="flex items-center gap-1.5 font-medium" dir="ltr">
                <span className="text-gray-500">Developed & Designed by</span>
                <a
                  href="https://www.linkedin.com/in/osama-kamel-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline transition-colors"
                >
                  Recode Developments
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </Providers>
  );
}
