import React from 'react';
import { Truck } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onViewCategories: () => void;
}

export default function Hero({ onShopNow, onViewCategories }: HeroProps) {
  return (
    <section className="relative w-full py-6 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto rounded-3xl bg-amber-50/40 border border-amber-100 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 p-6 sm:p-10 lg:p-16">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-6 space-y-6 flex flex-col items-start text-left z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F2937] tracking-tight leading-tight">
              Essential Gadgets for <span className="text-[#F59E0B]">Happy Pets</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-xl font-normal leading-relaxed">
              Discover high-quality pet gadgets that make life easier, healthier, and more fun for your furry friends.
            </p>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto bg-[#F59E0B] hover:bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-center text-sm"
                id="hero-shop-btn"
              >
                Shop Now
              </button>
              <button
                onClick={onViewCategories}
                className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-[#1F2937] font-semibold px-8 py-3.5 rounded-xl transition-all text-center text-sm"
              >
                View Categories
              </button>
            </div>
          </div>

          {/* Hero Right Image & Badge */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-none aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <img
                src="assets/images/hero_banner_dog_feeder_1783014729405.jpg"
                alt="Golden retriever sitting next to a modern automatic smart pet feeder gadget"
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Fast Delivery Floating Badge */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl py-3 px-4 shadow-md flex items-center gap-3 max-w-[200px] transition-transform hover:-translate-y-1">
              <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-[#F59E0B] shrink-0">
                <Truck size={18} />
              </div>
              <div className="text-left">
                <p className="font-bold text-xs text-[#1F2937] leading-tight">Fast Delivery</p>
                <p className="text-[10px] text-gray-500 font-medium">Across Egypt</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
