import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
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
          Terms & Conditions
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
          Welcome to ShopEase! These Terms and Conditions outline the rules and regulations for the use of our website 
          and the purchase of products from our store.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. General Conditions</h2>
        <p>
          By accessing this website, you agree to be bound by these Terms and Conditions. If you disagree with any part 
          of these terms, you may not access the website or use our services.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Products and Services</h2>
        <p>We strive to display as accurately as possible the colors and images of our products. However, we cannot 
        guarantee that your computer monitor's display of any color will be accurate.</p>
        <p className="mt-2">We reserve the right to limit the quantities of any products that we offer. All 
        descriptions of products or product pricing are subject to change at any time without notice.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Accuracy of Billing and Account Information</h2>
        <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or 
        cancel quantities purchased per person, per household, or per order.</p>
        <p className="mt-2">You agree to provide current, complete, and accurate purchase and account information 
        for all purchases made at our store.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Pricing and Payment</h2>
        <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify 
        or discontinue the Service (or any part or content thereof) without notice at any time.</p>
        <p className="mt-2">We accept various payment methods including credit cards, debit cards, and PayPal. 
        By providing your payment information, you represent and warrant that you have the legal right to use the 
        payment method you provide.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Shipping and Delivery</h2>
        <p>Shipping times and costs will be displayed at checkout. We are not responsible for any delays caused by 
        customs or other circumstances beyond our control.</p>
        <p className="mt-2">Risk of loss and title for items purchased from us pass to you upon delivery to the carrier.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Returns and Refunds</h2>
        <p>We accept returns within 30 days of purchase. To be eligible for a return, your item must be unused and 
        in the same condition that you received it.</p>
        <p className="mt-2">To complete your return, we require a receipt or proof of purchase. Please do not send 
        your purchase back to the manufacturer.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Intellectual Property</h2>
        <p>All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital 
        downloads, data compilations, and software, is the property of ShopEase or its content suppliers and protected 
        by international copyright laws.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Prohibited Uses</h2>
        <p>You are prohibited from using the site or its content:</p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>For any unlawful purpose</li>
          <li>To solicit others to perform or participate in any unlawful acts</li>
          <li>To violate any international, federal, or state regulations, rules, laws, or local ordinances</li>
          <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
          <li>To harass, abuse, insult, harm, defame, or discriminate based on gender, sexual orientation, religion, 
          ethnicity, race, age, national origin, or disability</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
        <p>In no case shall ShopEase, our directors, officers, employees, affiliates, agents, contractors, interns, 
        suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, 
        incidental, punitive, special, or consequential damages of any kind.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
        <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and 
        construed in accordance with the laws of the State of California, United States.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
        <p>We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms of 
        Service by posting updates and changes to our website. It is your responsibility to check our website 
        periodically for changes.</p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
        <p>Questions about the Terms of Service should be sent to us at:</p>
        <p className="mt-2">
          <strong>Email:</strong> legal@shopease.com<br />
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

export default TermsAndConditions;
