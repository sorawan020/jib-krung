// src/components/features/ImageGallery.jsx
import { useState } from "react";
import { detailUrl } from "../../utils/imageUrl";

// รับรายชื่อไฟล์ (image_detail + image_gallery) แล้วสลับรูปหลักได้
// ไฟล์จริงอยู่ที่ public/images/details (ดู src/utils/imageUrl.js)
export default function ImageGallery({ images, altBase }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div style={{ height: 260, background: "var(--color-bg-thumb)", borderRadius: "var(--radius-card)" }} />
    );
  }

  return (
    <div>
      <div
        style={{
          height: 260,
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          background: "var(--color-bg-thumb)",
          marginBottom: 8,
        }}
      >
        <img
          src={detailUrl(images[activeIndex])}
          alt={`${altBase} รูปที่ ${activeIndex + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>
      {images.length > 1 && (
        <div style={{ display: "flex", gap: 8 }}>
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActiveIndex(i)}
              style={{
                width: 56,
                height: 56,
                padding: 0,
                border: i === activeIndex ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
                background: "var(--color-bg-thumb)",
              }}
            >
              <img
                src={detailUrl(img)}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
