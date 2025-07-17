import { useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config';
import PersonalInfoForm from './forms/PersonalInfoForm';
import PaymentSection from './PaymentSection';

const CheckoutForm = ({ onSuccess, setProcessing, totalAmount, isSubmitting, setIsSubmitting }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [orderID, setOrderID] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoForm 
        formData={formData} 
        handleChange={handleChange} 
        errors={error}
      />
      
      <PaymentSection 
        error={error}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
        validateForm={validateForm}
        isSubmitting={isSubmitting}
      />
      
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
