import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setBrandFilter,
  setColorFilter,
  setSortOrder,
} from "../store/productSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { items, filters, sortBy, searchTerm } = useSelector(
    (state) => state.products,
  );

  const brands = items.reduce((acc, item) => {
    acc[item.brand] = (acc[item.brand] || 0) + 1;
    return acc;
  }, {});

  const colors = items.reduce((acc, item) => {
    acc[item.color] = (acc[item.color] || 0) + 1;
    return acc;
  }, {});

  const sortOptions = [
    { label: "En Düşük Fiyat", value: "lowestPrice" },
    { label: "En Yüksek Fiyat", value: "highestPrice" },
    { label: "En Yeniler (A>Z)", value: "newest-az" },
    { label: "En Yeniler (Z>A)", value: "newest-za" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        {searchTerm && searchTerm.trim().length >= 2 && (
          <p className="sidebar-search-text">
            Aranan Kelime: <span>{searchTerm}</span>
          </p>
        )}
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Renk</h3>
        <ul className="filter-list">
          {Object.entries(colors).map(([color, count]) => (
            <li
              key={color}
              className={`filter-item ${filters.color === color ? "active" : ""}`}
              onClick={() => dispatch(setColorFilter(color))}
            >
              {color} ({count})
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Sıralama</h3>
        <ul className="filter-list">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className={`filter-item ${sortBy === option.value ? "active" : ""}`}
              onClick={() => dispatch(setSortOrder(option.value))}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Marka</h3>
        <ul className="filter-list">
          {Object.entries(brands).map(([brand, count]) => (
            <li
              key={brand}
              className={`filter-item ${filters.brand === brand ? "active" : ""}`}
              onClick={() => dispatch(setBrandFilter(brand))}
            >
              {brand} ({count})
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
