import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AppContent = () => {
  const location = useLocation();
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Add cart animation handler
  useEffect(() => {
    const handleAddToCart = (e) => {
      if (e.detail?.type === 'ADD_TO_CART') {
        // Add cart animation
        const cartButton = document.getElementById('cart-button');
        if (cartButton) {
          cartButton.classList.add('cart-animate');
          setTimeout(() => {
            cartButton.classList.remove('cart-animate');
          }, 500);
        }
        
        // Show toast notification
        toast.success('Added to cart!', {
          position: 'top-center',
          icon: '🛒',
        });
      }
    };

    window.addEventListener('cartUpdate', handleAddToCart);
    return () => window.removeEventListener('cartUpdate', handleAddToCart);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Toaster position="top-center" />
      <main className="flex-grow pt-24">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/login" element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <PageTransition>
                  <Login />
                </PageTransition>
              )
            } />
            <Route path="/register" element={
              currentUser ? (
                <Navigate to="/" replace />
              ) : (
                <PageTransition>
                  <Register />
                </PageTransition>
              )
            } />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={
                <PageTransition>
                  <Home />
                </PageTransition>
              } />
              <Route path="/products" element={
                <PageTransition>
                  <Products />
                </PageTransition>
              } />
              <Route path="/products/:id" element={
                <PageTransition>
                  <ProductDetails />
                </PageTransition>
              } />
              <Route path="/cart" element={
                <PageTransition>
                  <Cart />
                </PageTransition>
              } />
              <Route path="/checkout" element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              } />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster 
        position="top-center"
        toastOptions={{
          className: 'bg-white shadow-lg rounded-lg px-4 py-3',
          duration: 2000,
          style: {
            border: '1px solid #e5e7eb',
            padding: '16px',
            color: '#1f2937',
          },
        }}
      />
    </div>
  );
}

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
