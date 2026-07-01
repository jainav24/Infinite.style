import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Minus, Plus, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import InfinityRail from '../components/InfinityRail';
import { motion, AnimatePresence } from 'framer-motion';

import productsData from '../data/products.json';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = productsData.find(p => p.id === id);
  const relatedProducts = productsData.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 5);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product?.images || (product ? [product.image] : []);

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-porcelain">
        <div className="text-center">
          <h2 className="text-4xl font-display mb-4 text-ink">Product Not Found</h2>
          <button onClick={() => navigate('/shop')} className="garment-tag hover:bg-ink hover:text-porcelain transition-colors">
            Return to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image, // or images[0] if applicable, but product.image is standard
      quantity: quantity,
      selectedColor: selectedColor,
      selectedSize: selectedSize
    });
    alert('Added to cart! (Toast integration pending)');
  };

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-porcelain font-body">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16">
        
        {/* Breadcrumb */}
        <div className="mb-8 font-mono text-xs uppercase tracking-widest text-ink/50">
          <button onClick={() => navigate('/')} className="hover:text-orchid">Home</button>
          <span className="mx-2">/</span>
          <button onClick={() => navigate(`/shop?category=${product.category}`)} className="hover:text-orchid">{product.category}</button>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
          
          {/* Image Gallery */}
          <div className="relative group">
            <div className="aspect-[3/4] bg-champagne/10 relative overflow-hidden">
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
              {/* Swing Tag Price */}
              <div className="absolute top-8 right-8">
                <div className="garment-tag bg-porcelain text-ink border-ink transform rotate-3 shadow-xl text-lg px-4 py-2">
                  ₹{product.price.toFixed(0)}
                </div>
                <div className="w-[1px] h-16 bg-champagne absolute -top-16 left-1/2 -z-10 origin-bottom rotate-3"></div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-8">
            <h1 className="text-4xl md:text-5xl font-display text-ink mb-6">{product.name}</h1>
            
            <div className="garment-tag inline-block self-start mb-12 bg-velvet text-porcelain border-velvet">
              SKU: {product.id.toUpperCase()}
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-4">Color</h3>
              <div className="flex gap-4">
                {product.colors.map(color => (
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
            <div className="mb-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-ink/60 mb-4">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`garment-tag w-12 h-12 flex items-center justify-center transition-colors ${
                      selectedSize === size ? 'bg-ink text-porcelain border-ink' : 'hover:border-orchid'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <div className="flex gap-4">
                <div className="flex items-center justify-between border border-ink/20 px-2 h-14 w-32 flex-shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-ink/50 hover:text-orchid transition-colors"
                  >
                    <Minus size={16} strokeWidth={1.5} />
                  </button>
                  <span className="font-mono text-sm font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-ink/50 hover:text-orchid transition-colors"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </button>
                </div>

                <button 
                  onClick={toggleWishlist}
                  className={`h-14 w-14 border flex items-center justify-center transition-colors flex-shrink-0 ${
                    isInWishlist(product.id) 
                      ? 'border-orchid bg-orchid/10 text-orchid' 
                      : 'border-ink/20 text-ink/50 hover:border-orchid hover:text-orchid'
                  }`}
                >
                  <Heart size={18} strokeWidth={1.5} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-widest hover:bg-orchid transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} strokeWidth={1.5} />
                Add to Cart
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-ink/20 pt-6">
              <button 
                onClick={() => setIsDescOpen(!isDescOpen)}
                className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-widest text-ink mb-4"
              >
                <span>Details & Care</span>
                {isDescOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              <AnimatePresence>
                {isDescOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-ink/70 leading-relaxed font-light pb-6">
                      {product.description}
                      <br /><br />
                      Crafted with premium materials and designed to make a statement. 
                      Dry clean only. Do not bleach. Cool iron if needed.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products - Small Infinity Rail */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 pt-16 border-t border-champagne/40">
            <h2 className="text-3xl font-display text-ink mb-12 text-center">Complete the Look</h2>
            <InfinityRail 
              products={relatedProducts} 
              height="h-[400px]" 
              title="" 
              radius={4} 
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
