import React, { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-porcelain py-24 font-body">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-display text-ink mb-6 italic">Get in Touch</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-ink/50 max-w-lg mx-auto">
            Questions? Collaborations? Just want to say hello? Drop us a line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-4 text-orchid">
                  <Mail size={20} strokeWidth={1.5} />
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-ink">Email Us</h3>
                </div>
                <a href="mailto:hello@infinite.style" className="text-2xl font-display text-ink hover:text-orchid transition-colors">
                  hello@infinite.style
                </a>
                <p className="text-ink/50 mt-2 text-sm">We aim to respond within 24 hours.</p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4 text-orchid">
                  <MapPin size={20} strokeWidth={1.5} />
                  <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-ink">Studio</h3>
                </div>
                <address className="text-2xl font-display text-ink not-italic">
                  123 Design District<br />
                  Los Angeles, CA 90014
                </address>
                <p className="text-ink/50 mt-2 text-sm">By appointment only.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center bg-champagne/10 border border-champagne/40 p-12 text-center">
                <h3 className="text-3xl font-display text-ink mb-4 italic">Message Sent</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-ink/60">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input 
                    type="text" 
                    required 
                    placeholder="NAME"
                    className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    required 
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    placeholder="SUBJECT"
                    className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30"
                  />
                </div>
                <div>
                  <textarea 
                    required 
                    rows={4}
                    placeholder="YOUR MESSAGE"
                    className="w-full bg-transparent border-b border-ink/30 px-0 py-3 font-mono text-xs uppercase tracking-widest text-ink focus:border-orchid focus:outline-none transition-colors placeholder:text-ink/30 resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full h-14 bg-ink text-porcelain font-mono text-xs uppercase tracking-[0.1em] hover:bg-velvet transition-colors mt-4"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
