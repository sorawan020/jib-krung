// src/components/features/TabPanel.jsx
import { useState } from "react";
import FacilitiesIcons from "./FacilitiesIcons";

// opening_days ใน dataset เป็นภาษาอังกฤษ ("Everyday", "Tue - Sun", "Mon - Fri" ...) แปลงเป็นไทยเพื่อแสดงผล
const DAY_TH = {
  Mon: "จันทร์",
  Tue: "อังคาร",
  Wed: "พุธ",
  Thu: "พฤหัสบดี",
  Fri: "ศุกร์",
  Sat: "เสาร์",
  Sun: "อาทิตย์",
};

function formatOpeningDays(value = "") {
  const text = value.trim();
  if (text.toLowerCase() === "everyday") return "ทุกวัน";
  return text
    .split(/\s+/)
    .map((token) => DAY_TH[token] ?? token)
    .join(" ");
}

const TABS = [
  { id: "detail", label: "รายละเอียด" },
  { id: "facilities", label: "สิ่งอำนวยความสะดวก" },
  { id: "hours", label: "เวลาเปิด-ปิด" },
];

export default function TabPanel({ cafe }) {
  const [active, setActive] = useState("detail");

  return (
    <div>
      <div style={{ display: "flex", gap: 18, borderBottom: "1px solid var(--color-border)", marginBottom: 14 }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              border: "none",
              background: "none",
              padding: "0 0 10px",
              fontSize: 13,
              fontFamily: "inherit",
              cursor: "pointer",
              color: active === tab.id ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              fontWeight: active === tab.id ? 500 : 400,
              borderBottom: active === tab.id ? "2px solid var(--color-accent)" : "2px solid transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === "detail" && (
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{cafe.description}</p>
      )}
      {active === "facilities" && <FacilitiesIcons facilities={cafe.facilities} />}
      {active === "hours" && (
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
          วันเปิดทำการ: {formatOpeningDays(cafe.opening_days)} · เวลา {cafe.opening_hours}
        </p>
      )}
    </div>
  );
}
