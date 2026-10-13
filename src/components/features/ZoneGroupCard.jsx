// src/components/features/ZoneGroupCard.jsx
import { useNavigate } from "react-router-dom";
import { zoneColor } from "../../utils/zoneColors";

// ไอคอนเส้น วาดเองให้สื่อถึงย่านจริงของกรุงเทพฯ แทน emoji ทั่วไป
const ZONE_ICONS = {
  // ใจกลางเมือง: ยอดพระปรางค์ทรงเจดีย์ (แบบวัดอรุณ)
  zone_group_001: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L14 8 L10 8 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 12 L16 12 L15 20 L9 20 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="5" y1="20" x2="19" y2="20" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  // โซนเหนือ: รางรถไฟฟ้า BTS ยกระดับ
  zone_group_002: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="9" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <line x1="7" y1="13" x2="6" y2="20" stroke="currentColor" strokeWidth="1.4" />
      <line x1="17" y1="13" x2="18" y2="20" stroke="currentColor" strokeWidth="1.4" />
      <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  // โซนตะวันออก: พระอาทิตย์ขึ้นเหนือเส้นขอบฟ้า (สุขุมวิทฝั่งตะวันออก)
  zone_group_003: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.4" />
      <line x1="3" y1="19" x2="21" y2="19" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12" y1="4" x2="12" y2="6" stroke="currentColor" strokeWidth="1.4" />
      <line x1="5" y1="8" x2="6.5" y2="9.3" stroke="currentColor" strokeWidth="1.4" />
      <line x1="19" y1="8" x2="17.5" y2="9.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  // ธนบุรี-ตะวันตก: สะพานข้ามแม่น้ำเจ้าพระยา
  zone_group_004: (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path d="M3 16 Q12 7 21 16" stroke="currentColor" strokeWidth="1.4" />
      <line x1="7" y1="16" x2="7" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="17" y1="16" x2="17" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <line x1="3" y1="19" x2="21" y2="19" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
};

export default function ZoneGroupCard({ zoneGroup, cafeCount }) {
  const navigate = useNavigate();
  const { bg, fg } = zoneColor(zoneGroup.id);

  return (
    <div
      className="card-hover"
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/cafes?zone_group_id=${zoneGroup.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter") navigate(`/cafes?zone_group_id=${zoneGroup.id}`);
      }}
      style={{
        background: bg,
        color: fg,
        borderRadius: "var(--radius-card)",
        padding: "20px 12px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>{ZONE_ICONS[zoneGroup.id] ?? null}</div>
      <p style={{ fontSize: 14, fontWeight: 700, margin: "10px 0 2px" }}>{zoneGroup.name_th}</p>
      <p style={{ fontSize: 13, margin: 0 }}>{cafeCount} ร้าน</p>
    </div>
  );
}
