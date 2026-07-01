import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import productsData from '../data/products.json';

const HeroCarousel: React.FC = () => {
  const navigate = useNavigate();
  // Grab 5 featured products for the carousel
  const featuredProducts = productsData.filter(p => p.featured).slice(0, 5);

  return (
    <div className="w-full py-10 px-4">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="max-w-[100vw] sm:max-w-6xl mx-auto pb-16 pt-8"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide 
            key={product.id} 
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer group relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-hotpink/40"
            style={{ width: '320px', height: '450px' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Badge */}
            <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Featured</span>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-white font-display font-bold text-2xl mb-1 drop-shadow-lg leading-tight">{product.name}</h3>
              <p className="text-white/90 font-medium drop-shadow-md text-lg">₹{product.price.toFixed(0)}</p>
              
              <div className="mt-4 flex gap-3">
                <button className="flex-1 bg-white text-gray-900 py-2.5 rounded-full text-sm font-bold hover:bg-hotpink hover:text-white transition-colors shadow-lg">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
