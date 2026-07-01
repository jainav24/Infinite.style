import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/shipping-details');
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
        
        <Link to="/cart" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-orchid mb-8 transition-colors">
          <ArrowLeft size={14} strokeWidth={1.5} /> Back to Cart
        </Link>

        <h1 className="text-4xl md:text-5xl font-display text-ink mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          <div className="flex-1">
            <form id="checkout-form" onSubmit={handleContinue} className="space-y-12">
              

              {/* Payment Method */}
              <div className="border-t border-ink/20 pt-8">
                <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-orchid bg-orchid/5 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border border-orchid flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-orchid" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-widest text-ink">Cash on Delivery (COD)</span>
                    </div>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-champagne/5 p-8 border border-champagne/40 sticky top-32">
              <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="w-16 aspect-[3/4] bg-champagne/10 flex-shrink-0 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-ink text-porcelain font-mono text-[10px] w-5 h-5 flex items-center justify-center rounded-full z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 font-mono text-xs tracking-widest uppercase">
                      <p className="text-ink line-clamp-1 mb-1">{item.name}</p>
                      <p className="text-ink/50">{item.selectedSize} {item.selectedColor}</p>
                      <p className="text-ink mt-2">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>

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
                form="checkout-form"
                className="w-full h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors flex items-center justify-center gap-2"
              >
                CONTINUE TO SHIPPING <ArrowRight size={16} strokeWidth={1.5} />
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

export default Checkout;
