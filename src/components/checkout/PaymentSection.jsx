import { FaPaypal, FaLock, FaShieldAlt } from 'react-icons/fa';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PaymentSection = ({ 
  error, 
  createOrder, 
  onApprove, 
  onError, 
  validateForm,
  isSubmitting
}) => (
  <div className="mt-6 border-t border-gray-200 pt-6">
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 flex items-center">
        <FaPaypal className="mr-2 text-blue-600" />
        Secure Payment with PayPal
      </h3>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-green-600 mb-3">
          <FaShieldAlt className="h-5 w-5" />
          <span>Secure & Encrypted Payment</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Complete your purchase securely with PayPal. You'll be redirected to the PayPal gateway.
        </p>
        
        <div className="mt-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <PayPalScriptProvider 
            options={{ 
              "client-id": import.meta.env.VITE_APP_PAYPAL_CLIENT_ID || '',
              currency: "USD",
              intent: "capture"
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
              disabled={!validateForm() || isSubmitting}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700 flex items-start">
        <FaLock className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
        <span>Your payment details are secured with PayPal's advanced security measures</span>
      </div>
    </div>
  </div>
);

export default PaymentSection;
