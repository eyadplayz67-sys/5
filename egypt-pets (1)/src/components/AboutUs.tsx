import React from 'react';
import { ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10 text-left">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Our Story</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] tracking-tight">About Egypt Pets</h1>
          <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed">
            We are Egypt's premier online store specializing in modern smart gadgets, high-quality automatic feeders, and unique travel accessories for cats and dogs.
          </p>
        </div>

        {/* Brand Mission Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-amber-100 bg-amber-50/20 p-6 sm:p-10 rounded-3xl">
          
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2937]">Bringing Smart Pet Tech to Egypt</h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              Founded in 2024 in Heliopolis, Cairo, <strong>Egypt Pets</strong> was born out of a simple need: to provide local pet owners with the highest quality, tested smart gadgets. We understand that your pets are family, and we believe they deserve technology that enhances their wellness.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
              From automatic drinking fountains that keep water fresh to smart feeders with HD cameras and two-way audio, we select and test every device to guarantee safety, reliability, and full durability.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-amber-100 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-[#F59E0B]">5,000+</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Happy Customers</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-[#10B981]">100%</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Safe Materials</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-purple-600">24/7</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Customer Support</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-amber-100 text-center space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-blue-600">1 Year</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Local Warranty</p>
            </div>
          </div>

        </div>

        {/* Our Values Section */}
        <div className="space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-[#1F2937]">Our Values</h2>
            <p className="text-xs text-gray-500">The core principles that guide Egypt Pets every single day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-[#F59E0B]">
                <ShieldCheck size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937]">Premium Quality Assurance</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                Every single automatic fountain, smart feeder, or retractable leash in our store is extensively tested on real pets for security, durability, and functionality before being listed.
              </p>
            </div>

            <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-[#10B981]">
                <Heart size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937]">Pet Health & Wellness First</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                We prioritize BPA-free food-grade plastics, rounded safety designs, and quiet motor systems to ensure your furry companions feel perfectly safe, relaxed, and happy.
              </p>
            </div>

            <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 space-y-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Award size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937]">Local Trustworthy Service</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-normal">
                We believe in providing the ultimate level of post-purchase support. We offer a 14-day replacement scheme, safe cash on delivery, and a robust 1-year product warranty.
              </p>
            </div>

          </div>
        </div>

        {/* Giving back to shelters */}
        <div className="rounded-3xl border border-teal-100 bg-teal-50/20 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 justify-between text-left">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-bold text-base text-[#1F2937] flex items-center gap-2">
              <span>❤️</span> Supporting Local Egyptian Shelters
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed font-normal">
              We are incredibly passionate about helping strays and shelter animals in Cairo and Giza. A portion of every single purchase from Egypt Pets goes directly toward donating standard kibble, medical supplies, and comforting pet beds to local Egyptian animal shelters.
            </p>
          </div>
          <span className="text-4xl shrink-0 select-none">🐾🐈🐕</span>
        </div>

      </div>
    </div>
  );
}
