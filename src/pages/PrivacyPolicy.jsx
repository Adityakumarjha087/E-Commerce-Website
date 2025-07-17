import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-12">
        <motion.h1 
          className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Privacy Policy
        </motion.h1>
        <motion.p 
          className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
      </div>

      <motion.div 
        className="prose prose-indigo prose-lg text-gray-500 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-gray-600">
          At ShopEase, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
          disclose, and safeguard your information when you visit our website or make a purchase from us.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
        <p>We collect several types of information from and about users of our website, including:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Personal information such as name, email address, phone number, and shipping address</li>
          <li>Payment information (processed securely through our payment processor)</li>
          <li>Order history and purchase information</li>
          <li>Browsing behavior and website usage data</li>
          <li>Device and connection information</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Process and fulfill your orders</li>
          <li>Communicate with you about your orders and account</li>
          <li>Provide customer support</li>
          <li>Improve our website and product offerings</li>
          <li>Send promotional emails (you can opt-out at any time)</li>
          <li>Prevent fraud and enhance security</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Service providers who perform services on our behalf</li>
          <li>Payment processors to complete transactions</li>
          <li>Shipping carriers to deliver your orders</li>
          <li>Legal authorities when required by law</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, 
          no method of transmission over the Internet or electronic storage is 100% secure.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Access, update, or delete your personal information</li>
          <li>Opt-out of marketing communications</li>
          <li>Request a copy of your data</li>
          <li>Withdraw consent where applicable</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience on our website. 
          You can set your browser to refuse all or some browser cookies, but this may limit your 
          ability to use certain features of our website.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by 
          posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mt-2">
          <strong>Email:</strong> privacy@shopease.com<br />
          <strong>Phone:</strong> (555) 123-4567<br />
          <strong>Address:</strong> 123 E-Commerce St, Suite 100, San Francisco, CA 94105
        </p>
      </motion.div>

      <div className="mt-12 text-center">
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
        >
          &larr; Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
