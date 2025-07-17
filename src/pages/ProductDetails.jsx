import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { fetchProducts } from '../store/slices/productsSlice';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaShare, FaChevronLeft } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Fetch products if not already loaded
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  // Find the current product
  const product = products.find(p => p.id.toString() === id);
  
  // Generate star rating
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
    }
    
    return stars;
  };
  
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    }));
    
    toast.success(`${quantity} ${product.title} added to cart!`);
  };
  
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(!isWishlisted ? 'Added to wishlist' : 'Removed from wishlist');
  };
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.title,
        text: `Check out ${product.title} on ShopEase`,
        url: window.location.href,
      });
      toast.success('Product shared successfully!');
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share product');
    }
  };
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to products
        </button>
      </div>
    );
  }
  
  // Mock additional images for the product gallery
  const productImages = [
    product.image,
    product.image.replace('fakestoreapi', 'picsum.photos/200/300'),
    product.image.replace('fakestoreapi', 'picsum.photos/300/300'),
    product.image.replace('fakestoreapi', 'picsum.photos/400/300'),
  ];
  
  return (
    <div className="py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6"
      >
        <FaChevronLeft className="mr-1" /> Back to products
      </button>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div>
            <div className="mb-4 bg-white rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-96 object-contain p-8"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStarRating(product.rating.rate)}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>
            
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${product.price.toFixed(2)}
              {product.price > 50 && (
                <span className="ml-2 text-sm font-normal text-green-600">Free Shipping</span>
              )}
            </div>
            
            <p className="text-gray-700 mb-8">{product.description}</p>
            
            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="flex items-center mb-4">
                <span className="text-gray-700 w-32">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <span className="text-gray-700 w-32">Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-md border ${isWishlisted ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <FaHeart className={isWishlisted ? 'fill-current' : ''} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-3 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                title="Share product"
              >
                <FaShare />
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              <p className="mb-1">
                <span className="font-medium text-gray-700">SKU:</span> {product.id}
              </p>
              <p>
                <span className="font-medium text-gray-700">Availability:</span> In Stock (10+ units)
              </p>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button className="border-b-2 border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 text-sm font-medium">
                  Description
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Additional Information
                </button>
                <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                  Reviews ({product.rating.count})
                </button>
              </nav>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p className="mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <ul className="mt-4 list-disc pl-5">
                <li>High-quality materials</li>
                <li>Durable and long-lasting</li>
                <li>Easy to clean and maintain</li>
                <li>30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.title}
                  className="w-full h-48 object-contain p-4"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">{relatedProduct.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</span>
                    <button 
                      onClick={() => {
                        dispatch(addToCart({
                          id: relatedProduct.id,
                          title: relatedProduct.title,
                          price: relatedProduct.price,
                          image: relatedProduct.image,
                        }));
                        toast.success('Added to cart!');
                      }}
                      className="text-indigo-600 hover:text-indigo-800"
                      title="Add to cart"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
