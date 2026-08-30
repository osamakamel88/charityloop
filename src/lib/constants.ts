export const BENEFICIARY_STATUS_LABELS: Record<string, string> = {
  NEW: 'جديد',
  UNDER_REVIEW: 'قيد الدراسة',
  APPROVED: 'موافق عليه',
  REJECTED: 'مرفوض',
  COMPLETED: 'منتهي',
};

export const BENEFICIARY_STATUS_COLORS: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-800',
  UNDER_REVIEW: 'bg-yellow-100 text-yellow-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
};

export const BENEFICIARY_CATEGORY_LABELS: Record<string, string> = {
  ORPHAN: 'أيتام',
  WIDOW: 'أرامل',
  PATIENT: 'مرضى',
  ELDERLY: 'كبار سن',
  POOR_FAMILY: 'أسر فقيرة',
  STUDENT: 'طلاب',
  OTHER: 'أخرى',
};

export const SOCIAL_STATUS_LABELS: Record<string, string> = {
  SINGLE: 'أعزب',
  MARRIED: 'متزوج',
  DIVORCED: 'مطلق',
  WIDOWED: 'أرمل',
};

export const DONATION_TYPE_LABELS: Record<string, string> = {
  CASH: 'نقدي',
  ZAKAT: 'زكاة',
  SADAQAH: 'صدقة',
  KAFFARAH: 'كفارة',
  IN_KIND: 'عيني',
  OTHER: 'أخرى',
};

export const DONATION_CHANNEL_LABELS: Record<string, string> = {
  BANK: 'حساب بنكي',
  APP: 'تطبيق',
  WEBSITE: 'موقع إلكتروني',
  BOX: 'صندوق',
  DIRECT: 'مباشر',
};

export const EXPENSE_TYPE_LABELS: Record<string, string> = {
  FINANCIAL_AID: 'مساعدات مالية',
  RENT: 'إيجارات',
  MEDICAL: 'علاج',
  PROJECT: 'مشاريع',
  SALARY: 'رواتب',
  UTILITIES: 'فواتير',
  ADMIN: 'إدارية',
  OTHER: 'أخرى',
};

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  SEASONAL: 'موسمي',
  SPONSORSHIP: 'كفالة',
  DISTRIBUTION: 'توزيع',
  TRAINING: 'تدريب',
  OTHER: 'أخرى',
};

export const PROJECT_SEASON_LABELS: Record<string, string> = {
  RAMADAN: 'رمضان',
  WINTER: 'شتاء',
  BACK_TO_SCHOOL: 'العودة للمدارس',
  ADHA: 'أضاحي',
  OTHER: 'أخرى',
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  PLANNED: 'مخطط',
  ACTIVE: 'نشط',
  COMPLETED: 'مكتمل',
  CANCELLED: 'ملغي',
};

export const PROJECT_STATUS_COLORS: Record<string, string> = {
  PLANNED: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-100 text-gray-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export const USER_ROLE_LABELS: Record<string, string> = {
  ADMIN: 'مدير عام',
  MANAGER: 'مدير وحدة',
  EMPLOYEE: 'موظف',
  AUDITOR: 'مدقق',
  VOLUNTEER: 'متطوع',
};

export const VOLUNTEER_SPECIALIZATION_LABELS: Record<string, string> = {
  DISTRIBUTION: 'توزيع مساعدات',
  TRAINING: 'تدريب',
  FIELD_VISITS: 'زيارات ميدانية',
  ADMIN: 'إداري',
  OTHER: 'أخرى',
};

export const INVENTORY_TRANSACTION_TYPE_LABELS: Record<string, string> = {
  IN: 'إدخال',
  OUT: 'صرف',
};

export const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  INFO: 'معلومات',
  WARNING: 'تحذير',
  SUCCESS: 'نجاح',
  ERROR: 'خطأ',
};
