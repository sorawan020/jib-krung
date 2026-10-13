// src/pages/CafeListPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import ItemCard from "../components/common/ItemCard";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";
import FilterPanel from "../components/features/FilterPanel";
import { getAllCafes, getAllZoneGroups } from "../services/cafeService";

const PER_PAGE = 8;

export default function CafeListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allCafes, setAllCafes] = useState([]);
  const [zoneGroups, setZoneGroups] = useState([]);
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    zoneGroupId: searchParams.get("zone_group_id") || "",
    priceRange: "",
    facilities: [],
  });

  const keyword = searchParams.get("q") || "";

  useEffect(() => {
    Promise.all([getAllCafes(), getAllZoneGroups()])
      .then(([cafeData, zoneData]) => {
        setAllCafes(cafeData);
        setZoneGroups(zoneData);
        setStatus("ready");
      })
      .catch((err) => {
        console.error(err);
        setStatus("error");
      });
  }, []);

  // เปลี่ยนตัวกรองแล้วกลับไปหน้า 1 เสมอ กันโชว์หน้าว่างตอนผลลัพธ์น้อยลง
  const filterKey = JSON.stringify([filters, keyword]);
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  function handleFilterChange(next) {
    setFilters(next);
    if (next.zoneGroupId) setSearchParams({ zone_group_id: next.zoneGroupId });
    else setSearchParams({});
  }

  const filtered = allCafes.filter((cafe) => {
    if (filters.zoneGroupId && cafe.zone_group_id !== filters.zoneGroupId) return false;
    if (filters.priceRange && cafe.price_range !== filters.priceRange) return false;
    if (filters.facilities.length > 0) {
      const hasAll = filters.facilities.every((f) => cafe.facilities?.includes(f));
      if (!hasAll) return false;
    }
    if (keyword) {
      const text = `${cafe.name_th} ${cafe.name_en} ${cafe.zone}`.toLowerCase();
      if (!text.includes(keyword.toLowerCase())) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <Navbar />
      <div className="page-pad list-layout">
        <FilterPanel zoneGroups={zoneGroups} filters={filters} onChange={handleFilterChange} />

        <div>
          {status === "loading" && <p style={{ color: "var(--color-text-muted)" }}>กำลังโหลดข้อมูล...</p>}
          {status === "error" && (
            <p style={{ color: "var(--color-danger)" }}>เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง</p>
          )}

          {status === "ready" && (
            <>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-pine)", margin: "0 0 14px" }}>
                พบ {filtered.length} ร้าน
              </p>

              {filtered.length === 0 ? (
                <EmptyState
                  message="ไม่พบร้านคาเฟ่ที่ตรงกับเงื่อนไข ลองปรับตัวกรองใหม่"
                  actionLabel="ล้างตัวกรอง"
                  onAction={() => handleFilterChange({ zoneGroupId: "", priceRange: "", facilities: [] })}
                />
              ) : (
                <>
                  <div className="card-grid">
                    {pageItems.map((cafe) => (
                      <ItemCard key={cafe.id} cafe={cafe} />
                    ))}
                  </div>
                  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
