import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Welcome to <span className="text-indigo-400">ShopEase</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-300 mb-10">
            Discover amazing products at the best prices. Shop with confidence with our secure checkout and fast delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Shop Now
            </Link>
            <Link 
              to="/sale" 
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              On Sale
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-24 bg-white rounded-t-full opacity-10"></div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-16 bg-white rounded-t-full opacity-5"></div>
    </section>
  );
};

export default Hero;
