import React, { useState } from 'react';
import { Search, User, ShoppingCart, Heart, Menu, X, ChevronDown, Phone, Clock, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cart: CartItem[];
  wishlist: string[];
  onSearch: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

export default function Header({
  currentView,
  setCurrentView,
  cart,
  wishlist,
  onSearch,
  setSelectedCategory
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    setCurrentView('shop');
    setIsSearchBarVisible(false);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentView('shop');
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'Home', view: 'home' },
    { label: 'Shop', view: 'shop' },
    { label: 'About Us', view: 'about' },
    { label: 'Contact', view: 'contact' }
  ];

  return (
    <header className="w-full z-50 bg-white">
      {/* Top Banner Row */}
      <div className="w-full bg-[#F8F9FA] border-b border-[#E5E7EB] py-2 px-4 text-xs text-[#1F2937] flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium">
            <MapPin size={13} className="text-[#F59E0B]" />
            Delivering across Egypt
          </span>
          <span className="hidden sm:flex items-center gap-1.5 font-medium">
            Free delivery on orders above <strong className="text-[#F59E0B]">EGP 999</strong>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+201001234567" className="flex items-center gap-1.5 hover:text-[#F59E0B] transition-colors font-medium">
            <Phone size={13} className="text-[#F59E0B]" />
            +20 100 123 4567
          </a>
          <span className="flex items-center gap-1.5 font-medium">
            <Clock size={13} className="text-[#F59E0B]" />
            Mon - Sat: 10AM - 8PM
          </span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="sticky top-0 w-full bg-white border-b border-[#E5E7EB] py-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => { setCurrentView('home'); setSelectedCategory(''); }}
            className="flex items-center gap-2 cursor-pointer group"
            id="header-logo"
          >
            <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm transition-transform duration-300 group-hover:scale-105">
              🐾
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-[#1F2937] leading-tight">
                EGYPT <span className="text-[#F59E0B]">PETS</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase -mt-0.5">
                Happy Pets, Happy Life
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#1F2937]">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setCurrentView(link.view);
                  if (link.view === 'shop') setSelectedCategory('');
                }}
                className={`relative py-2 hover:text-[#F59E0B] transition-colors ${
                  currentView === link.view 
                    ? 'text-[#F59E0B] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#F59E0B]' 
                    : 'text-[#1F2937]'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setIsCategoriesDropdownOpen(false), 200)}
                className="flex items-center gap-1 py-2 hover:text-[#F59E0B] transition-colors text-[#1F2937]"
              >
                Categories
                <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoriesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-md py-2 w-48 z-50">
                  <button onClick={() => selectCategory('gadgets')} className="w-full text-left px-4 py-2 hover:bg-[#F8F9FA] hover:text-[#F59E0B] text-sm text-[#1F2937] transition-colors">
                    Pet Gadgets
                  </button>
                  <button onClick={() => selectCategory('accessories')} className="w-full text-left px-4 py-2 hover:bg-[#F8F9FA] hover:text-[#F59E0B] text-sm text-[#1F2937] transition-colors">
                    Pet Accessories
                  </button>
                  <button onClick={() => selectCategory('grooming')} className="w-full text-left px-4 py-2 hover:bg-[#F8F9FA] hover:text-[#F59E0B] text-sm text-[#1F2937] transition-colors">
                    Grooming Tools
                  </button>
                  <button onClick={() => selectCategory('travel')} className="w-full text-left px-4 py-2 hover:bg-[#F8F9FA] hover:text-[#F59E0B] text-sm text-[#1F2937] transition-colors">
                    Travel Bags & Gear
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Icons Row */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Toggle */}
            <div className="relative">
              {isSearchBarVisible ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 z-50 flex items-center bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 shadow-sm w-48 sm:w-64">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search gadgets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs text-[#1F2937] bg-transparent outline-none focus:ring-0 placeholder-gray-400"
                  />
                  <button type="submit" className="text-gray-500 hover:text-[#F59E0B]">
                    <Search size={14} />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsSearchBarVisible(false)}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsSearchBarVisible(true)}
                  className="p-2 text-[#1F2937] hover:text-[#F59E0B] transition-colors relative"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className="p-2 text-[#1F2937] hover:text-[#F59E0B] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} className={currentView === 'wishlist' ? 'fill-[#F59E0B] text-[#F59E0B]' : ''} />
              {wishlistItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistItemsCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setCurrentView('cart')}
              className="p-2 text-[#1F2937] hover:text-[#F59E0B] transition-colors relative"
              aria-label="Shopping Cart"
              id="header-cart-btn"
            >
              <ShoppingCart size={20} className={currentView === 'cart' ? 'text-[#F59E0B]' : ''} />
              {cartItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#F59E0B] text-white font-bold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-[#1F2937] hover:text-[#F59E0B] transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white px-4 py-4 space-y-3 shadow-inner">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => {
                  setCurrentView(link.view);
                  if (link.view === 'shop') setSelectedCategory('');
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2.5 px-4 rounded-xl text-sm font-medium transition-colors ${
                  currentView === link.view 
                    ? 'bg-amber-50 text-[#F59E0B]' 
                    : 'text-[#1F2937] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Mobile Categories Accordion */}
            <div className="border-t border-gray-100 pt-2 mt-1">
              <span className="block px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-1 mt-1">
                <button 
                  onClick={() => selectCategory('gadgets')} 
                  className="text-left py-2 px-4 rounded-xl text-xs font-medium text-[#1F2937] hover:bg-gray-50"
                >
                  Pet Gadgets
                </button>
                <button 
                  onClick={() => selectCategory('accessories')} 
                  className="text-left py-2 px-4 rounded-xl text-xs font-medium text-[#1F2937] hover:bg-gray-50"
                >
                  Pet Accessories
                </button>
                <button 
                  onClick={() => selectCategory('grooming')} 
                  className="text-left py-2 px-4 rounded-xl text-xs font-medium text-[#1F2937] hover:bg-gray-50"
                >
                  Grooming Tools
                </button>
                <button 
                  onClick={() => selectCategory('travel')} 
                  className="text-left py-2 px-4 rounded-xl text-xs font-medium text-[#1F2937] hover:bg-gray-50"
                >
                  Travel Gear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
