// src/components/features/MapView.jsx
export default function MapView({ latitude, longitude, label }) {
  const src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <iframe
      title={`แผนที่ ${label}`}
      src={src}
      style={{
        width: "100%",
        height: 160,
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-card)",
      }}
      loading="lazy"
    />
  );
}
