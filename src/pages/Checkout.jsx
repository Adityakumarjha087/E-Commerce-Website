import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import { 
  FaArrowLeft, FaLock, FaShieldAlt, FaTruck, FaUndo, 
  FaCreditCard, FaUser, FaMapMarkerAlt, FaPhone, 
  FaCheckCircle, FaPaypal 
} from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { API_ENDPOINTS } from '../config';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount, totalQuantity } = useSelector((state) => state.cart);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  useEffect(() => {
    if (items.length === 0 && !orderSuccess) {
      navigate('/cart');
    }
  }, [items, navigate, orderSuccess]);
  
  const handleOrderSuccess = (details) => {
    const newOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNumber);
    setOrderSuccess(true);
    dispatch(clearCart());
    
    // Here you would typically send the order details to your backend
    const orderData = {
      orderId: newOrderNumber,
      transactionId: details.id,
      amount: totalAmount,
      items: items,
      status: 'completed',
      paymentMethod: 'PayPal'
    };
    
    // Example API call to save the order
    // axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderData)
    //   .then(() => {
    //     toast.success('Order placed successfully!');
    //   })
    //   .catch((error) => {
    //     console.error('Error saving order:', error);
    //     toast.error('Error saving order details');
    //   });
  };
  
  const handleSetProcessing = (processing) => {
    setIsProcessing(processing);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty. Redirecting...</p>
        </div>
      </div>
    );
  }
  
  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Order Placed Successfully!
          </h2>
          <p className="mt-2 text-gray-600">
            Thank you for your order. We've sent a confirmation email with your order details.
          </p>
          <p className="mt-4 text-gray-900 font-medium">
            Order Number: <span className="text-indigo-600">{orderNumber}</span>
          </p>
          
          <div className="mt-10 border-t border-gray-200 pt-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const [paypalError, setPaypalError] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  // Load the PayPal SDK
  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&currency=USD`;
      script.async = true;
      script.onload = () => setSdkReady(true);
      script.onerror = () => {
        setPaypalError(true);
        toast.error('Failed to load PayPal. Please refresh the page.');
      };
      document.body.appendChild(script);
    };

    if (window.paypal) {
      setSdkReady(true);
    } else {
      addPayPalScript();
    }

    return () => {
      // Cleanup
      const scriptElements = document.querySelectorAll('script[src*="paypal.com"]');
      scriptElements.forEach(script => script.remove());
    };
  }, []);

  return (
    <PayPalScriptProvider 
      options={{ 
        'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
        components: 'buttons',
        currency: 'USD',
        'disable-funding': 'credit,card',
        'data-sdk-integration-source': 'integrationbuilder_sc'
      }}
    >
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="md:grid md:grid-cols-3 md:gap-8">
            {/* Checkout Form */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
                {orderSuccess ? (
                  <div className="text-center py-12">
                    <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Placed Successfully!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Your order number is: {orderNumber}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">We've sent you an email with all the details.</p>
                    <button
                      onClick={() => navigate('/orders')}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Orders
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact information</h2>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email-address"
                            name="email-address"
                            autoComplete="email"
                            className="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment method</h2>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <div className="flex items-center mb-4">
                          <input
                            id="paypal"
                            name="payment-method"
                            type="radio"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            defaultChecked
                          />
                          <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            PayPal
                          </label>
                        </div>
                        <div className="mt-4">
                          {paypalError ? (
                            <div className="text-red-500 text-sm">
                              Error loading PayPal. Please refresh the page or try again later.
                            </div>
                          ) : !sdkReady ? (
                            <div className="flex justify-center items-center py-4">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                            </div>
                          ) : (
                            <PayPalButtons
                              style={{ layout: "vertical" }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  purchase_units: [
                                    {
                                      amount: {
                                        value: totalAmount.toFixed(2),
                                        currency_code: 'USD'
                                      },
                                    },
                                  ],
                                });
                              }}
                              onApprove={async (data, actions) => {
                                try {
                                  const details = await actions.order.capture();
                                  handleOrderSuccess(details);
                                } catch (error) {
                                  console.error('Payment error:', error);
                                  toast.error('Payment processing failed. Please try again.');
                                }
                              }}
                              onError={(err) => {
                                console.error('PayPal error:', err);
                                setPaypalError(true);
                                toast.error('Failed to process payment. Please try again.');
                              }}
                              onCancel={() => {
                                console.log('Payment cancelled');
                                toast('Payment was cancelled', { icon: 'ℹ️' });
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6 dark:text-white">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium dark:text-gray-200">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium dark:text-gray-200">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between py-2">
                      <span className="dark:text-gray-300">Subtotal</span>
                      <span className="dark:text-gray-300">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="dark:text-gray-300">Shipping</span>
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold text-lg">
                      <span className="dark:text-white">Total</span>
                      <span className="dark:text-white">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-center">
                    or{' '}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                      onClick={() => navigate('/')}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Checkout;