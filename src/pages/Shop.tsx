import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SocialCard from '../components/SocialCard';
import { motion, AnimatePresence } from 'framer-motion';

import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';

const Shop: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    let result = productsData;
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    return result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.newArrival ? 1 : -1; // Default newest
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-porcelain pt-24 pb-16 px-4 sm:px-8 max-w-[1400px] mx-auto w-full">
      <div className="mb-12 border-b border-ink/20 pb-8">
        <h1 className="text-5xl md:text-7xl font-display text-ink mb-6 italic">The Collection</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`garment-tag transition-colors ${activeCategory === 'all' ? 'bg-velvet text-porcelain border-velvet' : 'hover:border-orchid'}`}
            >
              ALL ITEMS
            </button>
            {categoriesData.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`garment-tag transition-colors ${activeCategory === cat.slug ? 'bg-velvet text-porcelain border-velvet' : 'hover:border-orchid'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input 
                type="text" 
                placeholder="SEARCH..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-ink/30 py-2 pl-8 pr-4 font-mono text-xs uppercase focus:outline-none focus:border-orchid transition-colors"
              />
              <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-ink/50" />
            </div>
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 font-mono text-xs uppercase border border-ink/20 px-3 py-2 hover:bg-champagne/20 transition-colors"
            >
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-champagne/10 p-6 border border-champagne flex flex-col md:flex-row gap-8">
                <div>
                  <h4 className="font-mono text-xs text-ink/50 mb-3">SORT BY</h4>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 font-mono text-xs cursor-pointer">
                      <input type="radio" name="sort" checked={sortBy === 'newest'} onChange={() => setSortBy('newest')} className="accent-orchid" />
                      NEWEST ARRIVALS
                    </label>
                    <label className="flex items-center gap-2 font-mono text-xs cursor-pointer">
                      <input type="radio" name="sort" checked={sortBy === 'price-low'} onChange={() => setSortBy('price-low')} className="accent-orchid" />
                      PRICE (LOW - HIGH)
                    </label>
                    <label className="flex items-center gap-2 font-mono text-xs cursor-pointer">
                      <input type="radio" name="sort" checked={sortBy === 'price-high'} onChange={() => setSortBy('price-high')} className="accent-orchid" />
                      PRICE (HIGH - LOW)
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-mono text-ink/50 text-sm">NO ITEMS FOUND.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              {index === 3 && (
                <div className="col-span-1">
                  <SocialCard />
                </div>
              )}
              <div className="col-span-1">
                <ProductCard product={product} />
              </div>
            </React.Fragment>
          ))}
          {filteredProducts.length <= 3 && (
            <div className="col-span-1">
              <SocialCard />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
