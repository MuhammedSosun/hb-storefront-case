import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { setCurrentPage } from '../store/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  
  // Redux'tan gerekli state'leri çekiyoruz
  const { filteredItems, currentPage, itemsPerPage } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  // --- SAYFALAMA MANTIĞI ---
  const indexOfLastItem = currentPage * itemsPerPage; // Örn: 1 * 12 = 12
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Örn: 12 - 12 = 0
  
  // Sadece o sayfadaki ürünleri al (0 ile 12 arası, 12 ile 24 arası vb.)
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Toplam kaç sayfa olacak? (40 ürün / 12 = 4 sayfa)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Sepet kontrolü fonksiyonu
  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <div className="product-list-wrapper">
      <div className="product-grid">
        {currentItems.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-info">
  <h3 className="product-title" title={product.name}>{product.name}</h3>
  
  <div className="product-details">
    <div className="detail-item"><strong>Marka:</strong> {product.brand}</div>
    <div className="detail-item"><strong>Renk:</strong> {product.color}</div>
  </div>

  <div className="price-area">
    {/* İndirim Alanı Artık Fiyatın Hemen Üstünde */}
    {product.originalPrice && (
      <div className="discount-container">
        <span className="old-price">{product.originalPrice} TL</span>
        <span className="discount-badge">%{product.discount}</span>
      </div>
    )}
    <span className="current-price">{product.price} TL</span>
  </div>
  
  <button 
    className={`add-to-cart-btn ${isInCart(product.id) ? 'disabled' : ''}`}
    disabled={isInCart(product.id)}
    onClick={() => dispatch(addToCart(product))}
  >
    {isInCart(product.id) ? 'Bu ürünü sepete ekleyemezsiniz' : 'Sepete Ekle'}
  </button>
</div>
          </div>
        ))}
      </div>

      {/* --- SAYFALAMA UI (NUMARALAR) --- */}
      {totalPages > 1 && (
        <div className="pagination">
          {/* Geri Butonu (Opsiyonel) */}
          <button 
            className="page-nav" 
            disabled={currentPage === 1}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            &lt;
          </button>

          {/* Sayfa Numaraları */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i + 1} 
              className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => dispatch(setCurrentPage(i + 1))}
            >
              {i + 1}
            </button>
          ))}

          {/* İleri Butonu (Opsiyonel) */}
          <button 
            className="page-nav" 
            disabled={currentPage === totalPages}
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;