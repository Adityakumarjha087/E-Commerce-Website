import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addToCart } from '../../store/slices/cartSlice';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { triggerAddToCart } from '../../utils/cartUtils';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Dispatch the add to cart action
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    }));
    
    // Trigger the cart animation
    await triggerAddToCart(product);
  };
  
  const handleAddToFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to favorites logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link 
        to={`/products/${product.id}`} 
        className="group block h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
      >
        {/* Product Image */}
        <div className="relative h-48 overflow-hidden bg-gray-50">
          <motion.img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
          />
          
          {/* Favorite Button */}
          <motion.button
            onClick={handleAddToFavorites}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.9 }}
            aria-label="Add to favorites"
          >
            <FaHeart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
          </motion.button>
          
          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Add to cart"
          >
            <FaShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating?.rate || 4) ? 'text-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="text-sm text-gray-500 ml-1">
              ({product.rating?.count || 0})
            </span>
          </div>
          
          {/* Price and Category */}
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
