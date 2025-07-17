import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaHeart, FaShare } from 'react-icons/fa';

// Sample images - replace with your actual images
const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Summer Collection 2023',
    description: 'Experience the vibrant colors of summer with our latest collection.'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Urban Style',
    description: 'Modern designs for the urban explorer.'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Eco-Friendly Materials',
    description: 'Sustainable fashion for a better tomorrow.'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    title: 'Minimalist Design',
    description: 'Less is more with our minimalist collection.'
  }
];

const PhotoSession = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleShare = () => {
    setShowShare(!showShare);
  };

  const shareOnSocial = (platform) => {
    // Implement share functionality
    console.log(`Sharing on ${platform}`);
    setShowShare(false);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">Featured Collections</h2>
          <p className="mt-4 text-xl text-gray-600">Discover our latest styles and trends</p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Image Slider */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={galleryImages[currentIndex].id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative aspect-video w-full"
              >
                <img
                  src={galleryImages[currentIndex].src}
                  alt={galleryImages[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl"
                  >
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {galleryImages[currentIndex].title}
                    </h3>
                    <p className="text-gray-200 mb-6">
                      {galleryImages[currentIndex].description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center">
                        Shop Now
                        <FaExternalLinkAlt className="ml-2" />
                      </button>
                      
                      <button 
                        onClick={toggleLike}
                        className={`p-2.5 rounded-full ${isLiked ? 'text-red-500' : 'text-white'} hover:bg-white/10 transition-colors duration-200`}
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                      >
                        <FaHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      
                      <div className="relative">
                        <button 
                          onClick={toggleShare}
                          className="p-2.5 rounded-full text-white hover:bg-white/10 transition-colors duration-200"
                          aria-label="Share"
                        >
                          <FaShare className="w-5 h-5" />
                        </button>
                        
                        <AnimatePresence>
                          {showShare && (
                            <motion.div 
                              className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl overflow-hidden z-10"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                            >
                              <button 
                                onClick={() => shareOnSocial('facebook')}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                              >
                                <span className="mr-2">Facebook</span>
                              </button>
                              <button 
                                onClick={() => shareOnSocial('twitter')}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                              >
                                <span className="mr-2">Twitter</span>
                              </button>
                              <button 
                                onClick={() => shareOnSocial('pinterest')}
                                className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                              >
                                <span className="mr-2">Pinterest</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 z-10"
              aria-label="Previous"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 z-10"
              aria-label="Next"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {galleryImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? 'bg-indigo-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Thumbnail Grid (for larger screens) */}
          <div className="hidden md:grid grid-cols-4 gap-4 mt-8">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className={`relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
                  index === currentIndex ? 'ring-4 ring-indigo-500 scale-105' : 'opacity-75 hover:opacity-100 hover:scale-102'
                }`}
                onClick={() => goToSlide(index)}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={image.src} 
                  alt={`Thumbnail ${index + 1}`} 
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Refresh Your Wardrobe?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Explore our full collection and discover pieces that match your unique style. 
            New arrivals added weekly with free shipping on orders over $50.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 inline-flex items-center">
            Shop Now
            <FaExternalLinkAlt className="ml-2" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoSession;
