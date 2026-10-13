// src/components/features/FavoriteButton.jsx
import { useEffect, useState } from "react";
import { isFavorite as fetchIsFavorite, setFavorite } from "../../services/favoriteService";

// initialFavorite: ถ้าหน้าที่เรียกใช้รู้สถานะอยู่แล้ว (เช่นหน้า Favorites) ส่งมาได้ จะไม่ต้องอ่าน Firebase ซ้ำ
// onToggle(cafeId, isNowFavorite): แจ้งหน้าแม่เมื่อมีการกดสลับสถานะ
export default function FavoriteButton({ cafeId, style, initialFavorite, onToggle }) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite ?? false);

  useEffect(() => {
    if (initialFavorite !== undefined) return;
    let cancelled = false;
    fetchIsFavorite(cafeId).then((value) => {
      if (!cancelled) setIsFavorite(value);
    });
    return () => {
      cancelled = true;
    };
  }, [cafeId, initialFavorite]);

  async function toggleFavorite(e) {
    e.stopPropagation(); // กันไม่ให้กดแล้วลิงก์ของการ์ดถูกคลิกไปด้วย
    const next = !isFavorite;
    try {
      await setFavorite(cafeId, next);
      setIsFavorite(next);
      onToggle?.(cafeId, next);
    } catch (err) {
      console.error("บันทึกรายการโปรดไม่สำเร็จ", err);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      aria-label={isFavorite ? "ลบออกจากรายการโปรด" : "บันทึกรายการโปรด"}
      style={{
        border: "none",
        background: "rgba(255,255,255,0.9)",
        borderRadius: "50%",
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: isFavorite ? "var(--color-danger)" : "var(--color-text-secondary)",
        ...style,
      }}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}
