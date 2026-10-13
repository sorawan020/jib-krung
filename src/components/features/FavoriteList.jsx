// src/components/features/FavoriteList.jsx
import ItemCard from "../common/ItemCard";

export default function FavoriteList({ cafes, onRemove }) {
  return (
    <div className="card-grid">
      {cafes.map((cafe) => (
        <ItemCard
          key={cafe.id}
          cafe={cafe}
          initialFavorite={true}
          onFavoriteChange={(cafeId, isNowFavorite) => {
            if (!isNowFavorite) onRemove(cafeId);
          }}
        />
      ))}
    </div>
  );
}
