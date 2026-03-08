import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { setCurrentPage, setSortOrder } from "../store/productSlice";
import ProductCard from "../components/ProductCard";

const ProductList = () => {
  const dispatch = useDispatch();

  const { filteredItems, currentPage, itemsPerPage, sortBy } = useSelector(
    (state) => state.products,
  );
  const { cartItems } = useSelector((state) => state.cart);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="product-list-wrapper">
      <div className="product-toolbar">
        <div className="toolbar-spacer"></div>

        <select
          className="native-selectbox"
          value={sortBy}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="lowestPrice">En Düşük Fiyat</option>
          <option value="highestPrice">En Yüksek Fiyat</option>
          <option value="newest-az">En Yeniler (A{">"}Z)</option>
          <option value="newest-za">En Yeniler (Z{">"}A)</option>
        </select>
      </div>

      <div className="product-grid">
        {currentItems.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={isInCart(product.id)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-nav"
            disabled={currentPage === 1}
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => dispatch(setCurrentPage(i + 1))}
            >
              {i + 1}
            </button>
          ))}

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
