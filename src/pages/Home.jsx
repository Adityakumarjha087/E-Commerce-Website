import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/products/ProductCard';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Get featured products (first 8 products for demo)
  const featuredProducts = products.slice(0, 8);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products" className="text-indigo-600 hover:underline">
            View All Products →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Categories */}
      <Categories />
      
      {/* Special Offers */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
          <p className="text-xl mb-6">Get 20% off on your first order! Use code: WELCOME20</p>
          <Link 
            to="/products" 
            className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
