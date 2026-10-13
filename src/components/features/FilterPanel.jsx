// src/components/features/FilterPanel.jsx
const FACILITY_OPTIONS = ["Wi-Fi", "ที่จอดรถ", "สวน (garden)"];
// ค่าจริงใน dataset ใช้ "Wi-Fi", "Parking", "Garden" — แผนที่ชื่อไทยที่โชว์ไปยังค่าจริงที่เก็บใน Firebase
const FACILITY_VALUE_MAP = { "Wi-Fi": "Wi-Fi", "ที่จอดรถ": "Parking", "สวน (garden)": "Garden" };

export default function FilterPanel({ zoneGroups, filters, onChange }) {
  function update(patch) {
    onChange({ ...filters, ...patch });
  }

  function toggleFacility(label) {
    const value = FACILITY_VALUE_MAP[label];
    const next = filters.facilities.includes(value)
      ? filters.facilities.filter((f) => f !== value)
      : [...filters.facilities, value];
    update({ facilities: next });
  }

  function clearAll() {
    onChange({ zoneGroupId: "", priceRange: "", facilities: [] });
  }

  const labelStyle = { fontSize: 12, color: "var(--color-text-secondary)", display: "block", margin: "0 0 4px" };
  const controlStyle = {
    width: "100%",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-control)",
    padding: "6px 8px",
    fontSize: 13,
    fontFamily: "inherit",
    marginBottom: 14,
  };

  return (
    <div
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        padding: 16,
        alignSelf: "start",
      }}
    >
      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px", color: "var(--color-pine)" }}>ตัวกรอง</h2>

      <label style={labelStyle}>ย่าน</label>
      <select
        style={controlStyle}
        value={filters.zoneGroupId}
        onChange={(e) => update({ zoneGroupId: e.target.value })}
      >
        <option value="">ทั้งหมด</option>
        {zoneGroups.map((zg) => (
          <option key={zg.id} value={zg.id}>{zg.name_th}</option>
        ))}
      </select>

      <label style={labelStyle}>ช่วงราคา</label>
      <select
        style={controlStyle}
        value={filters.priceRange}
        onChange={(e) => update({ priceRange: e.target.value })}
      >
        <option value="">ทั้งหมด</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
      </select>

      <label style={labelStyle}>สิ่งอำนวยความสะดวก</label>
      <div style={{ marginBottom: 14 }}>
        {FACILITY_OPTIONS.map((label) => (
          <label key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, marginBottom: 6 }}>
            <input
              type="checkbox"
              checked={filters.facilities.includes(FACILITY_VALUE_MAP[label])}
              onChange={() => toggleFacility(label)}
            />
            {label}
          </label>
        ))}
      </div>

      <button
        onClick={clearAll}
        style={{
          width: "100%",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-card)",
          borderRadius: "var(--radius-control)",
          padding: "8px 0",
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        ล้างตัวกรอง
      </button>
    </div>
  );
}
