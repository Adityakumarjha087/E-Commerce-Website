import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaShoppingCart, FaLock } from 'react-icons/fa';

const AnimatedButton = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  ...props
}) => {
  const baseClasses = 'relative overflow-hidden font-medium rounded-full flex items-center justify-center';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-emerald-500 text-white hover:bg-emerald-600',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  const iconMap = {
    arrow: <FaArrowRight className="ml-2" />,
    cart: <FaShoppingCart className="mr-2" />,
    lock: <FaLock className="mr-2" />,
  };
  
  return (
    <motion.button
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4), 0 10px 10px -5px rgba(79, 70, 229, 0.2)'
      }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <motion.span 
        className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
        whileHover={{ opacity: 0.1 }}
      />
      {icon && iconPosition === 'left' && (
        <motion.span 
          initial={{ x: -5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {iconMap[icon] || icon}
        </motion.span>
      )}
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {children}
      </motion.span>
      {icon && iconPosition === 'right' && (
        <motion.span 
          initial={{ x: 5, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="ml-2"
        >
          {iconMap[icon] || icon}
        </motion.span>
      )}
      <motion.span 
        className="absolute inset-0 border-2 border-transparent rounded-full"
        whileHover={{ 
          borderColor: 'rgba(255, 255, 255, 0.5)',
          scale: 1.1,
          opacity: 0
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};

export default AnimatedButton;
