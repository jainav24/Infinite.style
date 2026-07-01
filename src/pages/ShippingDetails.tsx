import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { ArrowLeft } from 'lucide-react';

const ShippingDetails: React.FC = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedAddressId, setSelectedAddressId] = useState<string>('new');
  
  // Initialize selected address based on default address if available
  useEffect(() => {
    if (user && user.addresses && user.addresses.length > 0) {
      const defaultAddr = user.addresses.find(a => a.isDefault);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      } else {
        setSelectedAddressId(user.addresses[0].id);
      }
    }
  }, [user]);

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      // Save order with all cart items before clearing
      const orderItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }));
      const orderId = placeOrder(orderItems, finalTotal);
      
      setIsProcessing(false);
      clearCart();
      navigate('/order-confirmation', { state: { orderNumber: orderId } });
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-porcelain px-4">
        <h2 className="text-4xl font-display text-ink mb-4 italic">No items to checkout.</h2>
        <Link to="/shop" className="garment-tag bg-ink text-porcelain border-ink hover:bg-velvet hover:border-velvet transition-colors px-6 py-3">
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain py-16 font-body">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        
        <Link to="/checkout" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-orchid mb-8 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to Payment
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-ink mb-12">Shipping Details</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          <div className="flex-1">
            <form id="shipping-form" onSubmit={handlePlaceOrder} className="space-y-12">
              
              <div className="border-t border-ink/20 pt-8">
                <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Delivery Address</h2>
                
                {user && user.addresses && user.addresses.length > 0 && (
                  <div className="space-y-4 mb-8">
                    {user.addresses.map((address) => (
                      <label 
                        key={address.id}
                        className={`block p-6 border cursor-pointer transition-colors ${selectedAddressId === address.id ? 'border-orchid bg-orchid/5' : 'border-ink/20 hover:border-ink/40'}`}
                        onClick={() => setSelectedAddressId(address.id)}
                      >
                        <div className="flex gap-4">
                          <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddressId === address.id ? 'border-orchid' : 'border-ink/30'}`}>
                            {selectedAddressId === address.id && <div className="w-2.5 h-2.5 rounded-full bg-orchid" />}
                          </div>
                          <div>
                            <p className="font-display text-lg text-ink">{address.firstName} {address.lastName}</p>
                            <p className="font-mono text-xs text-ink/70 mt-1 uppercase tracking-widest">
                              {address.plotNo}, {address.addressLine1} {address.addressLine2 ? `, ${address.addressLine2}` : ''}<br/>
                              {address.city}, {address.state} {address.pincode}
                            </p>
                            <p className="font-mono text-xs text-ink/70 mt-2 uppercase tracking-widest">Ph: {address.phone}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                    
                    <label 
                      className={`block p-6 border cursor-pointer transition-colors ${selectedAddressId === 'new' ? 'border-orchid bg-orchid/5' : 'border-ink/20 hover:border-ink/40'}`}
                      onClick={() => setSelectedAddressId('new')}
                    >
                      <div className="flex gap-4 items-center">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${selectedAddressId === 'new' ? 'border-orchid' : 'border-ink/30'}`}>
                          {selectedAddressId === 'new' && <div className="w-2.5 h-2.5 rounded-full bg-orchid" />}
                        </div>
                        <span className="font-mono text-sm uppercase tracking-widest text-ink">Deliver to a different address</span>
                      </div>
                    </label>
                  </div>
                )}

                {(!user || !user.addresses || user.addresses.length === 0 || selectedAddressId === 'new') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <div>
                      <input required type="text" placeholder="FIRST NAME" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div>
                      <input required type="text" placeholder="LAST NAME" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div className="md:col-span-2">
                      <input required type="tel" placeholder="PHONE NUMBER" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div>
                      <input required type="text" placeholder="PLOT / HOUSE NO." className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div>
                      <input required type="text" placeholder="ADDRESS LINE 1" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div className="md:col-span-2">
                      <input type="text" placeholder="ADDRESS LINE 2 (OPTIONAL)" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div>
                      <input required type="text" placeholder="CITY" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div>
                      <input required type="text" placeholder="STATE" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                    <div className="md:col-span-2">
                      <input required type="text" placeholder="PINCODE" className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30" />
                    </div>
                  </div>
                )}
              </div>

            </form>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-champagne/5 p-8 border border-champagne/40 sticky top-32">
              <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Order Summary</h2>
              
              <div className="border-t border-ink/20 pt-6 mb-8 space-y-4 font-mono text-xs uppercase tracking-widest">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span className="text-ink">₹{Math.round(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Shipping</span>
                  <span className="text-ink">{shipping === 0 ? 'Free' : `₹${Math.round(shipping)}`}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Tax</span>
                  <span className="text-ink">₹{Math.round(tax)}</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-ink/20">
                  <span className="font-mono text-sm uppercase tracking-widest text-ink">Total</span>
                  <span className="font-display text-3xl text-ink">₹{Math.round(finalTotal)}</span>
                </div>
              </div>

              <button 
                type="submit"
                form="shipping-form"
                disabled={isProcessing}
                className="w-full h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? 'PROCESSING...' : `PLACE ORDER (₹${Math.round(finalTotal)})`}
              </button>
              
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink/40 text-center mt-6">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
