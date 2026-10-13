// src/services/favoriteService.js
// รวมการอ่าน/เขียน node "favorites" ไว้ที่เดียว ไม่ให้ Component เรียก Firebase ตรงๆ
import { ref, get, set, remove } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

// ยังไม่มีระบบ login จึงใช้ device_id คงที่แทนผู้ใช้ (ตาม Data Dictionary node favorites)
export const DEVICE_ID = "device_001";

// รายการ cafe_id ทั้งหมดที่ถูกบันทึกเป็นรายการโปรด
export async function getFavoriteIds() {
  const snapshot = await get(ref(database, `favorites/${DEVICE_ID}`));
  if (!snapshot.exists()) return [];
  return Object.entries(snapshot.val())
    .filter(([, value]) => value === true)
    .map(([cafeId]) => cafeId);
}

// เช็คว่าร้านนี้ถูกบันทึกไว้หรือยัง
export async function isFavorite(cafeId) {
  const snapshot = await get(ref(database, `favorites/${DEVICE_ID}/${cafeId}`));
  return snapshot.exists() && snapshot.val() === true;
}

// บันทึก (true) หรือลบ (false) รายการโปรด
export async function setFavorite(cafeId, value) {
  const favRef = ref(database, `favorites/${DEVICE_ID}/${cafeId}`);
  if (value) {
    await set(favRef, true);
  } else {
    await remove(favRef);
  }
}
