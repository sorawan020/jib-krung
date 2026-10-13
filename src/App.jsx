// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CafeListPage from "./pages/CafeListPage";
import CafeDetailPage from "./pages/CafeDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import "./styles/theme.css";

// ตารางเส้นทางตามหัวข้อ 4.5 ของรายงานงานที่ 5
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cafes" element={<CafeListPage />} />
        <Route path="/cafes/:cafeId" element={<CafeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
