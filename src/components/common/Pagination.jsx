// src/components/common/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="เปลี่ยนหน้า" style={{ display: "flex", justifyContent: "center", gap: 8, padding: "24px 0" }}>
      {pages.map((p) => {
        const active = p === currentPage;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={active ? "page" : undefined}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: active ? "none" : "1px solid var(--color-border)",
              background: active ? "var(--color-pine)" : "var(--color-bg-card)",
              color: active ? "#ffffff" : "var(--color-text-secondary)",
              fontWeight: active ? 700 : 500,
              fontSize: 14,
            }}
          >
            {p}
          </button>
        );
      })}
    </nav>
  );
}
