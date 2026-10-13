// src/services/cafeService.js
//
// รวมฟังก์ชันเรียกข้อมูลจาก Firebase Realtime Database ไว้ที่เดียว
// ห้ามเรียก ref()/get() ตรงๆ ใน Component เพื่อให้แก้ไข/ทดสอบง่าย

import { get, ref, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../firebase/firebaseConfig";

// ดึงคาเฟ่ทั้งหมด (ใช้กับหน้า Home / Item List)
export async function getAllCafes() {
  const cafesRef = ref(database, "cafes");
  const snapshot = await get(cafesRef);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.val();
  return Object.entries(data).map(([id, cafe]) => ({
    id,
    ...cafe,
  }));
}

// ดึงคาเฟ่ 1 ร้านตามรหัส (ใช้กับหน้า Item Detail)
export async function getCafeById(cafeId) {
  const cafeRef = ref(database, `cafes/${cafeId}`);
  const snapshot = await get(cafeRef);
  if (!snapshot.exists()) {
    return null;
  }
  return {
    id: snapshot.key,
    ...snapshot.val(),
  };
}

// กรองคาเฟ่ตามกลุ่มย่าน (ใช้กับ F03 ค้นหาและกรอง, F06 แนะนำร้านใกล้เคียง)
// ต้องตั้ง .indexOn "zone_group_id" ใน Security Rules ก่อน ไม่งั้น query จะช้าและ Firebase จะเตือนใน console
export async function getCafesByZoneGroup(zoneGroupId) {
  const cafesRef = ref(database, "cafes");
  const cafesQuery = query(
    cafesRef,
    orderByChild("zone_group_id"),
    equalTo(zoneGroupId)
  );
  const snapshot = await get(cafesQuery);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.val();
  return Object.entries(data).map(([id, cafe]) => ({
    id,
    ...cafe,
  }));
}

// ดึงคาเฟ่ทั้งหมดที่ผู้ใช้เครื่องนี้บันทึกเป็นรายการโปรด (ใช้กับหน้า Favorites)
export async function getFavoriteCafes() {
  const favRef = ref(database, "favorites/device_001");
  const favSnapshot = await get(favRef);
  if (!favSnapshot.exists()) {
    return [];
  }
  const favoriteIds = Object.keys(favSnapshot.val());
  const allCafes = await getAllCafes();
  return allCafes.filter((cafe) => favoriteIds.includes(cafe.id));
}
export async function getAllZoneGroups() {
  const zoneGroupsRef = ref(database, "zone_groups");
  const snapshot = await get(zoneGroupsRef);
  if (!snapshot.exists()) {
    return [];
  }
  const data = snapshot.val();
  return Object.entries(data).map(([id, zoneGroup]) => ({
    id,
    ...zoneGroup,
  }));
}
