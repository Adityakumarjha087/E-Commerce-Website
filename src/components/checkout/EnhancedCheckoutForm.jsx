import { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCity, FaGlobe, FaCreditCard, FaTruck, FaInfoCircle, FaLock } from 'react-icons/fa';
import { API_ENDPOINTS } from '../../config';
import axios from 'axios';

// Reusable form components
const FormSection = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h3 className="text-lg font-medium text-gray-900 mb-6 border-b pb-2">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ label, name, type = 'text', value, onChange, required = true, icon: Icon, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative rounded-md shadow-sm">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`block w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        {...props}
      />
    </div>
  </div>
);

const ShippingMethod = ({ selected, onChange }) => (
  <div className="space-y-4">
    <h4 className="text-sm font-medium text-gray-700">Shipping Method</h4>
    <div className="space-y-2">
      {[
        { id: 'standard', name: 'Standard Shipping', price: 'Free', est: '3-5 business days' },
        { id: 'express', name: 'Express Shipping', price: '$9.99', est: '1-2 business days' },
        { id: 'priority', name: 'Priority Shipping', price: '$19.99', est: '1 business day' }
      ].map((method) => (
        <div key={method.id} className="flex items-start">
          <input
            id={method.id}
            name="shipping-method"
            type="radio"
            checked={selected === method.id}
            onChange={() => onChange(method.id)}
            className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 mt-1"
          />
          <label htmlFor={method.id} className="ml-3 block text-sm">
            <span className="font-medium text-gray-900">{method.name}</span>
            <div className="flex justify-between">
              <span className="text-gray-500">{method.est}</span>
              <span className="font-medium ml-4">{method.price}</span>
            </div>
          </label>
        </div>
      ))}
    </div>
  </div>
);

