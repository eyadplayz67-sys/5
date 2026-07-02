import React, { useState } from 'react';
import { ShieldCheck, Heart, ShoppingCart, Star, Award, HeartHandshake, RefreshCw, Eye, ArrowRight, Sparkles, Mail, Plus, Minus, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Product, CartItem } from '../types';
import { PRODUCTS, FAQS, REVIEWS } from '../data';
import Hero from './Hero';

interface HomeProps {
  setCurrentView: (view: string) => void;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  setSelectedProduct: (product: Product) => void;
}

export default function Home({
  setCurrentView,
  setSelectedCategory,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  setSelectedProduct
}: HomeProps) {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailError, setEmailError] = useState('');

  const featuredProducts = PRODUCTS.slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      setEmailError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 5000);
  };

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Hero Banner Component */}
      <Hero 
        onShopNow={() => { setCurrentView('shop'); setSelectedCategory(''); }}
        onViewCategories={() => {
          setCurrentView('shop');
          const element = document.getElementById('featured-categories');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Quality Features Row */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-2 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="font-bold text-xs text-[#1F2937]">High Quality</p>
              <p className="text-[10px] text-gray-500 font-medium">Carefully selected products</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-[#F59E0B] shrink-0">
              🐾
            </div>
            <div>
              <p className="font-bold text-xs text-[#1F2937]">Safe for Pets</p>
              <p className="text-[10px] text-gray-500 font-medium">100% pet-friendly tech</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] shrink-0">
              🚚
            </div>
            <div>
              <p className="font-bold text-xs text-[#1F2937]">Fast Delivery</p>
              <p className="text-[10px] text-gray-500 font-medium">Across all Egypt</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] shrink-0">
              <RefreshCw size={18} />
            </div>
            <div>
              <p className="font-bold text-xs text-[#1F2937]">Easy Returns</p>
              <p className="text-[10px] text-gray-500 font-medium">Hassle-free 14-day returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Bento Row */}
      <section id="featured-categories" className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-white">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-extrabold text-[#1F2937] tracking-tight">Shop by Category</h2>
            <p className="text-xs text-gray-500 font-medium">Explore hand-picked premium gadgets for your pets</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div 
              onClick={() => { setSelectedCategory('gadgets'); setCurrentView('shop'); }}
              className="group cursor-pointer rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-100/50 hover:border-amber-200 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl mb-3">🔋</span>
              <h3 className="font-bold text-sm text-[#1F2937] group-hover:text-[#F59E0B] transition-colors">Smart Gadgets</h3>
              <p className="text-[10px] text-gray-500 font-medium mt-1">Automatic feeders, cameras & GPS</p>
            </div>

            <div 
              onClick={() => { setSelectedCategory('accessories'); setCurrentView('shop'); }}
              className="group cursor-pointer rounded-2xl bg-teal-50/40 hover:bg-teal-50 border border-teal-100/50 hover:border-teal-200 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl mb-3">🧣</span>
              <h3 className="font-bold text-sm text-[#1F2937] group-hover:text-teal-600 transition-colors">Accessories</h3>
              <p className="text-[10px] text-gray-500 font-medium mt-1">Smart collars, toys & harnesses</p>
            </div>

            <div 
              onClick={() => { setSelectedCategory('grooming'); setCurrentView('shop'); }}
              className="group cursor-pointer rounded-2xl bg-purple-50/40 hover:bg-purple-50 border border-purple-100/50 hover:border-purple-200 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl mb-3">🧼</span>
              <h3 className="font-bold text-sm text-[#1F2937] group-hover:text-purple-600 transition-colors">Grooming & Hygiene</h3>
              <p className="text-[10px] text-gray-500 font-medium mt-1">Self-cleaning brushes & vacuums</p>
            </div>

            <div 
              onClick={() => { setSelectedCategory('travel'); setCurrentView('shop'); }}
              className="group cursor-pointer rounded-2xl bg-blue-50/40 hover:bg-blue-50 border border-blue-100/50 hover:border-blue-200 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-4xl mb-3">🎒</span>
              <h3 className="font-bold text-sm text-[#1F2937] group-hover:text-blue-600 transition-colors">Travel Gear</h3>
              <p className="text-[10px] text-gray-500 font-medium mt-1">Space-capsule backpacks & beds</p>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Products + Secure Payments Row (Bento Layout) */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="text-left space-y-1">
              <h2 className="text-2xl font-extrabold text-[#1F2937] tracking-tight">Popular Products</h2>
              <p className="text-xs text-gray-500 font-medium">Top selling tech gadget devices</p>
            </div>
            <button
              onClick={() => { setCurrentView('shop'); setSelectedCategory(''); }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#F59E0B] hover:text-amber-600 transition-colors group"
            >
              View All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Main Grid: Products on Left, Sidebar widget on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Products Grid (8 cols) */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {featuredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <div 
                    key={product.id}
                    className="group bg-white border border-[#E5E7EB] hover:border-amber-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col relative"
                  >
                    {/* Badge */}
                    {product.isBestSeller && (
                      <span className="absolute top-3 left-3 z-10 bg-[#F59E0B] text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Best Seller
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#E5E7EB] flex items-center justify-center text-gray-400 hover:text-red-500 shadow-xs hover:scale-105 transition-all"
                    >
                      <Heart size={15} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                    </button>

                    {/* Image Area */}
                    <div 
                      onClick={() => handleProductClick(product)}
                      className="w-full aspect-square bg-[#F8F9FA] overflow-hidden cursor-pointer relative"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content Area */}
                    <div className="p-4 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                          <span className="text-gray-300 text-[10px]">•</span>
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.25 rounded-md">
                            {product.petType === 'both' ? 'Cats & Dogs' : product.petType === 'cats' ? 'Cats' : 'Dogs'}
                          </span>
                        </div>
                        <h3 
                          onClick={() => handleProductClick(product)}
                          className="font-bold text-sm text-[#1F2937] hover:text-[#F59E0B] transition-colors line-clamp-1 cursor-pointer"
                        >
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount})</span>
                        </div>
                      </div>

                      {/* Buy Button Row */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex flex-col">
                          {product.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through font-medium">EGP {product.originalPrice}</span>
                          )}
                          <span className="font-extrabold text-sm text-[#1F2937]">EGP {product.price}</span>
                        </div>
                        <button
                          onClick={() => onAddToCart(product)}
                          className="w-9 h-9 border border-[#E5E7EB] hover:bg-[#F59E0B] hover:text-white text-gray-600 rounded-xl flex items-center justify-center transition-colors hover:border-[#F59E0B]"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Widget: Secure Payments (3 cols) */}
            <div className="lg:col-span-3 bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 text-center flex flex-col justify-between h-full min-h-[380px]">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-[#F59E0B] mx-auto shadow-xs">
                  <ShieldCheck size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-extrabold text-base text-[#1F2937]">Secure Payments</h3>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Pay safely with your local Egyptian card, Meeza card, or cash on delivery. All transactions are protected.
                  </p>
                </div>

                {/* Local Brand Logos Grid */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <span className="bg-white px-2 py-1 border border-gray-100 rounded-md text-[10px] font-extrabold text-[#1F2937] tracking-wider uppercase">
                    Visa
                  </span>
                  <span className="bg-white px-2 py-1 border border-gray-100 rounded-md text-[10px] font-extrabold text-blue-600 tracking-wider uppercase">
                    Mastercard
                  </span>
                  <span className="bg-white px-2 py-1 border border-gray-100 rounded-md text-[10px] font-extrabold text-emerald-600 tracking-tight lowercase">
                    meeza
                  </span>
                  <span className="bg-white px-2 py-1 border border-gray-100 rounded-md text-[10px] font-extrabold text-gray-500 tracking-tight">
                    💵 COD
                  </span>
                </div>
              </div>

              <button
                onClick={() => { setCurrentView('shop'); setSelectedCategory(''); }}
                className="w-full bg-[#F59E0B] hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors shadow-xs hover:shadow-md mt-6"
              >
                Shop with Confidence
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Premium Standards</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Why Choose Egypt Pets?</h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              We design and curate smart technology products that help your cats and dogs lead healthier lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-left space-y-4 hover:border-amber-200 transition-colors">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-[#F59E0B]">
                <Award size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937]">Egyptian Standards & Support</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Dedicated local warranty and phone support based right here in Cairo. We speak your language and understand your needs.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-left space-y-4 hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-[#10B981]">
                <HeartHandshake size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937]">Safety Tested Materials</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                All electrical gadgets are fully tested, chemical-free, and certified 100% safe for cats and dogs of all sizes.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-left space-y-4 hover:border-purple-200 transition-colors">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Sparkles size={20} />
              </div>
              <h3 className="font-bold text-sm text-[#1F2937]">Modern Smart Technology</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Take the guesswork out of feeding, drinking, and tracking. Our smart devices help you care for your pet even when you are busy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-[#F8F9FA] border-t border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Testimonials</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Loved by Egyptian Pets & Owners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 text-left space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                  <span className="font-bold text-xs text-[#1F2937]">{review.userName}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 size={10} /> Verified Buyer
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-gray-500">Everything you need to know about our products, shipping, and warranty</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = activeFaqIndex === i;
              return (
                <div 
                  key={i}
                  className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden transition-all text-left"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full py-4 px-6 font-bold text-sm text-[#1F2937] hover:text-[#F59E0B] flex items-center justify-between transition-colors outline-none"
                  >
                    <span>{faq.question}</span>
                    <Plus size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10 bg-white">
        <div className="max-w-7xl mx-auto rounded-3xl bg-teal-50/50 border border-teal-100 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-3 max-w-md">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-wide">
              <Mail size={14} /> Newsletter
            </div>
            <h2 className="text-2xl font-extrabold text-[#1F2937]">Join the Egypt Pets Family</h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subscribe to get notified about new smart gadget releases, flash sales, and exclusive discounts for our community. No spam, ever!
            </p>
          </div>

          <div className="w-full max-w-sm">
            {newsletterSubscribed ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs">
                <CheckCircle2 size={18} className="text-[#10B981]" />
                <div>
                  <p className="font-bold">Successfully Subscribed!</p>
                  <p className="font-medium text-[10px]">Check your inbox for a 10% discount coupon code.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex items-center bg-white border border-gray-200 focus-within:border-[#F59E0B] rounded-xl p-1 shadow-xs transition-colors">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setEmailError('');
                    }}
                    className="w-full text-xs text-[#1F2937] px-3 py-2 bg-transparent outline-none placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {emailError && (
                  <p className="text-red-500 text-[10px] text-left font-semibold ml-2">{emailError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
