import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import './App.css'
import { CartProvider } from './context/CartContext';
import CartDropdown from './components/CartDropdown';

function App() {
  return (

    <Router>
      <CartProvider>
             <CartDropdown />
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>
      </div>
      </CartProvider>
    </Router>

  )
}

export default App