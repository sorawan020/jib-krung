// src/components/common/CupIcon.jsx
// ไอคอนแก้วกาแฟเส้น ใช้แทนรูปจริงตรงที่ยังไม่มีรูปถ่าย และในจุดว่าง (empty state)
// วาดในสไตล์เดียวกับไอคอนโลโก้/โซน เพื่อความสม่ำเสมอของภาษาภาพทั้งแอป
export default function CupIcon({ size = 26, color = "var(--color-pine)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 9h11a3 3 0 0 1 0 6h-1" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 9v6a4 4 0 0 0 4 4h2a4 4 0 0 0 4-4V9" stroke={color} strokeWidth="1.4" />
      <path d="M8 5.5c0 1-1 1-1 2" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M12 5.5c0 1-1 1-1 2" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}
