import React from 'react';

const testimonials = [
  { id: 1, text: "The oversized tees are incredibly comfortable and stylish. Exactly what I was looking for.", author: "Rahul S.", rating: 5 },
  { id: 2, text: "I love the modern aesthetic and quality of the fabrics. Will definitely buy again.", author: "Priya M.", rating: 5 },
  { id: 3, text: "Infinite Style perfectly captures that effortless street look with premium vibes.", author: "Karan V.", rating: 4 },
  { id: 4, text: "Fast shipping and the fit is just perfect every time. My new favorite store.", author: "Ananya D.", rating: 5 },
  { id: 5, text: "Amazing quality for the price. The designs are unique and eye-catching.", author: "Vikram R.", rating: 5 }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-porcelain text-ink overflow-hidden relative border-t border-ink/10">
      <h2 className="text-3xl md:text-4xl font-display text-center mb-12 md:mb-16 italic">Loved by You.</h2>
      
      {/* Marquee container */}
      <div className="flex w-full overflow-hidden whitespace-nowrap group">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}
        </style>

        <div className="flex animate-marquee shrink-0 min-w-full pl-4 md:pl-8">
          {testimonials.map((t, idx) => (
            <div key={`a-${idx}`} className="bg-white p-6 md:p-8 rounded-2xl mx-3 md:mx-4 w-[280px] md:w-[350px] whitespace-normal border border-ink/10 shadow-xl flex-shrink-0 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-orchid text-3xl font-serif leading-none">"</div>
                <div className="flex gap-1 text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < t.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
              <p className="font-body text-ink/80 mb-6 leading-relaxed flex-grow">"{t.text}"</p>
              <p className="font-display font-bold text-ink tracking-wide uppercase text-sm">— {t.author}</p>
            </div>
          ))}
        </div>

        <div className="flex animate-marquee shrink-0 min-w-full pl-4 md:pl-8">
          {testimonials.map((t, idx) => (
            <div key={`b-${idx}`} className="bg-white p-6 md:p-8 rounded-2xl mx-3 md:mx-4 w-[280px] md:w-[350px] whitespace-normal border border-ink/10 shadow-xl flex-shrink-0 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="text-orchid text-3xl font-serif leading-none">"</div>
                <div className="flex gap-1 text-yellow-400 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < t.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>
              <p className="font-body text-ink/80 mb-6 leading-relaxed flex-grow">"{t.text}"</p>
              <p className="font-display font-bold text-ink tracking-wide uppercase text-sm">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
