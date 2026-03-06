import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { mockProducts } from './mock/products';
import { setProducts } from './store/productSlice';
import Header from './components/Header'; // Header bileşenini sonra oluşturacağız
import ProductList from './layout/ProductList';
import Sidebar from './layout/Sidebar';
import './styles/variables.css';
import './styles/layout.css';
import './styles/header.css';
import './styles/products.css';
import './styles/components.css';
import './styles/sidebar.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. LocalStorage kontrolü
    const localData = localStorage.getItem('products');
    
    let productsToLoad;

    if (!localData) {
      // Eğer veri yoksa mock veriyi yaz
      localStorage.setItem('products', JSON.stringify(mockProducts));
      productsToLoad = mockProducts;
    } else {
      // Varsa olanı kullan
      productsToLoad = JSON.parse(localData);
    }

    // 2. Redux Store'u besle
    dispatch(setProducts(productsToLoad));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="container">
          <div className="layout-grid">
            <aside className="sidebar-area">
              <Sidebar />
            </aside>
            <section className="products-area">
              <ProductList />
            </section>
          </div>
        </div>
      </main>
      
      {/* Modallar buraya gelecek */}
    </div>
  );
}

export default App;