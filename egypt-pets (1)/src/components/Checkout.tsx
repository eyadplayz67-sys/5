import React, { useState, useMemo } from 'react';
import { CreditCard, Truck, ShieldCheck, ShoppingCart, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
  setCurrentView: (view: string) => void;
  setLastOrder: (order: Order) => void;
}

export default function Checkout({
  cart,
  onClearCart,
  setCurrentView,
  setLastOrder
}: CheckoutProps) {
  // Form fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('cairo');
  const [shippingMethod, setShippingMethod] = useState<'standard'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'meeza' | 'cod'>('cod');

  // Card details state (for Card/Meeza)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment process simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  // Shipping logic: Free shipping above EGP 999, else EGP 50 flat
  const shippingFee = useMemo(() => {
    if (cart.length === 0 || subtotal >= 999) return 0;
    return 50;
  }, [cart, subtotal]);

  // Assume a default 10% discount if subtotal has been discounted (or we can just make standard total calculation)
  const grandTotal = useMemo(() => {
    return subtotal + shippingFee;
  }, [subtotal, shippingFee]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 11) {
      setPhone(val);
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 16) {
      setCardNumber(val);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    if (val.length <= 5) {
      setCardExpiry(val);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 3) {
      setCardCvv(val);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Please enter your full name.';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number.';
    } else {
      // Validate Egyptian phone number (starts with 010, 011, 012, 015, and has 11 digits)
      const phoneRegex = /^01[0125]\d{8}$/;
      if (!phoneRegex.test(phone)) {
        newErrors.phone = 'Enter a valid Egyptian phone number (e.g., 01012345678).';
      }
    }

    if (!address.trim()) newErrors.address = 'Please enter your detailed shipping address.';

    if (paymentMethod === 'card' || paymentMethod === 'meeza') {
      if (cardNumber.length < 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number.';
      }
      if (!cardExpiry.includes('/') || cardExpiry.length < 5) {
        newErrors.cardExpiry = 'Enter expiry date (MM/YY).';
      }
      if (cardCvv.length < 3) {
        newErrors.cardCvv = 'Enter 3-digit CVV.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to top of form to show errors
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    // Start payment simulation
    setIsProcessing(true);
    setProcessingStatus('Validating secure transaction credentials...');

    setTimeout(() => {
      if (paymentMethod === 'cod') {
        setProcessingStatus('Registering Cash on Delivery details...');
      } else if (paymentMethod === 'meeza') {
        setProcessingStatus('Connecting with local Meeza processing network...');
      } else {
        setProcessingStatus('Securing authorization with Visa/Mastercard gateway...');
      }
    }, 1000);

    setTimeout(() => {
      setProcessingStatus('Finalizing your order placement...');
    }, 2000);

    setTimeout(() => {
      // Create order model
      const orderId = `EGP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderModel: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
        customerName: name,
        email,
        phone,
        address,
        city,
        paymentMethod,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        total: grandTotal,
        shippingFee
      };

      setLastOrder(orderModel);
      setIsProcessing(false);
      onClearCart();
      setCurrentView('thank-you');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3200);
  };

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Payment Processing Spinner overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-50 p-6 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl flex flex-col items-center">
            <Loader2 className="animate-spin text-[#F59E0B]" size={48} />
            <div className="space-y-2">
              <h3 className="font-extrabold text-base text-[#1F2937]">Egypt Pets Secure Pay</h3>
              <p className="text-xs font-bold text-[#F59E0B] tracking-wide animate-pulse">
                {processingStatus}
              </p>
              <p className="text-[10px] text-gray-400 font-medium leading-relaxed pt-2 border-t border-gray-100">
                Please do not close this window or refresh the page. We are securely communicating with the Egyptian payment processing nodes.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-8 text-left">
        
        {/* Title */}
        <div className="border-b border-[#E5E7EB] pb-5">
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto space-y-4">
            <p className="text-sm font-semibold text-gray-500">Your cart is empty. You cannot proceed to checkout.</p>
            <button
              onClick={() => setCurrentView('shop')}
              className="bg-[#F59E0B] text-white font-bold px-6 py-3 rounded-xl text-xs"
            >
              Back to Shop
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs Columns (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Customer Info Section */}
              <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white space-y-4">
                <h2 className="font-extrabold text-base text-[#1F2937] flex items-center gap-2 border-b border-gray-50 pb-2.5">
                  <span className="w-6 h-6 rounded-md bg-amber-50 text-[#F59E0B] flex items-center justify-center text-xs">1</span>
                  Customer Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Ahmed Aly"
                      value={name}
                      onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: '' }); }}
                      className={`w-full text-xs bg-white border rounded-xl px-3 py-3 outline-none transition-colors placeholder-gray-400 ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#F59E0B]'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[9px] font-semibold">{errors.name}</p>}
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                    <input
                      type="email"
                      placeholder="e.g. ahmed@gmail.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: '' }); }}
                      className={`w-full text-xs bg-white border rounded-xl px-3 py-3 outline-none transition-colors placeholder-gray-400 ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#F59E0B]'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-[9px] font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Egyptian Mobile Number *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-bold text-gray-400 select-none">
                      +20
                    </span>
                    <input
                      type="tel"
                      placeholder="e.g. 01012345678"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full text-xs bg-white border rounded-xl pl-11 pr-3 py-3 outline-none transition-colors placeholder-gray-400 ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#F59E0B]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[9px] font-semibold">{errors.phone}</p>}
                  <p className="text-[9px] text-gray-400 font-semibold">Our courier will contact you on this number to arrange delivery.</p>
                </div>
              </div>

              {/* Shipping Address Section */}
              <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white space-y-4">
                <h2 className="font-extrabold text-base text-[#1F2937] flex items-center gap-2 border-b border-gray-50 pb-2.5">
                  <span className="w-6 h-6 rounded-md bg-amber-50 text-[#F59E0B] flex items-center justify-center text-xs">2</span>
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1 text-left">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Street Address *</label>
                    <input
                      type="text"
                      placeholder="Building, Street Name, District"
                      value={address}
                      onChange={(e) => { setAddress(e.target.value); if (errors.address) setErrors({ ...errors, address: '' }); }}
                      className={`w-full text-xs bg-white border rounded-xl px-3 py-3 outline-none transition-colors placeholder-gray-400 ${
                        errors.address ? 'border-red-500 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#F59E0B]'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-[9px] font-semibold">{errors.address}</p>}
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">City / Governorate *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full text-xs bg-white border border-[#E5E7EB] focus:border-[#F59E0B] rounded-xl px-3 py-3 outline-none cursor-pointer font-semibold text-[#1F2937]"
                    >
                      <option value="cairo">Cairo (القاهرة)</option>
                      <option value="giza">Giza (الجيزة)</option>
                      <option value="alexandria">Alexandria (الإسكندرية)</option>
                      <option value="qalyubia">Qalyubia (القليوبية)</option>
                      <option value="dakahlia">Dakahlia (الدقهلية)</option>
                      <option value="sharqia">Sharqia (الشرقية)</option>
                      <option value="portsaid">Port Said (بورسعيد)</option>
                      <option value="suez">Suez (السويس)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="border border-[#E5E7EB] rounded-2xl p-6 bg-white space-y-4">
                <h2 className="font-extrabold text-base text-[#1F2937] flex items-center gap-2 border-b border-gray-50 pb-2.5">
                  <span className="w-6 h-6 rounded-md bg-amber-50 text-[#F59E0B] flex items-center justify-center text-xs">3</span>
                  Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Cash on Delivery (COD) */}
                  <div
                    onClick={() => { setPaymentMethod('cod'); setErrors({}); }}
                    className={`border rounded-xl p-4 cursor-pointer text-left flex flex-col justify-between h-24 transition-all ${
                      paymentMethod === 'cod' ? 'border-[#F59E0B] bg-amber-50/20' : 'border-[#E5E7EB] hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">💵</span>
                      <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1F2937]">Cash on Delivery</p>
                      <p className="text-[9px] text-gray-400 font-medium">Pay cash upon package arrival</p>
                    </div>
                  </div>

                  {/* Visa / Mastercard */}
                  <div
                    onClick={() => { setPaymentMethod('card'); setErrors({}); }}
                    className={`border rounded-xl p-4 cursor-pointer text-left flex flex-col justify-between h-24 transition-all ${
                      paymentMethod === 'card' ? 'border-[#F59E0B] bg-amber-50/20' : 'border-[#E5E7EB] hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg">💳</span>
                      <input type="radio" checked={paymentMethod === 'card'} readOnly className="accent-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1F2937]">Visa / Mastercard</p>
                      <p className="text-[9px] text-gray-400 font-medium">Secure online credit processing</p>
                    </div>
                  </div>

                  {/* Meeza local payment option */}
                  <div
                    onClick={() => { setPaymentMethod('meeza'); setErrors({}); }}
                    className={`border rounded-xl p-4 cursor-pointer text-left flex flex-col justify-between h-24 transition-all ${
                      paymentMethod === 'meeza' ? 'border-[#F59E0B] bg-amber-50/20' : 'border-[#E5E7EB] hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-600 uppercase tracking-tighter">meeza</span>
                      <input type="radio" checked={paymentMethod === 'meeza'} readOnly className="accent-[#F59E0B]" />
                    </div>
                    <div>
                      <p className="font-bold text-xs text-[#1F2937]">Meeza Card</p>
                      <p className="text-[9px] text-gray-400 font-medium">Local national card processing</p>
                    </div>
                  </div>
                </div>

                {/* Secure mock card input form (if card/meeza selected) */}
                {(paymentMethod === 'card' || paymentMethod === 'meeza') && (
                  <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#E5E7EB] space-y-4 text-left animate-fade-in">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Demo payment details (Do not enter real credentials)</p>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Card Number *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                          <CreditCard size={14} />
                        </span>
                        <input
                          type="text"
                          placeholder="4000 1234 5678 9010"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className={`w-full text-xs bg-white border rounded-xl pl-9 pr-3 py-2.5 outline-none transition-colors ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                          }`}
                        />
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-[9px] font-semibold">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Expiry Date *</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          className={`w-full text-xs bg-white border rounded-xl px-3 py-2.5 outline-none transition-colors ${
                            errors.cardExpiry ? 'border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                          }`}
                        />
                        {errors.cardExpiry && <p className="text-red-500 text-[9px] font-semibold">{errors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">CVV *</label>
                        <input
                          type="password"
                          placeholder="123"
                          value={cardCvv}
                          onChange={handleCvvChange}
                          className={`w-full text-xs bg-white border rounded-xl px-3 py-2.5 outline-none transition-colors ${
                            errors.cardCvv ? 'border-red-500' : 'border-gray-200 focus:border-[#F59E0B]'
                          }`}
                        />
                        {errors.cardCvv && <p className="text-red-500 text-[9px] font-semibold">{errors.cardCvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Right Summary Column (5 cols) */}
            <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 space-y-6 sticky top-24">
              
              <h2 className="font-extrabold text-base text-[#1F2937] border-b border-[#E5E7EB] pb-3">Your Order</h2>

              {/* Items List in Summary */}
              <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 pr-2">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs font-semibold text-[#1F2937]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="text-left">
                        <p className="line-clamp-1 max-w-[150px]">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400 font-bold">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span>EGP {item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total calculations */}
              <div className="border-t border-[#E5E7EB] pt-4 space-y-2.5 text-xs text-gray-500 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1F2937] font-bold">EGP {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  {shippingFee === 0 ? (
                    <span className="text-[#10B981] font-bold">FREE Delivery</span>
                  ) : (
                    <span className="text-[#1F2937] font-bold">EGP {shippingFee}</span>
                  )}
                </div>
              </div>

              {/* Total Row */}
              <div className="border-t border-[#E5E7EB] pt-4 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-[#1F2937]">Grand Total</span>
                <span className="font-black text-xl text-[#F59E0B]">EGP {grandTotal}</span>
              </div>

              {/* Back & Submit buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl text-xs transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  id="checkout-place-order"
                >
                  <ShieldCheck size={14} />
                  Place Order (EGP {grandTotal})
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentView('cart')}
                  className="w-full bg-white border border-gray-200 text-gray-500 font-semibold py-3 px-4 rounded-xl text-xs hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  Back to Cart
                </button>
              </div>

              {/* Guarantees */}
              <p className="text-[10px] text-gray-400 text-center font-medium leading-relaxed">
                By placing your order, you agree to Egypt Pets Terms of Sale and Privacy Policy. All smart pet electronics are guaranteed by local Egyptian warranty.
              </p>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