const EnhancedCheckoutForm = ({ onSuccess, setProcessing, totalAmount, isSubmitting, setIsSubmitting }) => {
  const [formData, setFormData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    
    // Additional
    company: '',
    shippingMethod: 'standard',
    saveInfo: true,
    newsletter: false,
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    sameAsShipping: true
  });
  
  const [activeSection, setActiveSection] = useState('contact');
  const [error, setError] = useState('');
  const [orderID, setOrderID] = useState(null);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBillingToggle = (e) => {
    const isChecked = e.target.checked;
    setBillingSameAsShipping(isChecked);
    if (isChecked) {
      setFormData(prev => ({
        ...prev,
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingZip: '',
        billingCountry: 'United States'
      }));
    }
  };

  const handleSectionChange = (section) => {
    if (validateSection(activeSection)) {
      setActiveSection(section);
    }
  };

  const validateSection = (section) => {
    switch(section) {
      case 'contact':
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError('Please fill in all required contact information');
          return false;
        }
        return true;
      case 'shipping':
        if (!formData.address || !formData.city || !formData.zip || !formData.country) {
          setError('Please fill in all required shipping information');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const createOrder = async () => {
    try {
      const { data } = await axios.post(API_ENDPOINTS.PAYMENT.CREATE_ORDER, {
        amount: totalAmount,
        ...formData
      });
      setOrderID(data.id);
      return data.id;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      setProcessing(true);
      const captureData = await axios.post(API_ENDPOINTS.PAYMENT.CAPTURE(data.orderID));
      
      if (captureData.data.status === 'COMPLETED') {
        onSuccess();
      } else {
        throw new Error('Payment not completed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const onError = (err) => {
    console.error('PayPal error:', err);
    setError('An error occurred with PayPal. Please try again.');
    setProcessing(false);
  };

  const validateForm = () => {
    return Object.values(formData).every(field => field.trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setIsSubmitting(true);
    
    try {
      if (!validateForm()) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        setProcessing(false);
        return;
      }
      
      await createOrder();
    } catch (error) {
      console.error('Error:', error);
      setIsSubmitting(false);
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <nav className="flex items-center justify-center">
          <ol className="flex items-center space-x-4">
            {['contact', 'shipping', 'payment'].map((step) => (
              <li key={step} className="flex items-center">
                <button
                  onClick={() => handleSectionChange(step)}
                  className={`flex items-center ${activeSection === step ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${activeSection === step ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'}`}>
                    {{
                      contact: '1',
                      shipping: '2',
                      payment: '3'
                    }[step]}
                  </span>
                  <span className="ml-2 text-sm font-medium capitalize">
                    {{ contact: 'Contact', shipping: 'Shipping', payment: 'Payment' }[step]}
                  </span>
                </button>
                {step !== 'payment' && (
                  <svg
                    className="h-5 w-5 text-gray-400 mx-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {activeSection === 'contact' && (
          <FormSection title="Contact Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                icon={FaUser}
              />
              <InputField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                icon={FaUser}
              />
            </div>
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              icon={FaEnvelope}
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              icon={FaPhone}
            />
            <div className="flex items-center">
              <input
                id="newsletter"
                name="newsletter"
                type="checkbox"
                checked={formData.newsletter}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
                Subscribe to our newsletter for updates and exclusive offers
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => handleSectionChange('shipping')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue to Shipping
                <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 10l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 11H3.5a.5.5 0 010-1h8.793z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </FormSection>
        )}

        {activeSection === 'shipping' && (
          <>
            <FormSection title="Shipping Address">
              <InputField
                label="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                icon={FaMapMarkerAlt}
                placeholder="123 Main St"
              />
              <InputField
                label="Apartment, suite, etc. (optional)"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                required={false}
                placeholder="Apt 4B"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    icon={FaCity}
                  />
                </div>
                <InputField
                  label="ZIP/Postal Code"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country/Region <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaGlobe className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                      <option>India</option>
                    </select>
                  </div>
                </div>
                <InputField
                  label="State/Province"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <ShippingMethod 
                  selected={formData.shippingMethod}
                  onChange={(method) => setFormData(prev => ({ ...prev, shippingMethod: method }))}
                />
              </div>
              <div className="flex items-center mt-6">
                <input
                  id="save-info"
                  name="saveInfo"
                  type="checkbox"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="save-info" className="ml-2 block text-sm text-gray-700">
                  Save this information for next time
                </label>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setActiveSection('contact')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="mr-2 -ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.707 10l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708.708L7.707 9H16.5a.5.5 0 010 1H7.707z" clipRule="evenodd" />
                  </svg>
                  Back to Contact
                </button>
                <button
                  type="button"
                  onClick={() => handleSectionChange('payment')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue to Payment
                  <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 10l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 11H3.5a.5.5 0 010-1h8.793z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </FormSection>
          </>
        )}

        {activeSection === 'payment' && (
          <>
            <FormSection title="Payment Details">
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex">
                  <FaInfoCircle className="flex-shrink-0 h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Your payment is secure and encrypted. We don't store your payment details.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <InputField
                  label="Name on Card"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleChange}
                  icon={FaCreditCard}
                  placeholder="John Smith"
                />
                <InputField
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="0000 0000 0000 0000"
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Expiration Date (MM/YY)"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                  />
                  <InputField
                    label="CVV"
                    name="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="•••"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    id="billing-same"
                    name="sameAsShipping"
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={handleBillingToggle}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="billing-same" className="ml-2 block text-sm text-gray-700">
                    Billing address is the same as shipping address
                  </label>
                </div>

                {!billingSameAsShipping && (
                  <div className="mt-4 space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">Billing Address</h4>
                    <InputField
                      label="Street Address"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      icon={FaMapMarkerAlt}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <InputField
                          label="City"
                          name="billingCity"
                          value={formData.billingCity}
                          onChange={handleChange}
                          icon={FaCity}
                        />
                      </div>
                      <InputField
                        label="ZIP/Postal Code"
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country/Region <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaGlobe className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            name="billingCountry"
                            value={formData.billingCountry}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option>United States</option>
                            <option>Canada</option>
                            <option>United Kingdom</option>
                            <option>Australia</option>
                            <option>India</option>
                          </select>
                        </div>
                      </div>
                      <InputField
                        label="State/Province"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="mt-8 bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {formData.shippingMethod === 'standard' 
                        ? 'Free' 
                        : formData.shippingMethod === 'express' 
                          ? '$9.99' 
                          : '$19.99'}
                    </span>
                  </div>
                  {formData.shippingMethod !== 'standard' && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Express Shipping Discount</span>
                      <span>-$5.00</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>
                      ${(formData.shippingMethod === 'standard' 
                        ? totalAmount 
                        : formData.shippingMethod === 'express' 
                          ? totalAmount + 9.99 - 5.00 
                          : totalAmount + 19.99 - 5.00).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
                  </label>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 text-red-700 rounded text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveSection('shipping')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <svg className="mr-2 -ml-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.707 10l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708.708L7.707 9H16.5a.5.5 0 010 1H7.707z" clipRule="evenodd" />
                    </svg>
                    Back to Shipping
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Processing...'
                    ) : (
                      <>
                        <FaLock className="mr-2 -ml-1 h-5 w-5" />
                        Pay Now
                        <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </FormSection>
          </>
        )}
      </form>
    </div>
  );
};

export default EnhancedCheckoutForm;
