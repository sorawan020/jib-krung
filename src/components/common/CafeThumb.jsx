// src/components/common/CafeThumb.jsx
// รูปปกของร้าน (image_thumbnail 400x300) เติมเต็มกรอบด้วย object-fit
// ถ้าไฟล์โหลดไม่ได้ จะกลับไปแสดงไอคอนแก้วกาแฟแทน ไม่ให้เป็นกรอบว่างหรือรูปแตก
import { useState } from "react";
import CupIcon from "./CupIcon";
import { thumbnailUrl } from "../../utils/imageUrl";

export default function CafeThumb({ fileName, alt = "", iconSize = 28 }) {
  const [failed, setFailed] = useState(false);

  if (!fileName || failed) {
    return <CupIcon size={iconSize} color="var(--color-pine-soft)" />;
  }

  return (
    <img
      src={thumbnailUrl(fileName)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
