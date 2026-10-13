// src/hooks/useFavorites.js
import { useCallback, useEffect, useState } from "react";
import { getAllCafes } from "../services/cafeService";
import { getFavoriteIds } from "../services/favoriteService";

// โหลดรายการคาเฟ่ที่ถูกบันทึกเป็นรายการโปรด (favorites/{device_id} → cafes)
export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(() => {
    return Promise.all([getFavoriteIds(), getAllCafes()])
      .then(([ids, cafes]) => {
        const idSet = new Set(ids);
        setFavorites(cafes.filter((cafe) => idSet.has(cafe.id)));
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ปุ่ม "ลองอีกครั้ง": ตั้งสถานะกลับเป็น loading แล้วโหลดใหม่ (เกิดจากการกดของผู้ใช้ ไม่ใช่ใน effect)
  const reload = useCallback(() => {
    setStatus("loading");
    load();
  }, [load]);

  // เอาร้านออกจากลิสต์ทันทีที่ผู้ใช้กดหัวใจยกเลิก (ไม่ต้องโหลดใหม่)
  const removeFromList = useCallback((cafeId) => {
    setFavorites((prev) => prev.filter((cafe) => cafe.id !== cafeId));
  }, []);

  return { favorites, status, reload, removeFromList };
}
