import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const [cartItemsCount, setCartItemsCount] = useState(totalQuantity);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart animation effect
  useEffect(() => {
    if (totalQuantity > cartItemsCount) {
      setIsCartUpdated(true);
      const timer = setTimeout(() => setIsCartUpdated(false), 1000);
      return () => clearTimeout(timer);
    }
    setCartItemsCount(totalQuantity);
  }, [totalQuantity]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "All Products" },
    { to: "/categories/electronics", label: "Electronics" },
    { to: "/categories/clothing", label: "Clothing" },
    { to: "/categories/books", label: "Books" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-700 hover:text-indigo-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars className="text-xl" />
        </button>

        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          Shopkart
        </Link>
        
        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
              aria-label="Search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        
        {/* Navigation Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/search" className="text-gray-700 hover:text-indigo-600">
            <FaSearch className="text-lg" />
          </Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-indigo-600">
            <FaShoppingCart className="text-xl" />
            {cartItemsCount > 0 && (
              <span className={`absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transition-transform ${isCartUpdated ? 'scale-125' : 'scale-100'}`}>
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>

        {currentUser ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaUserCircle className="text-xl text-indigo-600" />
              </div>
              <span className="hidden md:inline">{currentUser.name}</span>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-gray-500 text-xs">{currentUser.email}</div>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
          >
            <FaUser className="text-lg" />
            <span className="hidden md:inline">Sign In</span>
          </Link>
        )}
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-50/80 backdrop-blur-sm py-2 border-t">
        <div className="container mx-auto px-4">
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-white py-2 px-4 space-y-2 border-t">
              {/* Mobile Search */}
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <FaSearch />
                </button>
              </div>
              
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block py-2 px-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      
      {/* Add padding to the top of the page to account for fixed navbar */}
      <div className="h-24"></div>
    </>
  );
};

export default Navbar;
