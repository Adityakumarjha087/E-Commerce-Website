import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const OrderSummary = ({ items, totalAmount, totalQuantity }) => {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate shipping (free for orders over $50, otherwise $5.99)
  const shipping = subtotal > 50 ? 0 : 5.99;
  
  // Calculate tax (simplified as 7% of subtotal)
  const tax = subtotal * 0.07;
  
  // Calculate total
  const calculatedTotal = subtotal + shipping + tax;
  
  // Use the provided totalAmount if available, otherwise use calculated total
  const orderTotal = totalAmount !== undefined ? totalAmount : calculatedTotal;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center">
            <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="ml-4 flex-1">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3 className="line-clamp-1">{item.title}</h3>
                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              
              <div className="flex items-center justify-between mt-1 text-sm text-gray-500">
                <p>Qty {item.quantity}</p>
                <p>${item.price.toFixed(2)} each</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>Shipping</p>
          <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <p>Total</p>
            <p>${orderTotal.toFixed(2)}</p>
          </div>
          
          {shipping === 0 ? (
            <p className="mt-1 text-sm text-green-600">
              Congrats! You've got free shipping.
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              Spend ${(50 - subtotal).toFixed(2)} more for free shipping
            </p>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Secure Checkout
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Your payment information is encrypted and secure. We don't store your credit card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center text-center text-sm text-gray-500">
        <p>
          or{' '}
          <Link
            to="/"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping<span aria-hidden="true"> &rarr;</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
