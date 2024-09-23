import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from 'react-router-dom'; // Import useNavigation
import { CreditCard, Lock, ShoppingBag, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export default function PaymentPage() {
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderBooked, setIsOrderBooked] = useState(false);
  const cartItems = useSelector((store) => store.cart.items);
  const navigation = useNavigation(); // Use navigation for redirect

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.card.info.price || item.card.info.defaultPrice;
      return total + price / 100;
    }, 0);
  }, [cartItems]);

  const shipping = 9.99;
  const tax = subtotal * 0.05; // Assuming 5% tax
  const total = subtotal + shipping + tax;

  const handlePayNow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOrderBooked(true);
    }, 3000); // Simulate 3-second payment processing
  };

  // Redirect to home page after 5 seconds once the order is booked
  useEffect(() => {
    if (isOrderBooked) {
      const timer = setTimeout(() => {
        navigation.navigate('/'); // Redirect to home page
      }, 5000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount or if order is booked again
    }
  }, [isOrderBooked, navigation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-4xl mx-auto relative ${isLoading ? 'blur-sm' : ''}`}>
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Secure Payment</h2>
              <form>
                <div className="mb-6">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="1234 5678 9012 3456"
                    />
                    <CreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex mb-6 space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="MM / YY"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                    placeholder="John Doe"
                  />
                </div>
              </form>
            </div>
            <div className="md:w-1/3 bg-gray-50 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Order Summary</h3>
                <button
                  onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                  className="text-indigo-600 hover:text-indigo-800 focus:outline-none md:hidden"
                >
                  {isOrderSummaryOpen ? (
                    <ChevronUp className="h-6 w-6" />
                  ) : (
                    <ChevronDown className="h-6 w-6" />
                  )}
                </button>
              </div>
              <div className={`space-y-4 ${isOrderSummaryOpen ? 'block' : 'hidden md:block'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-indigo-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Secure Checkout</h4>
                <p className="text-xs text-gray-500 flex items-center">
                  <Lock className="h-4 w-4 mr-1 text-green-500" />
                  Your payment information is encrypted
                </p>
              </div>

              <button
                onClick={handlePayNow}
                className="mt-6 w-full flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                {isLoading ? 'Processing...' : 'Pay Now'}
                {!isLoading && <ShoppingBag className="ml-2 h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {isOrderBooked && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Booked!</h2>
              <p className="text-gray-600">Your order has been successfully placed.</p>
              <p className="text-gray-600 mt-1">Redirecting to home page in 5 seconds...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
