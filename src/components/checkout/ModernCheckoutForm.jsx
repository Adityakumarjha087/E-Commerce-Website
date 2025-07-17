import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheck, FiChevronRight, FiCreditCard, FiLock, FiTruck } from 'react-icons/fi';
import { newTheme } from '../../theme/newTheme';

const ModernCheckoutForm = ({ onSuccess, setProcessing, totalAmount, isSubmitting, setIsSubmitting }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState({});
  const steps = [
    { id: 1, name: 'Shipping', status: 'current' },
    { id: 2, name: 'Payment', status: 'upcoming' },
    { id: 3, name: 'Review', status: 'upcoming' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess();
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-gray-600">Secure checkout with multiple payment options</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, idx) => (
                <li key={step.id} className={`${idx !== steps.length - 1 ? 'flex-1' : ''} relative`}>
                  {step.id < currentStep ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full">
                        <FiCheck className="w-6 h-6 text-white" />
                      </div>
                      <span className="mt-2 text-sm font-medium text-indigo-600">{step.name}</span>
                    </div>
                  ) : step.id === currentStep ? (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 border-2 border-indigo-600 rounded-full bg-white">
                        <span className="text-indigo-600 font-medium">{step.id}</span>
                      </div>
                      <span className="mt-2 text-sm font-medium text-indigo-600">{step.name}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-10 h-10 border-2 border-gray-300 rounded-full bg-white">
                        <span className="text-gray-500 font-medium">{step.id}</span>
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-500">{step.name}</span>
                    </div>
                  )}
                  
                  {idx !== steps.length - 1 && (
                    <div className="absolute top-5 right-0 h-0.5 w-full bg-gray-200">
                      <div 
                        className={`h-full ${idx < currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}
                        style={{ width: idx < currentStep ? '100%' : '0%' }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {currentStep === 1 && (
              <ShippingStep formData={formData} handleChange={handleChange} errors={errors} />
            )}
            
            {currentStep === 2 && (
              <PaymentStep formData={formData} handleChange={handleChange} errors={errors} />
            )}
            
            {currentStep === 3 && (
              <ReviewStep formData={formData} totalAmount={totalAmount} />
            )}
            
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue to {steps[currentStep].name}
                  <FiChevronRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                  <FiArrowRight className="ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-600">
              <FiLock className="mr-2 h-4 w-4 text-gray-400" />
              Secure checkout with SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components would be defined here...
const ShippingStep = ({ formData, handleChange, errors }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
        </div>
      </div>
    </div>
    
    <div className="pt-6 border-t border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Street address
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm sm:text-sm ${errors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'}`}
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PaymentStep = ({ formData, handleChange, errors }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
        <div className="flex items-center">
          <input
            id="credit-card"
            name="paymentMethod"
            type="radio"
            value="credit-card"
            checked={formData.paymentMethod === 'credit-card'}
            onChange={handleChange}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
            Credit / Debit Card
          </label>
        </div>
      </div>
    </div>
  </div>
);

const ReviewStep = ({ formData, totalAmount }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="border-t border-gray-200 pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${(totalAmount - 5.99).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-gray-900">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ModernCheckoutForm;
