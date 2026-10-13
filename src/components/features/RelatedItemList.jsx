// src/components/features/RelatedItemList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCafesByZoneGroup } from "../../services/cafeService";
import CafeThumb from "../common/CafeThumb";
import ZoneChip from "../common/ZoneChip";

export default function RelatedItemList({ zoneGroupId, excludeCafeId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // หน้า Detail ถูก remount ทุกครั้งที่เปลี่ยนร้าน (key={cafeId}) จึงเริ่มจาก loading เสมอ
  useEffect(() => {
    let cancelled = false;
    getCafesByZoneGroup(zoneGroupId)
      .then((data) => {
        if (!cancelled) setItems(data.filter((c) => c.id !== excludeCafeId).slice(0, 4));
      })
      .catch((err) => console.error(err)) // โหลดไม่สำเร็จ → ซ่อน section นี้ ไม่ให้ทั้งหน้าพัง
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [zoneGroupId, excludeCafeId]);

  if (loading) return <p style={{ fontSize: 12, color: "var(--color-text-muted)" }}>กำลังโหลด...</p>;
  if (items.length === 0) return null; // ไม่มีร้านย่านเดียวกัน ซ่อน section นี้ทั้งหมด

  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 10px" }}>
        ร้านใกล้เคียงในย่านเดียวกัน
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((cafe) => (
          <div
            key={cafe.id}
            onClick={() => navigate(`/cafes/${cafe.id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-control)",
              padding: 8,
              cursor: "pointer",
            }}
            className="card-hover"
          >
            <div
              style={{
                width: 44,
                height: 44,
                flexShrink: 0,
                borderRadius: 8,
                background: "var(--color-bg-thumb)",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CafeThumb fileName={cafe.image_thumbnail} alt={cafe.name_th} iconSize={20} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, margin: 0 }}>{cafe.name_th}</p>
              {cafe.name_en?.trim() && (
                <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: 0 }}>{cafe.name_en.trim()}</p>
              )}
              <div style={{ marginTop: 3 }}><ZoneChip zone={cafe.zone} zoneGroupId={cafe.zone_group_id} size="sm" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
