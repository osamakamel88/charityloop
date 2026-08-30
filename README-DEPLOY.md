# دليل تشغيل ملف الـ ZIP على السيرفر (File Manager Deployment Guide)

## 📁 مسار ملف الـ ZIP الجاهز للرفع:
`charityloop-production.zip` (حجم خفيف جداً ~187 KB فقط)

---

## 🚀 خطوات الرفع والتشغيل (3 خطوات بسيطة):

### 1. الرفع والاستخراج (Upload & Extract):
- افتح مدير الملفات (File Manager) في لوحة تحكم السيرفر (cPanel / aaPanel / CloudPanel / CyberPanel / DirectAdmin).
- ادخل إلى مسار موقعك: `/var/www/charityloop` أو مسار النطاق `charityloop.dezly.vip`.
- ارفع ملف `charityloop-production.zip` ثم اضغط عليه بالزر الأيمن واختر **Extract (استخراج)**.

---

### 2. التشغيل على السيرفر (Run):
افتح منفذ الأوامر (SSH / Terminal) في مسار المجلد وشغل أمرًا واحدًا فقط:

#### 🟢 الطريقة الأولى: عبر Docker (الأفضل والأنظف)
```bash
docker compose up -d --build
```

#### 🟢 الطريقة الثانية: عبر Node.js المباشر (PM2)
```bash
npm install
npx prisma db push
npx tsx prisma/seed.ts
npm run build
pm2 start npm --name "charityloop" -- start
```

---

### 3. ربط الدومين وشهادة SSL (Nginx + Let's Encrypt):
```bash
# تفعيل شهادة SSL
sudo certbot --nginx -d charityloop.dezly.vip
```

---

### 🔑 بيانات الدخول الافتراضية:
- **الرابط:** https://charityloop.dezly.vip
- **البريد الإلكتروني:** `admin@charityloop.com`
- **كلمة المرور:** `admin123`
