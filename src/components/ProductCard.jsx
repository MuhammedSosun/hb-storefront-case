import React from "react";

const ProductCard = ({ product, isInCart, onAddToCart }) => {
  return (
    <div className={`product-card ${isInCart ? "is-disabled" : ""}`}>
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <div className="product-info">
        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        {/* Bilgiler ve Fiyat Alanı */}
        <div className="product-content-wrapper">
          <div className="product-details">
            <div className="detail-item"><strong>Marka:</strong> {product.brand}</div>
            <div className="detail-item"><strong>Renk:</strong> {product.color}</div>
          </div>

          <div className="price-area">
            {product.originalPrice && (
              <div className="discount-container">
                <span className="old-price">{product.originalPrice} TL</span>
                <span className="discount-badge">%{product.discount}</span>
              </div>
            )}
            <span className="current-price">{product.price} TL</span>
          </div>
        </div>

        {/* Hover ile açılacak buton alanı */}
        <div className="cart-action-wrapper">
          <button
            className={`add-to-cart-btn ${isInCart ? "disabled" : ""}`}
            disabled={isInCart}
            onClick={onAddToCart}
          >
            {isInCart ? "Bu ürünü sepete ekleyemezsiniz." : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;