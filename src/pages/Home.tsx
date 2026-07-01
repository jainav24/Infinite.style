import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Gem, RotateCcw, ShieldCheck } from 'lucide-react';
import HeroSlideshow from '../components/HeroSlideshow';
import ProductCard from '../components/ProductCard';
import BestSellerCarousel from '../components/BestSellerCarousel';
import Testimonials from '../components/Testimonials';

import productsData from '../data/products.json';

const valueProps = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free express shipping on orders over ₹999. Delivered to your doorstep in 2–4 days.',
  },
  {
    icon: Gem,
    title: 'Premium Quality',
    description: 'Handpicked fabrics and meticulous craftsmanship in every single piece we curate.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 15-day returns & exchanges — no questions asked, ever.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: '100% encrypted transactions. Your data is always safe with us.',
  },
];

const Home: React.FC = () => {
  const newArrivals = productsData.filter(p => p.newArrival).slice(0, 4);
  const bestSellers = productsData.filter(p => p.featured).slice(0, 10);

  return (
    <div className="min-h-screen bg-porcelain flex flex-col font-body">

      {/* Hero Section: Slideshow */}
      <section className="w-full relative">
        <HeroSlideshow />
      </section>

      {/* Value Proposition Cards */}
      <section className="pt-10 pb-16 px-4 sm:px-8 bg-porcelain">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/60 backdrop-blur-sm border border-champagne/40 rounded-sm p-8 flex flex-col items-center text-center transition-all duration-500 hover:border-orchid/40 hover:shadow-[0_8px_30px_rgba(232,62,140,0.08)] hover:-translate-y-1"
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-champagne/60 group-hover:border-orchid/50 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-champagne/60 group-hover:border-orchid/50 transition-colors duration-500" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-velvet/5 flex items-center justify-center mb-5 group-hover:bg-orchid/10 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-velvet/70 group-hover:text-orchid transition-colors duration-500" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-display text-base tracking-wide text-ink mb-2">
                  {prop.title}
                </h3>

                {/* Divider */}
                <div className="w-8 h-[1px] bg-champagne group-hover:bg-orchid/50 group-hover:w-12 transition-all duration-500 mb-3" />

                {/* Description */}
                <p className="text-xs text-ink/55 leading-relaxed font-body">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Best Seller Carousel */}
      <BestSellerCarousel products={bestSellers} />

      {/* Our Story */}
      <section className="py-20 px-4 sm:px-8 bg-porcelain border-b border-champagne/30">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
                alt="Our Story"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-champagne bg-porcelain flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">Est.<br />2026</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-orchid mb-4 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-display text-ink mb-6 leading-tight">
              Fashion is an <span className="italic text-velvet">infinite loop</span> of self-expression.
            </h2>
            <div className="w-12 h-[1px] bg-orchid mb-6"></div>
            <p className="text-ink/70 leading-relaxed mb-4">
              Born from a desire to break the mold, Infinite.Style.Store is a boutique destination for the bold and the curious. We curate pieces that transcend fleeting trends.
            </p>
            <p className="text-ink/70 leading-relaxed mb-8">
              Every collection is an edit — a carefully selected wardrobe of statement pieces and elevated basics designed to be mixed, matched, and lived in.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border-b border-ink pb-1 font-mono uppercase tracking-widest text-xs hover:text-orchid hover:border-orchid transition-colors"
            >
              Read More <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals - Asymmetric Grid */}
      <section className="py-24 px-4 sm:px-8 max-w-[1400px] mx-auto w-full">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display text-ink mb-4">Just Arrived.</h2>
          <div className="w-full h-[1px] bg-champagne"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12 sm:gap-y-16">
          {newArrivals.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

    </div>
  );
};

export default Home;
