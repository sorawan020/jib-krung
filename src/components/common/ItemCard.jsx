// src/components/common/ItemCard.jsx
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../features/FavoriteButton";
import CafeThumb from "./CafeThumb";
import ZoneChip from "./ZoneChip";
import { zoneColor } from "../../utils/zoneColors";

// showRecommended: แสดงป้าย "แนะนำ" บนรูป (ปิดได้ในหน้าที่ทุกใบเป็นร้านแนะนำอยู่แล้ว)
export default function ItemCard({ cafe, initialFavorite, onFavoriteChange, showRecommended = true }) {
  const navigate = useNavigate();

  return (
    <div
      className="card-hover"
      onClick={() => navigate(`/cafes/${cafe.id}`)}
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: 130,
          background: zoneColor(cafe.zone_group_id).bg, // เห็นสีย่านแม้รูปยังไม่โหลด/โหลดไม่ได้
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <CafeThumb fileName={cafe.image_thumbnail} alt={cafe.name_th} />
        {showRecommended && cafe.is_recommended && (
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "var(--color-accent)",
              color: "var(--color-pine)",
              fontSize: 11,
              fontWeight: 700,
              borderRadius: 999,
              padding: "2px 9px",
            }}
          >
            ★ แนะนำ
          </span>
        )}
        <FavoriteButton
          cafeId={cafe.id}
          initialFavorite={initialFavorite}
          onToggle={onFavoriteChange}
          style={{ position: "absolute", top: 8, right: 8 }}
        />
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>{cafe.name_th}</p>
        {cafe.name_en?.trim() && (
          <p
            title={cafe.name_en.trim()}
            style={{
              fontSize: 12,
              color: "var(--color-text-secondary)",
              margin: "2px 0 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {cafe.name_en.trim()}
          </p>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginTop: 8 }}>
          <ZoneChip zone={cafe.zone} zoneGroupId={cafe.zone_group_id} size="sm" />
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--color-pine)", flexShrink: 0 }}>
            {cafe.price_range}
          </span>
        </div>
      </div>
    </div>
  );
}
