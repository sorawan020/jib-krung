// src/components/features/ShareButton.jsx
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("คัดลอกลิงก์ไม่สำเร็จ", err);
    }
  }

  return (
    <button
      onClick={handleShare}
      style={{
        border: "1px solid var(--color-border)",
        background: "var(--color-bg-card)",
        borderRadius: "50%",
        width: 34,
        height: 34,
        cursor: "pointer",
        position: "relative",
      }}
      aria-label="แชร์ร้านนี้"
    >
      ⇗
      {copied && (
        <span
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            background: "var(--color-text-primary)",
            color: "#fff",
            fontSize: 11,
            padding: "4px 8px",
            borderRadius: 6,
            whiteSpace: "nowrap",
          }}
        >
          คัดลอกลิงก์แล้ว
        </span>
      )}
    </button>
  );
}
