import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaTimes, FaBars } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import AnimatedButton from '../ui/AnimatedButton';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { 
    name: 'Categories', 
    path: '/categories',
    submenu: [
      { name: 'Men', path: '/category/men' },
      { name: 'Women', path: '/category/women' },
      { name: 'Electronics', path: '/category/electronics' },
      { name: 'Accessories', path: '/category/accessories' },
    ]
  },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const EnhancedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-indigo-900 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Free shipping on orders over $50</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">30-day return policy</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-indigo-200 transition-colors">Help</a>
            <a href="#" className="hover:text-indigo-200 transition-colors">Track Order</a>
            <a href="#" className="hover:text-indigo-200 transition-colors">
              <FaUser className="inline mr-1" /> My Account
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 py-4'}`}
        initial={false}
        animate={{ 
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <motion.div 
                className="text-2xl font-bold text-indigo-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ShopEase
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      location.pathname === link.path
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                    onMouseEnter={() => link.submenu && setActiveSubmenu(link.name)}
                  >
                    {link.name}
                    {link.submenu && (
                      <FiChevronDown className="ml-1" />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.submenu && (
                    <motion.div
                      className="absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: activeSubmenu === link.name ? 1 : 0,
                        y: activeSubmenu === link.name ? 0 : 10,
                        pointerEvents: activeSubmenu === link.name ? 'auto' : 'none'
                      }}
                      onMouseLeave={() => setActiveSubmenu(null)}
                    >
                      {link.submenu.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50">
                <FaUser className="h-5 w-5" />
              </button>
              <Link 
                to="/cart" 
                className="relative p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              >
                <FaShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <motion.span 
                    className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={cartItemCount}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
              <AnimatedButton 
                variant="primary" 
                size="sm"
                className="ml-2"
                onClick={() => navigate('/shop')}
              >
                Shop Now
              </AnimatedButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none"
              >
                {isOpen ? (
                  <FaTimes className="block h-6 w-6" />
                ) : (
                  <FaBars className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white border-t border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="px-2 py-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  />
                </div>
                {navLinks.map((link) => (
                  <div key={link.name} className="border-b border-gray-100">
                    <Link
                      to={link.path}
                      className={`block px-3 py-3 text-base font-medium ${
                        location.pathname === link.path
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                      }`}
                      onClick={() => link.submenu && setActiveSubmenu(activeSubmenu === link.name ? null : link.name)}
                    >
                      <div className="flex justify-between items-center">
                        {link.name}
                        {link.submenu && (
                          <FiChevronDown 
                            className={`transform transition-transform ${activeSubmenu === link.name ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </Link>
                    {link.submenu && activeSubmenu === link.name && (
                      <div className="pl-4 py-2 bg-gray-50">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="block px-3 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="px-2 py-4 border-t border-gray-100">
                  <AnimatedButton 
                    variant="primary" 
                    className="w-full flex justify-center"
                    onClick={() => navigate('/shop')}
                  >
                    Shop Now
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default EnhancedNavbar;
