import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';

const footerLinks = {
  shop: [
    { name: 'All Products', path: '/shop' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Best Sellers', path: '/best-sellers' },
    { name: 'Sale', path: '/sale' },
  ],
  customerService: [
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Shipping & Returns', path: '/shipping-returns' },
    { name: 'Track Order', path: '/track-order' },
  ],
  about: [
    { name: 'Our Story', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press', path: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookie-policy' },
    { name: 'Accessibility', path: '/accessibility' },
  ]
};

const EnhancedFooter = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Show/hide scroll to top button based on scroll position
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log('Subscribed with:', email);
      setIsSubscribed(true);
      setEmail('');
      // Reset subscription message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates, exclusive offers, and more.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
            {isSubscribed && (
              <motion.p 
                className="mt-2 text-green-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thanks for subscribing!
              </motion.p>
            )}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FaFacebook className="h-5 w-5" />, url: '#' },
                  { icon: <FaTwitter className="h-5 w-5" />, url: '#' },
                  { icon: <FaInstagram className="h-5 w-5" />, url: '#' },
                  { icon: <FaLinkedin className="h-5 w-5" />, url: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Follow us on ${social.icon.type.displayName}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="mt-6 md:mt-0">
              <button
                className="flex justify-between items-center w-full md:block text-left font-medium text-white mb-4"
                onClick={() => toggleSection(section)}
              >
                {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                <span className="md:hidden">
                  {expandedSection === section ? '−' : '+'}
                </span>
              </button>
              <motion.ul
                className={`space-y-2 ${expandedSection === section ? 'block' : 'hidden md:block'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: expandedSection === section || window.innerWidth >= 768 ? 1 : 0,
                  height: expandedSection === section || window.innerWidth >= 768 ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay].map((Icon, index) => (
              <motion.div 
                key={index}
                className="text-2xl text-gray-400 hover:text-white transition-colors duration-200"
                whileHover={{ y: -2 }}
              >
                <Icon />
              </motion.div>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Terms & Conditions
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-indigo-600 text-white p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05, backgroundColor: '#4F46E5' }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default EnhancedFooter;
