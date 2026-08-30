import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for CharityLoop CMS...");

  // 1. Create Default Admin User
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@charityloop.com" },
    update: {},
    create: {
      email: "admin@charityloop.com",
      name: "مدير النظام العام",
      password: hashedPassword,
      role: "ADMIN",
      phone: "0501234567",
      isActive: true,
    },
  });
  console.log("Admin user created:", admin.email);

  // 2. Create Sample Beneficiary
  const beneficiary = await prisma.beneficiary.upsert({
    where: { nationalId: "1098765432" },
    update: {},
    create: {
      nationalId: "1098765432",
      firstName: "محمد",
      lastName: "عبدالله العتيبي",
      phone: "0554321987",
      address: "حي الملز، شارع الجامعة",
      city: "الرياض",
      district: "الملز",
      socialStatus: "MARRIED",
      familyMembers: 6,
      monthlyIncome: 2500,
      needType: "مساعدة مالية وسلة غذائية شهرية",
      category: "POOR_FAMILY",
      status: "APPROVED",
      createdById: admin.id,
    },
  });
  console.log("Sample beneficiary created:", beneficiary.firstName);

  // 3. Create Sample Project
  const project = await prisma.project.create({
    data: {
      name: "مشروع السلة الغذائية الرمضانية 1445هـ",
      type: "SEASONAL",
      season: "RAMADAN",
      status: "ACTIVE",
      budget: 250000,
      spent: 195000,
      beneficiaryCount: 850,
      startDate: new Date("2024-02-15"),
      endDate: new Date("2024-04-10"),
      description: "تأمين وتوزيع 1000 سلة غذائية متكاملة للأسر المحتاجة خلال شهر رمضان المبارك.",
    },
  });
  console.log("Sample project created:", project.name);

  // 4. Create Sample Inventory Item
  const item = await prisma.inventoryItem.create({
    data: {
      name: "سلة غذائية رمضانية متكاملة",
      category: "مواد غذائية",
      unit: "كرتون",
      quantity: 340,
      minQuantity: 50,
      barcode: "87123901283",
      location: "المستودع الرئيسي - قسم أ1",
    },
  });
  console.log("Sample inventory item created:", item.name);

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
