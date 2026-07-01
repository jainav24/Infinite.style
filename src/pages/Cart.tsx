import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-porcelain px-4">
        <div className="mb-6">
          <ShoppingBag size={48} strokeWidth={1} className="text-ink/30" />
        </div>
        <h2 className="text-4xl font-display text-ink mb-4 italic">Your Cart is Empty.</h2>
        <p className="text-ink/60 mb-8 font-body max-w-md text-center text-sm">
          Discover the new collection and find your next statement piece.
        </p>
        <Link 
          to="/shop" 
          className="garment-tag bg-ink text-porcelain border-ink hover:bg-velvet hover:border-velvet hover:text-porcelain transition-colors px-6 py-3"
        >
          EXPLORE THE COLLECTION
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 100 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% mock tax
  const finalTotal = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen bg-porcelain py-16 font-body">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <h1 className="text-4xl md:text-5xl font-display text-ink mb-12">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Cart Items */}
          <div className="flex-1">
            <div className="border-t border-ink/20 pt-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-xs uppercase tracking-widest text-ink/60">{cart.length} Items</span>
                <button onClick={clearCart} className="font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-orchid transition-colors">Clear Cart</button>
              </div>
              
              <ul className="space-y-12">
                {cart.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-8">
                    <Link to={`/product/${item.id}`} className="w-32 aspect-[3/4] flex-shrink-0 bg-champagne/10">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <Link to={`/product/${item.id}`} className="font-display text-xl text-ink hover:text-orchid transition-colors block mb-2">
                            {item.name}
                          </Link>
                          <div className="flex gap-4 font-mono text-xs text-ink/60 uppercase tracking-widest">
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>} 
                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          </div>
                        </div>
                        <p className="font-mono text-sm text-ink">₹{(item.price * item.quantity).toFixed(0)}</p>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center border border-ink/20 px-2 h-10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                            className="p-2 text-ink/50 hover:text-orchid transition-colors"
                          >
                            <Minus size={14} strokeWidth={1.5} />
                          </button>
                          <span className="font-mono text-xs w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                            className="p-2 text-ink/50 hover:text-orchid transition-colors"
                          >
                            <Plus size={14} strokeWidth={1.5} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                          className="font-mono text-xs uppercase tracking-widest text-ink/40 hover:text-orchid transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-champagne/5 p-8 border border-champagne/40 sticky top-32">
              <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-ink mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8 font-mono text-xs uppercase tracking-widest">
                <div className="flex justify-between text-ink/70">
                  <span>Subtotal</span>
                  <span className="text-ink">₹{Math.round(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-ink/70">
                  <span>Shipping</span>
                  <span className="text-ink">{shipping === 0 ? 'Free' : `₹${Math.round(shipping)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-orchid bg-orchid/5 p-2 text-center mt-2 border border-orchid/20">Add ₹{Math.round(100 - cartTotal)} more for FREE shipping</p>
                )}
                <div className="flex justify-between text-ink/70">
                  <span>Estimated Tax</span>
                  <span className="text-ink">₹{Math.round(tax)}</span>
                </div>
              </div>

              <div className="border-t border-ink/20 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-sm uppercase tracking-widest text-ink">Total</span>
                  <span className="font-display text-3xl text-ink">₹{Math.round(finalTotal)}</span>
                </div>
              </div>

              {/* Promo Code UI */}
              <div className="mb-8">
                <form onSubmit={(e) => { e.preventDefault(); alert('Promo code applied!'); }} className="flex border-b border-ink/30 pb-2">
                  <input 
                    type="text" 
                    placeholder="PROMO CODE" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-transparent font-mono text-xs uppercase tracking-widest focus:outline-none placeholder:text-ink/30"
                  />
                  <button type="submit" className="font-mono text-xs uppercase tracking-widest text-ink/60 hover:text-orchid transition-colors">Apply</button>
                </form>
              </div>

              <button 
                onClick={() => {
                  if (user) {
                    navigate('/checkout');
                  } else {
                    navigate('/login?redirect=/checkout');
                  }
                }}
                className="w-full h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
