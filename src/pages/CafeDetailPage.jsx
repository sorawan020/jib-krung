// src/pages/CafeDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Breadcrumb from "../components/common/Breadcrumb";
import ImageGallery from "../components/features/ImageGallery";
import FavoriteButton from "../components/features/FavoriteButton";
import ShareButton from "../components/features/ShareButton";
import TabPanel from "../components/features/TabPanel";
import MapView from "../components/features/MapView";
import DirectionButton from "../components/features/DirectionButton";
import RelatedItemList from "../components/features/RelatedItemList";
import ZoneChip from "../components/common/ZoneChip";
import { getCafeById } from "../services/cafeService";

export default function CafeDetailPage() {
  const { cafeId } = useParams();
  // key={cafeId}: เปลี่ยนร้าน (เช่นกดจาก "ร้านใกล้เคียง") แล้วทั้งหน้าจะเริ่มใหม่เอง
  // state จึงกลับเป็น loading โดยไม่ต้อง setState ใน effect
  return <CafeDetailContent key={cafeId} cafeId={cafeId} />;
}

function CafeDetailContent({ cafeId }) {
  const navigate = useNavigate();
  const [cafe, setCafe] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | not_found | error

  useEffect(() => {
    let cancelled = false;
    getCafeById(cafeId)
      .then((data) => {
        if (cancelled) return;
        if (data) {
          setCafe(data);
          setStatus("ready");
        } else {
          setStatus("not_found");
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error(err);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [cafeId]);

  if (status === "loading") {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: "center", padding: 60, color: "var(--color-text-muted)" }}>กำลังโหลดข้อมูลร้าน...</p>
      </div>
    );
  }

  if (status === "not_found") {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: 60 }}>
          <p style={{ marginBottom: 16 }}>ไม่พบร้านคาเฟ่นี้</p>
          <button onClick={() => navigate("/cafes")} style={{ padding: "8px 20px", cursor: "pointer" }}>
            กลับหน้ารายการ
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: 60 }}>
          <p style={{ marginBottom: 16, color: "var(--color-danger)" }}>ไม่สามารถโหลดข้อมูลร้านได้ กรุณาลองใหม่</p>
          <button onClick={() => navigate(-1)} style={{ padding: "8px 20px", cursor: "pointer" }}>
            กลับหน้าก่อนหน้า
          </button>
        </div>
      </div>
    );
  }

  const galleryImages = [cafe.image_detail, ...(cafe.image_gallery || [])];

  return (
    <div>
      <Navbar />
      <div className="page-pad detail-layout">
        <div>
          <Breadcrumb zone={cafe.zone} cafeName={cafe.name_th} />
          <ImageGallery images={galleryImages} altBase={cafe.name_th} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", margin: "16px 0 4px" }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>
                {cafe.name_th}
                {cafe.is_recommended && (
                  <span style={{ fontSize: 11, color: "var(--color-pine)", background: "var(--color-accent)", fontWeight: 700, padding: "2px 10px", borderRadius: 999, marginLeft: 8, verticalAlign: "middle" }}>
                    แนะนำ
                  </span>
                )}
              </h1>
              {cafe.name_en?.trim() && (
                <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: "2px 0 0" }}>
                  {cafe.name_en.trim()}
                </p>
              )}
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "6px 0 0", display: "flex", alignItems: "center", gap: 8 }}>
                <ZoneChip zone={cafe.zone} zoneGroupId={cafe.zone_group_id} />
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-pine)" }}>
                  ช่วงราคา {cafe.price_range}
                </span>
              </p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <FavoriteButton cafeId={cafe.id} style={{ position: "static", background: "var(--color-bg-card)", border: "1px solid var(--color-border)" }} />
              <ShareButton />
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <TabPanel cafe={cafe} />
          </div>

          <div style={{ marginTop: 24 }}>
            <DirectionButton latitude={cafe.latitude} longitude={cafe.longitude} />
          </div>
        </div>

        <div>
          <MapView latitude={cafe.latitude} longitude={cafe.longitude} label={cafe.name_th} />
          <div style={{ marginTop: 16 }}>
            <RelatedItemList zoneGroupId={cafe.zone_group_id} excludeCafeId={cafe.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
