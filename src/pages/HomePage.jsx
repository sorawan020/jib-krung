// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ItemCard from "../components/common/ItemCard";
import ZoneGroupCard from "../components/features/ZoneGroupCard";
import logo from "../assets/logo.svg";
import { getAllCafes, getAllZoneGroups } from "../services/cafeService";

export default function HomePage() {
  const [cafes, setCafes] = useState([]);
  const [zoneGroups, setZoneGroups] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([getAllCafes(), getAllZoneGroups()])
      .then(([cafeData, zoneData]) => {
        setCafes(cafeData);
        setZoneGroups(zoneData);
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  const recommended = cafes.filter((c) => c.is_recommended).slice(0, 4);

  function cafeCountInZone(zoneGroupId) {
    return cafes.filter((c) => c.zone_group_id === zoneGroupId).length;
  }

  return (
    <div>
      <Navbar />

      <div className="hero-grid" style={{ padding: "48px 24px", background: "var(--color-pine)" }}>
        <div style={{ maxWidth: 520 }}>
          <h1 style={{ margin: "0 0 14px", fontSize: 34, fontWeight: 700, lineHeight: 1.25, color: "#ffffff" }}>
            ค้นหาคาเฟ่ในกรุงเทพฯ ที่ใช่สำหรับคุณ
          </h1>
          <p style={{ fontSize: 15, color: "#d5e3df", margin: "0 0 24px", lineHeight: 1.6 }}>
            รวมร้านคาเฟ่บรรยากาศดี คัดมาแล้วครบทุกย่านในกรุงเทพฯ ค้นหาและกรองตามย่าน
            ช่วงราคา หรือสิ่งอำนวยความสะดวกที่ต้องการได้ทันที
          </p>
          <button
            className="btn-accent"
            onClick={() => navigate("/cafes")}
            style={{ padding: "12px 28px", fontSize: 15 }}
          >
            ค้นหาคาเฟ่
          </button>
        </div>

        <div style={{ textAlign: "center", justifySelf: "center" }}>
          <img
            src={logo}
            alt="จิบกรุง Jib Krung"
            width="200"
            height="200"
            style={{ display: "block", maxWidth: "100%", height: "auto", transform: "rotate(-4deg)" }}
          />
          <p
            style={{
              display: "inline-block",
              margin: "12px 0 0",
              background: "var(--color-accent)",
              color: "var(--color-pine)",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 999,
              padding: "4px 14px",
            }}
          >
            {cafes.length || 30} ร้านกาแฟทั่วกรุงเทพฯ
          </p>
        </div>
      </div>

      {status === "error" && (
        <p style={{ textAlign: "center", padding: 40, color: "var(--color-danger)" }}>
          ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่
        </p>
      )}

      {status === "loading" && (
        <p style={{ textAlign: "center", padding: 40, color: "var(--color-text-muted)" }}>
          กำลังโหลดข้อมูล...
        </p>
      )}

      {status === "ready" && (
        <>
          <div style={{ padding: "28px 20px 8px" }}>
            <h2 style={{ margin: "0 0 14px", fontSize: 20, fontWeight: 700 }}>เลือกตามย่าน</h2>
            <div className="zone-grid">
              {zoneGroups.map((zg) => (
                <ZoneGroupCard key={zg.id} zoneGroup={zg} cafeCount={cafeCountInZone(zg.id)} />
              ))}
            </div>
          </div>

          {recommended.length > 0 && (
            <div style={{ padding: "20px 20px 28px" }}>
              <h2 style={{ margin: "0 0 14px", fontSize: 20, fontWeight: 700 }}>ร้านแนะนำสำหรับคุณ</h2>
              <div className="card-grid">
                {recommended.map((cafe) => (
                  <ItemCard key={cafe.id} cafe={cafe} showRecommended={false} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
