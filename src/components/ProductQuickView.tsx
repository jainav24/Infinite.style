import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

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

interface ProductQuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images || [product.image];

  useEffect(() => {
    if (isOpen && product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [isOpen, product]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
    });
    onClose();
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 md:inset-8 lg:inset-16 bg-porcelain z-[101] overflow-y-auto shadow-2xl md:rounded-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 bg-porcelain border border-ink/10 flex items-center justify-center hover:bg-ink hover:text-porcelain transition-colors rounded-full shadow-md"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            <div className="flex flex-col md:flex-row md:h-full">
              {/* Image Gallery - Left */}
              <div className="w-full md:w-1/2 relative group flex-shrink-0">
                <div className="aspect-[3/4] md:h-full relative overflow-hidden bg-champagne/10">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${product.name} view ${currentImageIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Slideshow Controls */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-porcelain/80 text-ink border border-ink/20 flex items-center justify-center hover:bg-porcelain transition-colors opacity-0 group-hover:opacity-100 z-10"
                      >
                        <ChevronLeft size={20} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-porcelain/80 text-ink border border-ink/20 flex items-center justify-center hover:bg-porcelain transition-colors opacity-0 group-hover:opacity-100 z-10"
                      >
                        <ChevronRight size={20} strokeWidth={1.5} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-1.5 transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-ink' : 'w-1.5 bg-ink/30'} rounded-full`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-8 right-6 md:bottom-auto md:top-6 md:right-6">
                    <div className="garment-tag bg-porcelain text-ink border-ink transform -rotate-3 shadow-xl text-lg px-4 py-2">
                      ₹{product.price.toFixed(0)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details - Right */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col md:overflow-y-auto">
                {/* Breadcrumb */}
                <div className="mb-6 font-mono text-xs uppercase tracking-widest text-ink/50">
                  <button onClick={() => { onClose(); navigate('/'); }} className="hover:text-orchid">Home</button>
                  <span className="mx-2">/</span>
                  <button onClick={() => { onClose(); navigate(`/shop?category=${product.category}`); }} className="hover:text-orchid">{product.category}</button>
                  <span className="mx-2">/</span>
                  <span className="text-ink">{product.name}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-display text-ink mb-4">{product.name}</h1>

                <div className="garment-tag inline-block self-start mb-8 bg-velvet text-porcelain border-velvet">
                  SKU: {product.id.toUpperCase()}
                </div>

                {/* Colors */}
                <div className="mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color ? 'border-orchid scale-110' : 'border-transparent shadow-sm'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-3">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`garment-tag w-11 h-11 flex items-center justify-center transition-colors text-xs ${
                          selectedSize === size ? 'bg-ink text-porcelain border-ink' : 'hover:border-orchid'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <div className="flex gap-3">
                    <div className="flex items-center justify-between border border-ink/20 px-2 h-12 w-28 flex-shrink-0">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 text-ink/50 hover:text-orchid transition-colors"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="font-mono text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 text-ink/50 hover:text-orchid transition-colors"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      onClick={toggleWishlist}
                      className={`h-12 w-12 border flex items-center justify-center transition-colors flex-shrink-0 ${
                        isInWishlist(product.id)
                          ? 'border-orchid bg-orchid/10 text-orchid'
                          : 'border-ink/20 text-ink/50 hover:border-orchid hover:text-orchid'
                      }`}
                    >
                      <Heart size={16} strokeWidth={1.5} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 h-12 bg-ink text-porcelain font-mono text-xs uppercase tracking-widest hover:bg-orchid transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} strokeWidth={1.5} />
                    Add to Cart
                  </button>
                </div>

                {/* Details Accordion */}
                <div className="border-t border-ink/20 pt-4">
                  <button
                    onClick={() => setIsDescOpen(!isDescOpen)}
                    className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-widest text-ink mb-3"
                  >
                    <span>Details & Care</span>
                    {isDescOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <AnimatePresence>
                    {isDescOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-ink/70 leading-relaxed font-light text-sm pb-4">
                          {product.description || 'Premium quality crafted with care.'}
                          <br /><br />
                          Crafted with premium materials. Dry clean only. Do not bleach.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View Full Details Link */}
                <button
                  onClick={() => { onClose(); navigate(`/product/${product.id}`); }}
                  className="mt-auto pt-6 font-mono text-xs uppercase tracking-widest text-ink/50 hover:text-orchid transition-colors text-left border-t border-ink/10"
                >
                  View Full Details →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
