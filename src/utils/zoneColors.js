// src/utils/zoneColors.js
// สีประจำกลุ่มย่าน ใช้ซ้ำทั้งแอป (การ์ดกลุ่มย่าน, ป้ายย่านบนการ์ดร้าน, หน้ารายละเอียด)
// ผู้ใช้จะจำได้ว่า "สีฟ้า = ใจกลางเมือง" โดยไม่ต้องอ่านชื่อ
const ZONE_COLORS = {
  zone_group_001: { bg: "var(--zone-central-bg)", fg: "var(--zone-central-fg)" },
  zone_group_002: { bg: "var(--zone-north-bg)", fg: "var(--zone-north-fg)" },
  zone_group_003: { bg: "var(--zone-east-bg)", fg: "var(--zone-east-fg)" },
  zone_group_004: { bg: "var(--zone-west-bg)", fg: "var(--zone-west-fg)" },
};

const FALLBACK = { bg: "var(--color-bg-hero)", fg: "var(--color-pine)" };

export function zoneColor(zoneGroupId) {
  return ZONE_COLORS[zoneGroupId] ?? FALLBACK;
}
