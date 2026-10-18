// src/components/layout/Navbar.jsx
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function Navbar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  function handleSearchKeyDown(e) {
    if (e.key === "Enter" && keyword.trim()) {
      navigate(`/cafes?q=${encodeURIComponent(keyword.trim())}`);
    }
  }

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px 24px",
        padding: "12px 24px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 18,
          fontWeight: 700,
          color: "var(--color-pine)",
          textDecoration: "none",
          letterSpacing: "-0.01em",
        }}
      >
        <img
          src={logo}
          alt=""
          width="42"
          height="42"
          style={{ display: "block" }}
        />
        จิบกรุง
      </Link>

      <div
        style={{
          display: "flex",
          gap: 20,
          fontSize: 14,
          flex: 1,
        }}
      >
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "nav-link" + (isActive ? " active" : "")
          }
        >
          หน้าแรก
        </NavLink>

        <NavLink
          to="/cafes"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " active" : "")
          }
        >
          คาเฟ่
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " active" : "")
          }
        >
          รายการโปรด
        </NavLink>
      </div>

      {/* ช่องค้นหา */}
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder="ค้นหาชื่อร้าน ย่าน..."
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-control)",
          padding: "8px 12px",
          fontSize: 13,
          flex: "1 1 180px",
          maxWidth: 280,

          // บังคับสีข้อความที่พิมพ์
          color: "#333",
          WebkitTextFillColor: "#333",
          caretColor: "#333",

          // พื้นหลัง
          backgroundColor: "#fff",

          // ป้องกัน browser เปลี่ยนสี input ตาม Dark Mode
          colorScheme: "light",
        }}
      />

      <Link
        to="/favorites"
        aria-label="ดูร้านที่บันทึกไว้"
        style={{
          display: "flex",
          alignItems: "center",
          color: "var(--color-danger)",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 20s-7-4.4-9.5-8.8C.8 8 2.3 4.5 6 4c2-.3 3.6.7 4.9 2.4 1.2-1.7 2.9-2.7 4.9-2.4 3.7.5 5.2 4 3.5 7.2C19 15.6 12 20 12 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      </Link>
    </nav>
  );
}