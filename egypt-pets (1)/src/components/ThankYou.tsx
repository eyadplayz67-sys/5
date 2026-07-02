import React from 'react';
import { CheckCircle, Calendar, Phone, MapPin, ArrowRight, ShoppingBag } from 'lucide-react';
import { Order } from '../types';

interface ThankYouProps {
  order: Order | null;
  setCurrentView: (view: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function ThankYou({
  order,
  setCurrentView,
  setSelectedCategory
}: ThankYouProps) {
  if (!order) {
    return (
      <div className="w-full bg-white px-4 py-16 text-center">
        <p className="text-sm font-semibold text-gray-500">No active order found.</p>
        <button
          onClick={() => setCurrentView('home')}
          className="bg-[#F59E0B] text-white font-bold py-2.5 px-6 rounded-xl text-xs mt-4"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-2xl mx-auto border border-[#E5E7EB] bg-white rounded-3xl p-6 sm:p-10 shadow-sm text-left space-y-8 animate-fade-in">
        
        {/* Header Success Section */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-50 text-[#10B981] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle size={36} />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold text-[#10B981] uppercase tracking-widest">Order Placed Successfully!</span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1F2937]">Thank You For Your Order!</h1>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              We appreciate your business. Your smart pet gadget is being prepared for shipping from Heliopolis warehouse.
            </p>
          </div>
        </div>

        {/* Order ID Banner */}
        <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 text-xs">
          <div className="text-left">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Order Number</p>
            <p className="font-extrabold text-sm text-[#1F2937] mt-0.5">{order.id}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Estimated Delivery</p>
            <p className="font-extrabold text-sm text-[#10B981] mt-0.5">1 - 3 Business Days</p>
          </div>
        </div>

        {/* Delivery Details Block */}
        <div className="space-y-4">
          <h2 className="font-extrabold text-sm text-[#1F2937] border-b border-gray-50 pb-2">Delivery Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-500 font-medium">
            <div className="space-y-2 text-left">
              <p className="flex items-center gap-2">
                <Calendar size={14} className="text-[#F59E0B]" />
                <span>Date: <strong className="text-[#1F2937]">{order.date}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-[#F59E0B]" />
                <span>Contact: <strong className="text-[#1F2937]">{order.phone}</strong></span>
              </p>
            </div>

            <div className="space-y-2 text-left">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <span>Address: <strong className="text-[#1F2937]">{order.address}, {order.city}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                💵
                <span>Payment: <strong className="text-[#1F2937] uppercase">{order.paymentMethod}</strong></span>
              </p>
            </div>
          </div>
        </div>

        {/* Items purchased summary */}
        <div className="space-y-3">
          <h2 className="font-extrabold text-sm text-[#1F2937] border-b border-gray-50 pb-2">Order Items</h2>
          <div className="divide-y divide-gray-50">
            {order.items.map((item) => (
              <div key={item.productId} className="py-2 flex justify-between items-center text-xs font-semibold text-[#1F2937]">
                <span className="text-gray-500">
                  {item.name} <span className="text-gray-400 font-bold ml-1">x{item.quantity}</span>
                </span>
                <span>EGP {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E7EB] pt-3 flex justify-between items-baseline font-bold text-xs">
            <span className="text-gray-500">Grand Total Paid</span>
            <span className="text-sm font-extrabold text-[#F59E0B]">EGP {order.total}</span>
          </div>
        </div>

        {/* Courier Next steps alert */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-950 font-normal leading-relaxed flex gap-3 items-start">
          <span className="text-lg">📢</span>
          <div>
            <p className="font-bold">Next Steps:</p>
            <p className="mt-1">
              Our shipping partner courier will contact you on <strong className="underline">{order.phone}</strong> shortly to align the exact timing of delivery to your door. If you selected COD, please make sure to have cash available on site.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setCurrentView('shop');
              setSelectedCategory('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <ShoppingBag size={14} />
            Continue Shopping
            <ArrowRight size={14} />
          </button>
          
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="sm:px-6 bg-white border border-gray-200 text-gray-500 font-semibold py-3.5 rounded-xl text-xs hover:bg-gray-50 transition-colors"
          >
            Return Home
          </button>
        </div>

      </div>
    </div>
  );
}
