import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CreditCard, Lock, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react'

export default function PaymentPage() {
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false)
  const cartItems = useSelector((store) => store.cart.items)

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.card.info.price || item.card.info.defaultPrice
      return total + price / 100
    }, 0)
  }, [cartItems])

  const shipping = 9.99
  const tax = subtotal * 0.05 // Assuming 5% tax
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
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
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out flex items-center justify-center text-lg font-semibold"
                >
                  <Lock className="h-5 w-5 mr-2" />
                  Pay Now
                </button>
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
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Need Help?</h4>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 text-sm">Contact our support team</a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            By completing your purchase, you agree to our <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a>
          </p>
        </div>
      </div>
    </div>
  )
}