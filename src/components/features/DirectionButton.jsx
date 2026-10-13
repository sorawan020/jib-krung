// src/components/features/DirectionButton.jsx
export default function DirectionButton({ latitude, longitude }) {
  function openDirections() {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      onClick={openDirections}
      className="btn-primary"
      style={{ padding: "10px 22px", fontSize: 14 }}
    >
      ขอเส้นทาง
    </button>
  );
}
