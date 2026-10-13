// src/components/features/FacilitiesIcons.jsx
// สิ่งอำนวยความสะดวกแสดงเป็นป้ายสี (ฟ้า = Wi-Fi, ทอง = ที่จอดรถ, เขียว = สวน)
const FACILITY_STYLE = {
  "Wi-Fi": { icon: "📶", label: "Wi-Fi", bg: "var(--zone-central-bg)", fg: "var(--zone-central-fg)" },
  Parking: { icon: "🅿️", label: "ที่จอดรถ", bg: "var(--zone-east-bg)", fg: "var(--zone-east-fg)" },
  Garden: { icon: "🌳", label: "สวน", bg: "var(--zone-north-bg)", fg: "var(--zone-north-fg)" },
};

export default function FacilitiesIcons({ facilities }) {
  if (!facilities || facilities.length === 0) {
    return <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>ไม่มีข้อมูลสิ่งอำนวยความสะดวก</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {facilities.map((f) => {
        const style = FACILITY_STYLE[f];
        return (
          <span
            key={f}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              borderRadius: 999,
              padding: "5px 12px",
              background: style?.bg ?? "var(--color-bg-hero)",
              color: style?.fg ?? "var(--color-pine)",
            }}
          >
            <span aria-hidden="true">{style?.icon ?? "•"}</span>
            {style?.label ?? f}
          </span>
        );
      })}
    </div>
  );
}
