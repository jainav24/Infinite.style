import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Eye } from 'lucide-react';
import ProductQuickView from './ProductQuickView';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  colors: string[];
  sizes: string[];
  description?: string;
  newArrival?: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const images = product.images || [product.image];

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedColor: product.colors[0],
      selectedSize: product.sizes[0]
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative flex flex-col"
      >
        <div className="relative overflow-hidden bg-champagne/10 rounded-3xl mb-4">
          <button onClick={() => setIsQuickViewOpen(true)} className="block relative aspect-[3/4] w-full cursor-pointer">
            <AnimatePresence initial={false}>
              <motion.img 
                key={currentIdx}
                src={images[currentIdx]} 
                alt={product.name} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover filter brightness-95 group-hover:brightness-100 group-hover:scale-[1.05] transition-transform duration-700"
              />
            </AnimatePresence>
          </button>
          
          {/* Wishlist Button Overlay */}
          <button 
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart 
              size={18} 
              className={isInWishlist(product.id) ? "fill-black text-black" : "text-black"} 
              strokeWidth={2}
            />
          </button>
          
          {/* Slideshow Controls (only show if multiple images) */}
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-20"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-20"
              >
                <ChevronRight size={16} />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                {images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-col gap-1 px-1">
          {/* Category */}
          <div className="text-[11px] font-sans font-semibold tracking-wider text-slate-400 uppercase">
            {product.category === 'tops' ? "WOMEN'S FASHION" : product.category}
          </div>
          
          {/* Product Name */}
          <button onClick={() => setIsQuickViewOpen(true)} className="font-sans font-semibold text-[17px] text-black hover:text-black/70 transition-colors text-left cursor-pointer line-clamp-1 truncate block w-full">
            {product.name}
          </button>
          
          {/* Price */}
          <div className="font-sans font-bold text-xl text-black mt-1">
            ₹{product.price.toFixed(0)}
          </div>
          
          {/* Actions Row */}
          <div className="flex items-center justify-between mt-3">
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full font-sans font-semibold text-sm hover:bg-black/80 transition-colors"
            >
              <ShoppingBag size={16} />
              Add to cart
            </button>
            <button 
              onClick={() => setIsQuickViewOpen(true)}
              className="w-10 h-10 flex items-center justify-center text-black hover:bg-black/5 rounded-full transition-colors"
            >
              <Eye size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.div>

      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
