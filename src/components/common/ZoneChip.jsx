// src/components/common/ZoneChip.jsx
// ป้ายชื่อย่านที่ลงสีตามกลุ่มย่านของร้าน
import { zoneColor } from "../../utils/zoneColors";

export default function ZoneChip({ zone, zoneGroupId, size = "md" }) {
  if (!zone) return null;
  const { bg, fg } = zoneColor(zoneGroupId);
  const small = size === "sm";

  return (
    <span
      style={{
        display: "inline-block",
        maxWidth: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        background: bg,
        color: fg,
        fontSize: small ? 11 : 12,
        fontWeight: 600,
        borderRadius: 999,
        padding: small ? "1px 8px" : "2px 10px",
      }}
    >
      {zone}
    </span>
  );
}
