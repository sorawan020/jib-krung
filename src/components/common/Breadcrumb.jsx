// src/components/common/Breadcrumb.jsx
import { Link } from "react-router-dom";

export default function Breadcrumb({ zone, cafeName }) {
  return (
    <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "0 0 14px" }}>
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>หน้าแรก</Link>
      {" › "}
      <Link to={`/cafes`} style={{ color: "inherit", textDecoration: "none" }}>{zone}</Link>
      {" › "}
      {cafeName}
    </p>
  );
}
