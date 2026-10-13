// src/components/common/EmptyState.jsx
import CupIcon from "./CupIcon";

export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--color-text-muted)" }}>
      <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
        <CupIcon size={34} color="var(--color-text-muted)" />
      </div>
      <p style={{ fontSize: 14, margin: "0 0 16px" }}>{message}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="btn-primary"
          style={{ padding: "9px 22px", fontSize: 13 }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
