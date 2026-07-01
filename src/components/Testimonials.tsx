import React from 'react';

const testimonials = [
  { id: 1, text: "The oversized tees are incredibly comfortable and stylish. Exactly what I was looking for.", author: "Alex D." },
  { id: 2, text: "I love the modern aesthetic and quality of the fabrics. Will definitely buy again.", author: "Sam R." },
  { id: 3, text: "Infinite Style perfectly captures that effortless street look with premium vibes.", author: "Jordan K." },
  { id: 4, text: "Fast shipping and the fit is just perfect every time. My new favorite store.", author: "Taylor M." },
  { id: 5, text: "Amazing quality for the price. The designs are unique and eye-catching.", author: "Casey L." }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-porcelain text-ink overflow-hidden relative border-t border-ink/10">
      <h2 className="text-3xl md:text-4xl font-display text-center mb-16 italic">Loved by You.</h2>
      
      {/* Marquee container */}
      <div className="flex w-full overflow-hidden whitespace-nowrap group">
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0%); }
            }
            .animate-marquee {
              animation: marquee 30s linear infinite;
            }
            .group:hover .animate-marquee {
              animation-play-state: paused;
            }
          `}
        </style>

        <div className="flex animate-marquee min-w-full pl-8">
          {testimonials.map((t, idx) => (
            <div key={`a-${idx}`} className="bg-white p-8 rounded-2xl mx-4 w-[350px] whitespace-normal border border-ink/10 shadow-xl flex-shrink-0">
              <div className="text-orchid mb-4 text-2xl">"</div>
              <p className="font-body text-ink/80 mb-6 leading-relaxed">"{t.text}"</p>
              <p className="font-display font-bold text-ink tracking-wide uppercase text-sm">— {t.author}</p>
            </div>
          ))}
        </div>

        <div className="flex animate-marquee min-w-full pl-8">
          {testimonials.map((t, idx) => (
            <div key={`b-${idx}`} className="bg-white p-8 rounded-2xl mx-4 w-[350px] whitespace-normal border border-ink/10 shadow-xl flex-shrink-0">
              <div className="text-orchid mb-4 text-2xl">"</div>
              <p className="font-body text-ink/80 mb-6 leading-relaxed">"{t.text}"</p>
              <p className="font-display font-bold text-ink tracking-wide uppercase text-sm">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
