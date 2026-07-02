import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function Footer({ setCurrentView, setSelectedCategory }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (view: string) => {
    setCurrentView(view);
    if (view === 'shop') setSelectedCategory('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#1F2937] text-white border-t border-gray-800">
      
      {/* Top Footer Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
        
        {/* Brand Block (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleLinkClick('home')}>
            <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              🐾
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white leading-tight">
                EGYPT <span className="text-[#F59E0B]">PETS</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase -mt-0.5">
                Happy Pets, Happy Life
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-normal max-w-sm">
            We are dedicated to enhancing the health, happiness, and lifespan of cats and dogs across Egypt by offering premium smart tech gadgets and accessories.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Accepted methods:</span>
            <span className="bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-gray-300">VISA</span>
            <span className="bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-gray-300">MASTER</span>
            <span className="bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-gray-300">MEEZA</span>
            <span className="bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-gray-300">COD</span>
          </div>
        </div>

        {/* Quick Links Column (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-widest text-[#F59E0B]">Quick Navigation</h3>
          <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
            <li>
              <button onClick={() => handleLinkClick('home')} className="hover:text-white hover:underline transition-all">
                Home Landing
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('shop')} className="hover:text-white hover:underline transition-all">
                Shop Gadgets
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('about')} className="hover:text-white hover:underline transition-all">
                About Our Mission
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('contact')} className="hover:text-white hover:underline transition-all">
                Contact & Support
              </button>
            </li>
          </ul>
        </div>

        {/* Categories shortcuts Column (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-widest text-[#F59E0B]">Categories</h3>
          <ul className="space-y-2.5 text-xs text-gray-400 font-medium">
            <li>
              <button onClick={() => { setSelectedCategory('gadgets'); handleLinkClick('shop'); }} className="hover:text-white hover:underline transition-all">
                Smart Devices
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedCategory('accessories'); handleLinkClick('shop'); }} className="hover:text-white hover:underline transition-all">
                Accessories
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedCategory('grooming'); handleLinkClick('shop'); }} className="hover:text-white hover:underline transition-all">
                Hygiene Tools
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedCategory('travel'); handleLinkClick('shop'); }} className="hover:text-white hover:underline transition-all">
                Travel Bags
              </button>
            </li>
          </ul>
        </div>

        {/* Office details Block (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-widest text-[#F59E0B]">Cairo Office</h3>
          <ul className="space-y-3 text-xs text-gray-400 font-medium">
            <li className="flex gap-2 items-start">
              <MapPin size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
              <span>45 El-Merghany St, Heliopolis, Cairo, Egypt</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone size={14} className="text-[#F59E0B] shrink-0" />
              <a href="tel:+201001234567" className="hover:text-white transition-colors">+20 100 123 4567</a>
            </li>
            <li className="flex gap-2 items-center">
              <Mail size={14} className="text-[#F59E0B] shrink-0" />
              <a href="mailto:support@egyptpets.com" className="hover:text-white transition-colors">support@egyptpets.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Row */}
      <div className="border-t border-gray-800 bg-gray-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span>© 2026 Egypt Pets. Crafted with love for cats & dogs.</span>
            <Heart size={10} className="text-red-500 fill-current" />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 bg-gray-900 border border-gray-800 hover:bg-gray-800 text-gray-300 font-bold px-3 py-1.5 rounded-xl transition-all"
            >
              Back to Top
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
