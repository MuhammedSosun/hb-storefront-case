import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBrandFilter, setColorFilter, setSortOrder } from '../store/productSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { items, filters, sortBy } = useSelector((state) => state.products);

  // 1. Dinamik Marka Listesi ve Sayıları Hesapla
  const brands = items.reduce((acc, item) => {
    acc[item.brand] = (acc[item.brand] || 0) + 1;
    return acc;
  }, {});

  // 2. Dinamik Renk Listesi ve Sayıları Hesapla
  const colors = items.reduce((acc, item) => {
    acc[item.color] = (acc[item.color] || 0) + 1;
    return acc;
  }, {});

  const sortOptions = [
    { label: 'En Düşük Fiyat', value: 'lowestPrice' },
    { label: 'En Yüksek Fiyat', value: 'highestPrice' },
    { label: 'En Yeniler (A>Z)', value: 'newest-az' },
    { label: 'En Yeniler (Z>A)', value: 'newest-za' },
  ];

  return (
    <aside className="sidebar">
      {/* Sıralama Bölümü */}
      <div className="filter-section">
        <h3 className="filter-title">Sıralama</h3>
        <ul className="filter-list">
          {sortOptions.map((option) => (
            <li 
              key={option.value}
              className={`filter-item ${sortBy === option.value ? 'active' : ''}`}
              onClick={() => dispatch(setSortOrder(option.value))}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Marka Filtresi */}
      <div className="filter-section">
        <h3 className="filter-title">Marka</h3>
        <ul className="filter-list">
          {Object.entries(brands).map(([brand, count]) => (
            <li 
              key={brand}
              className={`filter-item ${filters.brand === brand ? 'active' : ''}`}
              onClick={() => dispatch(setBrandFilter(brand))}
            >
              {brand} ({count})
            </li>
          ))}
        </ul>
      </div>

      {/* Renk Filtresi */}
      <div className="filter-section">
        <h3 className="filter-title">Renk</h3>
        <ul className="filter-list">
          {Object.entries(colors).map(([color, count]) => (
            <li 
              key={color}
              className={`filter-item ${filters.color === color ? 'active' : ''}`}
              onClick={() => dispatch(setColorFilter(color))}
            >
              {color} ({count})
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;