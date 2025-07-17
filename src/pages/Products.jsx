import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProducts, 
  setCategory, 
  setPriceRange, 
  setRating, 
  setSearchQuery, 
  applyFilters 
} from '../store/slices/productsSlice';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { FaSearch, FaTimes, FaTh, FaThList, FaFilter, FaChevronDown } from 'react-icons/fa';

const Products = () => {
  const dispatch = useDispatch();
  const { 
    products, 
    filteredProducts, 
    status, 
    filters 
  } = useSelector((state) => state.products);
  
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);
  
  useEffect(() => {
    dispatch(applyFilters());
  }, [filters, dispatch]);
  
  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };
  
  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    if (value === 'all') {
      dispatch(setPriceRange([0, 1000]));
    } else if (value === 'under25') {
      dispatch(setPriceRange([0, 25]));
    } else if (value === '25to50') {
      dispatch(setPriceRange([25, 50]));
    } else if (value === '50to100') {
      dispatch(setPriceRange([50, 100]));
    } else {
      dispatch(setPriceRange([100, 1000]));
    }
  };
  
  const handleRatingChange = (e) => {
    dispatch(setRating(Number(e.target.value)));
  };
  
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  
  const clearFilters = () => {
    dispatch(setCategory('all'));
    dispatch(setPriceRange([0, 1000]));
    dispatch(setRating(0));
    dispatch(setSearchQuery(''));
  };
  
  const sortProducts = (products) => {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'newest':
        return sortedProducts.reverse(); // Assuming newer products are at the end
      default:
        return sortedProducts;
    }
  };
  
  const sortedProducts = sortProducts(filteredProducts);
  
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  if (status === 'failed') {
    return <div className="text-red-500 text-center py-8">Error loading products. Please try again later.</div>;
  }
  
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">Browse our wide selection of products</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg mb-4"
          >
            <span className="font-medium">Filters</span>
            <FaChevronDown className={`transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
          </button>
          
          <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow-sm border border-gray-100`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:underline"
              >
                Clear all
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.searchQuery}
                    onChange={handleSearch}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  {filters.searchQuery && (
                    <button 
                      onClick={() => dispatch(setSearchQuery(''))}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
                <select
                  value={filters.category}
                  onChange={handleCategoryChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelry</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
                <select
                  onChange={handlePriceRangeChange}
                  value={filters.priceRange[1] === 25 ? 'under25' : 
                         filters.priceRange[0] === 25 ? '25to50' :
                         filters.priceRange[0] === 50 ? '50to100' :
                         filters.priceRange[0] === 100 ? 'over100' : 'all'}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="all">All Prices</option>
                  <option value="under25">Under $25</option>
                  <option value="25to50">$25 - $50</option>
                  <option value="50to100">$50 - $100</option>
                  <option value="over100">Over $100</option>
                </select>
              </div>
              
              {/* Rating */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
                <select
                  value={filters.rating}
                  onChange={handleRatingChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4 Stars & Up</option>
                  <option value="3">3 Stars & Up</option>
                  <option value="2">2 Stars & Up</option>
                  <option value="1">1 Star & Up</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">{sortedProducts.length}</span> products
              {filters.searchQuery && (
                <span> for "<span className="font-medium">{filters.searchQuery}</span>"</span>
              )}
            </p>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm text-gray-600 mr-2 whitespace-nowrap">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              
              <div className="flex border rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
                  title="Grid view"
                >
                  <FaTh className={viewMode === 'grid' ? 'text-indigo-600' : 'text-gray-500'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'} hover:bg-gray-100`}
                  title="List view"
                >
                  <FaThList className={viewMode === 'list' ? 'text-indigo-600' : 'text-gray-500'} />
                </button>
              </div>
            </div>
          </div>
          
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <div className="mt-6">
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
