// src/utils/imageUrl.js
// รวม path รูปไว้ที่เดียว: ไฟล์จริงอยู่ที่ public/images/thumbnails และ public/images/details
// ใช้ BASE_URL ของ Vite เพื่อให้ยังทำงานถูกต้องถ้า deploy ไว้ใต้ sub-path (เช่น GitHub Pages)
const BASE = import.meta.env.BASE_URL;

export const thumbnailUrl = (fileName) => `${BASE}images/thumbnails/${fileName}`;
export const detailUrl = (fileName) => `${BASE}images/details/${fileName}`;
