import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber;

  if (!orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order has been placed successfully.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <p className="font-mono text-lg font-bold text-gray-900">#{orderNumber}</p>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          We've sent a confirmation email with your order details and tracking information.
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            to="/shop" 
            className="w-full bg-hotpink text-white py-3 rounded-full font-semibold hover:bg-coral transition-colors flex items-center justify-center gap-2 shadow-md shadow-hotpink/20"
          >
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
          <Link 
            to="/account" 
            className="w-full bg-white text-gray-700 py-3 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            View Order Status
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
