// src/pages/FavoritesPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import EmptyState from "../components/common/EmptyState";
import FavoriteList from "../components/features/FavoriteList";
import useFavorites from "../hooks/useFavorites";

// favorites เก็บแค่ {cafe_id: true} ไม่มีเวลาที่บันทึก
// จึงเรียงตาม "ล่าสุดที่บันทึก" ไม่ได้
const SORT_OPTIONS = [
  { value: "name", label: "ชื่อร้าน (ก-ฮ)" },
  { value: "price", label: "ราคา (ต่ำ-สูง)" },
  { value: "zone", label: "ย่าน (A-Z)" },
];

function sortCafes(cafes, sortBy) {
  const byName = (a, b) => a.name_th.localeCompare(b.name_th, "th");

  const copy = [...cafes];

  if (sortBy === "price") {
    copy.sort(
      (a, b) =>
        a.price_range.length - b.price_range.length ||
        byName(a, b)
    );
  } else if (sortBy === "zone") {
    copy.sort(
      (a, b) =>
        a.zone.localeCompare(b.zone) ||
        byName(a, b)
    );
  } else {
    copy.sort(byName);
  }

  return copy;
}

export default function FavoritesPage() {
  const navigate = useNavigate();

  const {
    favorites,
    status,
    reload,
    removeFromList,
  } = useFavorites();

  const [sortBy, setSortBy] = useState("name");

  const sorted = sortCafes(favorites, sortBy);

  return (
    <div>
      <Navbar />

      <div className="page-pad">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 500,
                margin: 0,
              }}
            >
              <span style={{ color: "var(--color-danger)" }}>
                ♥
              </span>{" "}
              รายการโปรด
            </h1>

            {status === "ready" && (
              <p
                style={{
                  fontSize: 13,
                  color: "var(--color-text-secondary)",
                  margin: "4px 0 0",
                }}
              >
                ร้านคาเฟ่ที่คุณบันทึกไว้ {favorites.length} ร้าน
              </p>
            )}
          </div>

          {/* Sort */}
          {status === "ready" && favorites.length > 0 && (
            <label
              style={{
                fontSize: 13,
                color: "var(--color-text-secondary)",
              }}
            >
              เรียงตาม{" "}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-control)",
                  padding: "6px 8px",
                  fontSize: 13,
                  fontFamily: "inherit",
                  color: "#333",
                  backgroundColor: "#fff",
                  colorScheme: "light",
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="card-grid">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: 150,
                  background: "var(--color-bg-thumb)",
                  borderRadius: "var(--radius-card)",
                }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div
            style={{
              textAlign: "center",
              padding: 60,
            }}
          >
            <p
              style={{
                color: "var(--color-danger)",
                marginBottom: 16,
              }}
            >
              ไม่สามารถโหลดรายการโปรดได้ กรุณาลองใหม่
            </p>

            <button
              onClick={reload}
              style={{
                padding: "8px 20px",
                cursor: "pointer",
                color: "#333",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 8,
              }}
            >
              ลองอีกครั้ง
            </button>
          </div>
        )}

        {/* Empty */}
        {status === "ready" && favorites.length === 0 && (
          <EmptyState
            message="ยังไม่มีร้านในรายการโปรด กดปุ่มรูปหัวใจที่ร้านคาเฟ่ที่คุณชื่นชอบเพื่อบันทึกไว้ที่นี่"
            actionLabel="ค้นหาร้านคาเฟ่เพิ่มเติม"
            onAction={() => navigate("/cafes")}
          />
        )}

        {/* Favorite List */}
        {status === "ready" && favorites.length > 0 && (
          <>
            <FavoriteList
              cafes={sorted}
              onRemove={removeFromList}
            />

            {/* ปุ่มกลับไปค้นหาร้านคาเฟ่ */}
            <div
              style={{
                textAlign: "center",
                marginTop: 24,
                marginBottom: 24,
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/cafes")}
                style={{
                  border: "1px solid #ddd",
                  backgroundColor: "#ffffff",
                  color: "#333333",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  fontWeight: 500,
                  cursor: "pointer",
                  WebkitTextFillColor: "#333333",
                  opacity: 1,
                }}
              >
                ค้นหาร้านคาเฟ่เพิ่มเติม
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}