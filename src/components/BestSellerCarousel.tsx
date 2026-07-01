import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BestSellerCarouselProps {
  products: any[];
}

const BestSellerCarousel: React.FC<BestSellerCarouselProps> = ({ products }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show max 10 for laptop, 8 for mobile
  const displayProducts = products.slice(0, isMobile ? 8 : 10);

  return (
    <div className="w-full bg-black py-10 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">Best Sellers</h2>
          <div className="w-16 h-[1px] bg-white/30 mx-auto"></div>
        </div>

        <div className="relative group px-12 md:px-20">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: true,
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            modules={[EffectCoverflow, Navigation, Pagination]}
            className="w-full py-8"
          >
            {[...displayProducts, ...displayProducts, ...displayProducts].map((product, index) => (
              <SwiperSlide key={`${product.id}-${index}`} className="!w-[200px] md:!w-[260px] !flex justify-center transition-all duration-300">
                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl md:text-2xl font-display text-white mb-2 leading-tight uppercase">{product.name}</h3>
                    <p className="text-white/80 font-mono text-xs md:text-sm mb-4">₹{product.price.toFixed(0)}</p>
                    <Link 
                      to={`/product/${product.id}`}
                      className="inline-flex items-center text-[10px] md:text-xs font-mono uppercase tracking-widest text-white hover:text-white/70 transition-colors"
                    >
                      EXPLORE <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Navigation */}
          <button className="swiper-button-prev-custom absolute left-0 md:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center text-white transition-all z-10 cursor-pointer">
            <ChevronLeft size={20} />
          </button>
          <button className="swiper-button-next-custom absolute right-0 md:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 flex items-center justify-center text-white transition-all z-10 cursor-pointer">
            <ChevronRight size={20} />
          </button>
          
          {/* Custom Pagination */}
          <div className="swiper-pagination-custom flex justify-center mt-8 gap-2"></div>

          <style>{`
            .swiper-pagination-custom .swiper-pagination-bullet {
              background-color: white;
              opacity: 0.5;
            }
            .swiper-pagination-custom .swiper-pagination-bullet-active {
              opacity: 1;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCarousel;
