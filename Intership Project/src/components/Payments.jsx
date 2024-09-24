import React, { useState, useMemo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Lock, ShoppingBag, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'

export default function PaymentPage() {
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOrderBooked, setIsOrderBooked] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})
  const cartItems = useSelector((store) => store.cart.items)
  const navigate = useNavigate()

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = item.card.info.price || item.card.info.defaultPrice
      return total + price / 100
    }, 0)
  }, [cartItems])

  const shipping = 9.99
  const tax = subtotal * 0.05 // Assuming 5% tax
  const total = subtotal + shipping + tax

  const validateForm = () => {
    const newErrors = {}

    // Card Number Validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number. It should be 16 digits.'
    }

    // Expiry Date Validation
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date. Format should be MM/YY.'
    }

    // CVV Validation
    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'Invalid CVV. It should be 3 digits.'
    }

    // Name Validation
    if (!name) {
      newErrors.name = 'Name on card is required.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Return true if no errors
  }

  const handlePayNow = () => {
    if (validateForm()) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsOrderBooked(true) // Show success message after payment processing
      }, 3000) // Simulates a 3-second payment processing delay
    }
  }

  useEffect(() => {
    if (isOrderBooked) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOrderBooked, navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className={`max-w-4xl mx-auto relative`}>
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
                      className={`w-full px-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <CreditCard className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  {errors.cardNumber && <span className="text-red-500 text-sm">{errors.cardNumber}</span>}
                </div>
                <div className="flex mb-6 space-x-4">
                  <div className="w-1/2">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      className={`w-full px-4 py-3 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                      placeholder="MM / YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                    {errors.expiryDate && <span className="text-red-500 text-sm">{errors.expiryDate}</span>}
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className={`w-full px-4 py-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                    {errors.cvv && <span className="text-red-500 text-sm">{errors.cvv}</span>}
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200`}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
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
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Secure Payment</h4>
                <button
                  onClick={handlePayNow}
                  disabled={isLoading}
                  className={`w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200 focus:outline-none ${isLoading ? 'opacity-  50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Lock className="animate-spin h-5 w-5 mr-2" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Pay Now
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Success Message Overlay */}
        {isOrderBooked && (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
            <div className="p-6 bg-green-500 text-white rounded-md shadow-lg flex items-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg font-medium">Order successfully placed!</span>
            </div>
          </div>
        )}
      </div>
    )
  }
