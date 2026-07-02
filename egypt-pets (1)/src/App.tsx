import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { Product, CartItem, Order } from './types';
import { PRODUCTS } from './data';

import Header from './components/Header';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function App() {
  // Navigation Router state
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('egyptpets_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state (array of product IDs)
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('egyptpets_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Order confirmation state
  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('egyptpets_last_order');
    return saved ? JSON.parse(saved) : null;
  });

  // Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Synchronize state with local storage
  useEffect(() => {
    localStorage.setItem('egyptpets_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('egyptpets_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem('egyptpets_last_order', JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem('egyptpets_last_order');
    }
  }, [lastOrder]);

  // Toast dispatch handler
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    // Self-destruct toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        showToast(`Updated "${product.name}" quantity in your cart!`, 'info');
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }
      showToast(`Added "${product.name}" to your cart!`, 'success');
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      showToast(`Removed "${item.product.name}" from your cart.`, 'info');
    }
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setWishlist((prevWishlist) => {
      const isLoved = prevWishlist.includes(productId);
      if (isLoved) {
        showToast(`Removed "${product.name}" from your wishlist.`, 'info');
        return prevWishlist.filter((id) => id !== productId);
      } else {
        showToast(`Added "${product.name}" to your wishlist!`, 'success');
        return [...prevWishlist, productId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#1F2937] flex flex-col justify-between font-sans selection:bg-[#F59E0B]/20 selection:text-[#F59E0B]">
      
      {/* Sticky Header Nav */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cart={cart}
        wishlist={wishlist}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentView('shop');
        }}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full bg-white">
        {currentView === 'home' && (
          <Home
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {currentView === 'shop' && (
          <Shop
            currentCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
            setCurrentView={setCurrentView}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {currentView === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            setSelectedProduct={setSelectedProduct}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'checkout' && (
          <Checkout
            cart={cart}
            onClearCart={handleClearCart}
            setCurrentView={setCurrentView}
            setLastOrder={setLastOrder}
          />
        )}

        {currentView === 'thank-you' && (
          <ThankYou
            order={lastOrder}
            setCurrentView={setCurrentView}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentView === 'wishlist' && (
          <Wishlist
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'about' && <AboutUs />}

        {currentView === 'contact' && <Contact />}
      </main>

      {/* Footer Component */}
      <Footer setCurrentView={setCurrentView} setSelectedCategory={setSelectedCategory} />

      {/* Elegant Floating Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start gap-3 text-xs font-semibold animate-slide-in bg-white/95 backdrop-blur-xs transition-all duration-300 ${
              toast.type === 'success'
                ? 'border-emerald-100 text-emerald-800'
                : toast.type === 'error'
                ? 'border-red-100 text-red-800'
                : 'border-blue-100 text-blue-800'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="text-[#10B981] shrink-0 mt-0.5" size={16} />
            ) : toast.type === 'error' ? (
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
            ) : (
              <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
            )}
            
            <div className="flex-1 text-left">
              <p className="leading-tight">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
