import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
    removeFromWishlist(item.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-porcelain px-4 font-body">
        <div className="mb-6">
          <Heart size={48} strokeWidth={1} className="text-ink/30" />
        </div>
        <h2 className="text-4xl font-display text-ink mb-4 italic">Your Wishlist is Empty.</h2>
        <p className="text-ink/60 mb-8 font-mono text-xs uppercase tracking-widest text-center max-w-md">
          Save your favorite pieces here for later.
        </p>
        <Link 
          to="/shop" 
          className="garment-tag bg-ink text-porcelain border-ink hover:bg-velvet hover:border-velvet transition-colors px-6 py-3"
        >
          EXPLORE THE COLLECTION
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain py-16 font-body">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <div className="flex items-end justify-between mb-16 border-b border-ink/20 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display text-ink mb-2">The Wishlist</h1>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-ink/50">{wishlist.length} Items</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
          {wishlist.map((item) => (
            <div key={item.id} className="group relative flex flex-col">
              <Link to={`/product/${item.id}`} className="relative aspect-[3/4] bg-champagne/10 overflow-hidden block">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-700" />
              </Link>
              <div className="pt-4 flex flex-col border-l border-champagne pl-4 mt-4">
                <Link to={`/product/${item.id}`} className="font-display text-xl text-ink hover:text-orchid transition-colors mb-2">
                  {item.name}
                </Link>
                <div className="flex justify-between items-center mb-6">
                  <div className="garment-tag bg-transparent">
                    ₹{item.price.toFixed(0)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-ink text-porcelain py-3 font-mono text-xs uppercase tracking-widest hover:bg-velvet transition-colors flex items-center justify-center gap-2"
                  >
                    Move to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-12 border border-ink/20 flex items-center justify-center text-ink/40 hover:text-orchid hover:border-orchid transition-colors"
                  >
                    <Trash2 size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
