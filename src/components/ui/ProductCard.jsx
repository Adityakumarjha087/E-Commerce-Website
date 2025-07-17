import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const { id, name, price, image, category, rating } = product;

  return (
    <motion.div
      className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 h-64">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Quick Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                className="bg-white rounded-full p-2 shadow-lg hover:bg-indigo-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <FaHeart 
                  className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-600'}`} 
                />
              </motion.button>
              <motion.button
                className="bg-white rounded-full p-2 shadow-lg hover:bg-indigo-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product)}
              >
                <FaShoppingCart className="text-indigo-600 text-lg" />
              </motion.button>
              <motion.button
                className="bg-white rounded-full p-2 shadow-lg hover:bg-indigo-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/product/${id}`)}
              >
                <FaEye className="text-indigo-600 text-lg" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm text-gray-500">{category}</span>
            <h3 className="font-semibold text-gray-900 mt-1">{name}</h3>
          </div>
          <div className="text-right">
            {product.originalPrice > price && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-indigo-600">${price.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100)})</span>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <motion.div 
        className="px-4 pb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button 
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
          onClick={() => onAddToCart(product)}
        >
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
