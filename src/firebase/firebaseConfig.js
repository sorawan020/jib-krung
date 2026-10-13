// src/firebase/firebaseConfig.js
//
// ค่าด้านล่างนี้คัดลอกมาจาก Firebase Console > Project settings > Add app > Web
// ของโปรเจกต์ csd3202-jib-krung แล้ว
//
// ⚠️ ต้องแก้ databaseURL ให้เป็นค่าเต็ม (ในภาพโดนตัดท้าย) — กดปุ่ม copy 📋
// ข้างกล่องโค้ดใน Firebase Console เพื่อเอาค่าที่ไม่ถูกตัดมาแทนบรรทัดด้านล่าง
// ควรลงท้ายด้วย .firebasedatabase.app

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCOixGpCAELvhNIZzWfGPmNm1CJKjcdzuQ",
  authDomain: "csd3202-jib-krung.firebaseapp.com",
  databaseURL:
    "https://csd3202-jib-krung-default-rtdb.asia-southeast1.firebasedatabase.app", // ⚠️ ตรวจสอบค่านี้อีกครั้ง อาจถูกตัดท้ายมา
  projectId: "csd3202-jib-krung",
  storageBucket: "csd3202-jib-krung.firebasestorage.app",
  messagingSenderId: "802616855575",
  appId: "1:802616855575:web:7cd4a5fe1a7230bbbd6052",
  // measurementId ไม่จำเป็นต้องใส่ เพราะโปรเจกต์นี้ไม่ได้ใช้ Google Analytics
};

const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
