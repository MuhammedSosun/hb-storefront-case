import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, setSortOrder } from '../store/productSlice';
import { removeFromCart } from '../store/cartSlice';
import Modal from './Modal';

const Header = () => {
  const dispatch = useDispatch();
  
  // 1. totalAmount'ı buradan çekmeyi unutma!
  const { searchTerm, sortBy } = useSelector((state) => state.products);
  const { cartItems, totalAmount } = useSelector((state) => state.cart);

  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Silme modalını açan fonksiyon
  const openDeleteModal = (id) => {
    setSelectedItemId(id);
    setShowModal(true);
    setIsCartOpen(false); // Modal açılınca dropdown kapansın (opsiyonel)
  };

  const confirmDelete = () => {
    dispatch(removeFromCart(selectedItemId));
    setShowModal(false);
    setSelectedItemId(null);
  };

  const sortedCartItems = [...cartItems].sort((a, b) => 
    new Date(b.addedDate) - new Date(a.addedDate)
  );

  return (
    <header className="main-header">
      <div className="container header-content">
        <div className="logo">
          <img src="https://kurumsal.hepsiburada.com/assets/hepsiburada-logo.svg" alt="Logo" width="150" />
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="25 milyondan fazla ürün içerisinde ara" 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="header-right">
          <select 
            className="native-selectbox"
            value={sortBy}
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
          >
            <option value="">Sıralama</option>
            <option value="lowestPrice">En Düşük Fiyat</option>
            <option value="highestPrice">En Yüksek Fiyat</option>
            <option value="newest-az">En Yeniler (A{'>'}Z)</option>
            <option value="newest-za">En Yeniler (Z{'>'}A)</option>
          </select>

          <div 
            className="cart-wrapper"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <button className="cart-button">
              Sepetim ({totalAmount} TL)
              <span className="cart-count">{cartItems.length}</span>
            </button>

            {isCartOpen && cartItems.length > 0 && (
              <div className="cart-dropdown">
                {sortedCartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} width="40" />
                    <div className="cart-item-info">
                      <p>{item.name}</p>
                      <button 
                        className="remove-btn"
                        onClick={() => openDeleteModal(item.id)} // window.confirm yerine kendi modalın
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal'ı map dışında, en dışta bir kez tanımlıyoruz */}
      <Modal 
        isOpen={showModal} 
        onCancel={() => setShowModal(false)} 
        onConfirm={confirmDelete} 
      />
    </header>
  );
};

export default Header;