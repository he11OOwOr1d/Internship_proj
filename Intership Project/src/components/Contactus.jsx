import React from 'react';

export default function Contactus() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🚀 Get in Touch with Us!</h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email Us</h2>
            <p className="text-gray-600"><a href="mailto:hello@swiftlydelivered.com" className="text-blue-600 hover:underline">hello@swiftlydelivered.com</a></p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Call or Text</h2>
            <p className="text-gray-600"><a href="tel:+18001234567" className="text-blue-600 hover:underline">+1 (800) 123-4567</a></p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Office Hours</h2>
            <p className="text-gray-600">Monday - Friday, 9 AM - 6 PM EST</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Track Your Delivery</h2>
            <p><a href="/track" className="text-blue-600 hover:underline">Track Here</a></p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Live Chat</h2>
            <p><a href="/chat" className="text-blue-600 hover:underline">Start a Chat</a></p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Help Center</h2>
            <p><a href="/help" className="text-blue-600 hover:underline">Get Help</a></p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h2>
          <p className="text-gray-600">
            <a href="https://facebook.com/SwiftlyDelivered" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a> |
            <a href="https://twitter.com/SwiftlyDeliver" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mx-2">Twitter</a> |
            <a href="https://instagram.com/SwiftlyDelivered" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a>
          </p>
        </div>
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Office</h2>
          <p className="text-gray-600">123 Delivery Lane, Suite 456, Transport City, ST 78901</p>
        </div>
      </div>
    </div>
  );
}
