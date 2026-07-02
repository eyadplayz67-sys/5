import React, { useState, useMemo } from 'react';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Truck, ShieldCheck, Percent } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  setCurrentView: (view: string) => void;
}

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  setCurrentView
}: CartProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  // Shipping logic: Free shipping above EGP 999, else EGP 50 flat
  const shippingFee = useMemo(() => {
    if (cart.length === 0 || subtotal >= 999) return 0;
    return 50;
  }, [cart, subtotal]);

  const discountAmount = useMemo(() => {
    return Math.round(subtotal * (discountPercent / 100));
  }, [subtotal, discountPercent]);

  const grandTotal = useMemo(() => {
    return subtotal - discountAmount + shippingFee;
  }, [subtotal, discountAmount, shippingFee]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'EGYPT10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('Promo code "EGYPT10" (10% discount) applied successfully!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try "EGYPT10"!');
      setPromoSuccess('');
    }
  };

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8 text-left">
        
        {/* Page Title */}
        <div className="border-b border-[#E5E7EB] pb-5">
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight flex items-center gap-2">
            <ShoppingBag className="text-[#F59E0B]" />
            Your Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          /* Empty state */
          <div className="border border-dashed border-[#E5E7EB] rounded-3xl py-16 px-4 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-[#F59E0B] mx-auto text-2xl">
              🛒
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1F2937]">Your cart is empty</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Looks like you haven't added any smart pet gadgets to your basket yet. Check out our latest products!
              </p>
            </div>
            <button
              onClick={() => setCurrentView('shop')}
              className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs py-3.5 px-8 rounded-xl transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Start Shopping
            </button>
          </div>
        ) : (
          /* Main Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items Table Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden divide-y divide-[#E5E7EB]">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4 sm:p-6 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                    
                    {/* Item Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-[#F8F9FA] rounded-xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-left space-y-1.5">
                        <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.25 rounded-md uppercase tracking-wider">
                          {item.product.category}
                        </span>
                        <h3 className="font-bold text-sm text-[#1F2937] hover:text-[#F59E0B] cursor-pointer" onClick={() => {}}>
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-semibold">
                          EGP {item.product.price} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Editors & Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-[#E5E7EB] rounded-lg bg-[#F8F9FA] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold text-xs text-[#1F2937] min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Total and Trash can */}
                      <div className="flex items-center gap-4">
                        <span className="font-extrabold text-sm text-[#1F2937] min-w-[90px] text-right">
                          EGP {item.product.price * item.quantity}
                        </span>
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-xl transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>

              {/* Back to Shop Navigation */}
              <button
                onClick={() => setCurrentView('shop')}
                className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#F59E0B] transition-colors"
              >
                <ArrowLeft size={14} />
                Continue Shopping
              </button>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 space-y-6">
              
              <h2 className="font-extrabold text-base text-[#1F2937] border-b border-[#E5E7EB] pb-3">Order Summary</h2>

              {/* Calculations Stack */}
              <div className="space-y-3.5 border-b border-[#E5E7EB] pb-4 text-xs font-medium text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1F2937] font-bold">EGP {subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#10B981]">
                    <span className="flex items-center gap-1">
                      <Percent size={12} /> Promo Discount (10%)
                    </span>
                    <span className="font-bold">-EGP {discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  {shippingFee === 0 ? (
                    <span className="text-[#10B981] font-bold">FREE Delivery</span>
                  ) : (
                    <span className="text-[#1F2937] font-bold">EGP {shippingFee}</span>
                  )}
                </div>

                {shippingFee > 0 && (
                  <div className="bg-amber-50/50 border border-amber-100/50 rounded-xl p-3 text-[10px] text-gray-500 leading-normal flex items-start gap-2">
                    <Truck size={14} className="text-[#F59E0B] shrink-0 mt-0.5" />
                    <span>
                      Add <strong className="text-[#F59E0B]">EGP {999 - subtotal}</strong> more to qualify for <strong>FREE shipping</strong>!
                    </span>
                  </div>
                )}
              </div>

              {/* Promo Code input panel */}
              <div className="space-y-2 border-b border-gray-100 pb-4">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider text-left">Have a coupon code?</p>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. EGYPT10"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError('');
                    }}
                    className="flex-1 text-xs bg-white border border-[#E5E7EB] focus:border-[#F59E0B] rounded-xl px-3 py-2 outline-none uppercase placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#1F2937] hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
                {promoError && (
                  <p className="text-red-500 text-[10px] font-semibold text-left ml-1">{promoError}</p>
                )}
                {promoSuccess && (
                  <p className="text-[#10B981] text-[10px] font-bold text-left ml-1">{promoSuccess}</p>
                )}
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="font-extrabold text-sm text-[#1F2937]">Grand Total</span>
                <span className="font-black text-xl text-[#F59E0B]">EGP {grandTotal}</span>
              </div>

              {/* Primary Action */}
              <button
                onClick={() => {
                  // Pass final totals via local state in parent App.tsx
                  // Save discount variables or handle directly in App
                  setCurrentView('checkout');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                id="cart-checkout-btn"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </button>

              {/* Secure checkout info */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-semibold pt-2">
                <ShieldCheck size={12} className="text-[#10B981]" />
                Secure Checkout Guarantee
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
