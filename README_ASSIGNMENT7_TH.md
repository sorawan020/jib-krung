# จิบกรุง (Jib Krung) — งานที่ 7

เว็บแอปพลิเคชันแนะนำคาเฟ่ในกรุงเทพฯ พัฒนาด้วย React + Vite และ Firebase Realtime Database

## ฟังก์ชันที่มีใน Source Code
- หน้าแรก แสดงกลุ่มย่านและร้านคาเฟ่แนะนำ
- หน้ารวมคาเฟ่ พร้อมค้นหา/กรองตามย่าน ราคา และสิ่งอำนวยความสะดวก
- หน้ารายละเอียดคาเฟ่ พร้อมแกลเลอรี ข้อมูลร้าน แผนที่/ปุ่มนำทาง และร้านที่เกี่ยวข้อง
- รายการโปรด
- แสดงสถานะกำลังโหลด ข้อผิดพลาด และกรณีไม่พบข้อมูล
- React Router สำหรับเส้นทาง `/`, `/cafes`, `/cafes/:cafeId`, `/favorites`
- รองรับหน้าจอหลายขนาดผ่าน CSS ที่มีอยู่ในโครงการ

## 1. ติดตั้งและเปิดโครงการ
ต้องติดตั้ง Node.js รุ่นที่รองรับ Vite ในเครื่องก่อน จากนั้นเปิด Terminal ในโฟลเดอร์ `jib-krung` แล้วรัน:

```bash
npm install
npm run dev
```

เปิด URL ที่ Vite แสดงใน Terminal (โดยทั่วไปคือ `http://localhost:5173`)

## 2. ตั้งค่า Firebase Realtime Database
1. เปิด Firebase Console แล้วเลือกโปรเจกต์ `csd3202-jib-krung` หรือโปรเจกต์ของกลุ่ม
2. ไปที่ Realtime Database แล้วตรวจสอบ URL ให้ตรงกับ `src/firebase/firebaseConfig.js`
3. เปิดเมนู Realtime Database > Data แล้วเลือกเมนู Import JSON
4. นำเข้าไฟล์ `bangkok_cafe_firebase.json` ที่อยู่ในโฟลเดอร์รากของโครงการ
5. ตรวจสอบว่ามี node `zone_groups`, `cafes`, `favorites`
6. หากใช้โปรเจกต์ใหม่ ให้เปลี่ยนค่าใน `src/firebase/firebaseConfig.js` เป็นค่าจาก Firebase Console ของโปรเจกต์นั้น

**สำคัญ:** อย่าใช้ Rules ที่อนุญาตให้ทุกคนเขียนข้อมูลในระบบจริง ไฟล์ `database.rules.example.json` เป็นตัวอย่างสำหรับทดสอบเท่านั้น เพราะระบบรายการโปรดปัจจุบันใช้ `device_001` แบบไม่มีระบบล็อกอิน ควรปรับ Rules ให้เหมาะสมก่อนเผยแพร่จริง และห้ามนำข้อมูลลับ/Service Account key ขึ้น GitHub

## 3. ตรวจสอบระบบ
- หน้าแรก `/`: ตรวจสอบกลุ่มย่านและร้านแนะนำ
- หน้ารวม `/cafes`: ค้นหาชื่อร้าน และลองกรองย่าน/ช่วงราคา/สิ่งอำนวยความสะดวก
- หน้ารายละเอียด `/cafes/cafe_001`: ตรวจสอบรายละเอียดและปุ่มต่าง ๆ
- รายการโปรด `/favorites`: กดหัวใจเพื่อเพิ่ม/ลบรายการโปรด
- ทดสอบคำค้นหาที่ไม่มีผลลัพธ์ และทดสอบกรณี Firebase ยังไม่พร้อมใช้งาน

## 4. Build สำหรับเตรียม Deploy
```bash
npm run build
npm run preview
```
หาก build ผ่าน ไฟล์สำหรับเผยแพร่จะอยู่ใน `dist/` ทั้งนี้ต้องตั้งค่า Hosting ให้รองรับ SPA fallback เพื่อให้เปิด URL ของ route ย่อยได้โดยตรง

## 5. Git และ GitHub
```bash
git init
git add .
git commit -m "Prepare Jib Krung web application"
git branch -M main
git remote add origin <URL-ของ-GitHub-Repository>
git push -u origin main
```
ก่อน push ให้ตรวจสอบว่าไม่มี `.env`, Service Account key หรือข้อมูลส่วนตัว

## 6. ขอบเขตที่ยังต้องทำก่อนส่งจริง
- ผู้จัดทำต้องทดสอบ `npm install` และ `npm run build` บนเครื่องจริง
- ตรวจสอบ Firebase URL และ Database Rules ใน Console
- Deploy ไป Firebase Hosting หรือบริการ Hosting อื่น แล้วทดสอบ URL สาธารณะ
- เพิ่ม URL GitHub/เว็บไซต์จริงในรายงาน
- บันทึกวิดีโอสาธิตและทำสไลด์นำเสนอ
