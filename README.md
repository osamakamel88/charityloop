# 💚 CharityLoop — Comprehensive Charity Management System (CMS)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/RTL-Native_Arabic-emerald?style=for-the-badge" alt="RTL Support" />
</p>

---

## 🌟 Overview

**CharityLoop** is a modern, enterprise-grade **Charity Management System (CMS)** built to digitize, streamline, and centralize non-profit operations with total transparency and efficiency.

Designed natively for **Arabic RTL (Right-to-Left)** with the Cairo typography, multi-currency accounting (defaulting to EGP / Egyptian Pound), full document lifecycle verification, and role-based access control.

---

## 🚀 Live Demo & Production

- **🌐 Live Production URL:** [https://charityloop.dezly.vip](https://charityloop.dezly.vip)
- **⚡ Vercel Mirror:** [https://charityloop.vercel.app](https://charityloop.vercel.app)

### 🔑 Demo Credentials
- **Email:** `admin@charityloop.com`
- **Password:** `admin123`

---

## ✨ Key Features & Modules

### 1. 👥 Beneficiaries & Case Management
- **Complete Application Lifecycle:** Track cases from `NEW` (جديد) ➔ `UNDER_REVIEW` (قيد الدراسة) ➔ `APPROVED` (موافق عليه) ➔ `REJECTED` (مرفوض) ➔ `COMPLETED` (منتهي).
- **Document Management & Verification:** Direct upload, preview, and download for National IDs, Medical Reports, Utility/Rent Invoices, and Income certificates.
- **Family & Social Status:** Record family members, monthly income, poverty index, and field search history.

### 2. 💰 Financial Management & Multi-Currency Engine
- **Dynamic Currency Switcher:** Admin can switch base currency (EGP, SAR, AED, KWD, QAR, USD, EUR) with real-time formatting across all balance sheets.
- **Donations Tracking:** Zakat, Sadaqah, Kaffarah, In-kind, and direct bank transfers with automated digital receipts.
- **Expenses & Budgets:** Annual & monthly budget forecasting with real-time burn-rate monitoring.

### 3. 🎯 Seasonal Projects & Sponsorships
- **Project Tracking:** Distribution campaigns (Ramadan food baskets, Winter clothes, School supplies, Adha meat).
- **Orphan & Family Sponsorships:** Monthly recurring stipends and donor-to-beneficiary mapping.

### 4. 🤝 Volunteer Network & Task Scheduling
- Skill matching, availability schedules, logged service hours, and instant appreciation certificate generation.

### 5. 📦 In-Kind Inventory & Warehousing
- Real-time stock levels, item categorization, low-stock warnings, and transaction logs.

### 6. 📊 Analytics & Comprehensive Reports
- Interactive charts (Recharts) visualizing donations vs. expenses, beneficiary categorization, and exportable audit reports.

### 7. 🔐 Security & Role-Based Access Control (RBAC)
- Built with **NextAuth v5** + **bcrypt** password hashing.
- Granular permissions for Admin, General Manager, Social Worker, Auditor, and Volunteer.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **Language:** TypeScript 5
- **Styling & UI:** Tailwind CSS, Radix UI Primitives, Lucide Icons, Cairo Arabic Font
- **Database & ORM:** Prisma ORM with SQLite (embedded) / PostgreSQL ready
- **Authentication:** NextAuth.js v5 with custom credentials provider
- **Charts & Data Visualization:** Recharts
- **Containerization & Deployment:** Docker, Docker Compose, Nginx Reverse Proxy, Vercel

---

## 💻 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/osamakamel88/charityloop.git
cd charityloop

# 2. Install dependencies
npm install

# 3. Setup SQLite database & seed demo data
npx prisma db push
npx tsx prisma/seed.ts

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🐳 Docker Deployment

```bash
docker compose up -d --build
```

---

## 👨‍💻 Developed & Designed by

**Recode Developments** — Crafting high-performance digital solutions.

- **LinkedIn:** [Osama Kamel](https://www.linkedin.com/in/osama-kamel-dev/)
- **GitHub:** [@osamakamel88](https://github.com/osamakamel88)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
