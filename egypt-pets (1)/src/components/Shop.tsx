import React, { useState, useMemo } from 'react';
import { Search, Grid, List, SlidersHorizontal, Heart, ShoppingCart, Star, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ShopProps {
  currentCategory: string;
  setSelectedCategory: (category: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  setSelectedProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Shop({
  currentCategory,
  setSelectedCategory,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  setSelectedProduct,
  setCurrentView,
  searchQuery,
  setSearchQuery
}: ShopProps) {
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when filters change
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePetTypeChange = (type: string) => {
    setSelectedPetType(type);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  // Filtered and Sorted Products
  const processedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (currentCategory && currentCategory !== 'all') {
      result = result.filter((p) => p.category === currentCategory);
    }

    // Pet Type filter
    if (selectedPetType && selectedPetType !== 'all') {
      result = result.filter((p) => p.petType === selectedPetType || p.petType === 'both');
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      // Best Seller / IsNew first
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // Popular (best seller first)
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [currentCategory, selectedPetType, sortBy, searchQuery]);

  // Paginated Products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [processedProducts, currentPage]);

  const totalPages = Math.ceil(processedProducts.length / itemsPerPage) || 1;

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedPetType('all');
    setSortBy('popular');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-6 text-left">
        
        {/* Banner Title */}
        <div className="border-b border-[#E5E7EB] pb-5 space-y-2">
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight">
            {currentCategory 
              ? `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)} Store` 
              : 'Our Premium Catalog'
            }
          </h1>
          <p className="text-xs text-gray-500 font-medium max-w-xl">
            Explore and filter smart pet drinking fountains, self-cleaning automatic feeders, GPS tracking smart collars, and premium carrier backpacks.
          </p>
        </div>

        {/* Control and Toolbar Row */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#F8F9FA] border border-[#E5E7EB] p-4 rounded-2xl">
          
          {/* Search Box inside Shop */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
              <Search size={15} />
            </span>
            <input
              type="text"
              placeholder="Search gadgets, brushes, backpacks..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs text-[#1F2937] bg-white border border-[#E5E7EB] focus:border-[#F59E0B] focus:outline-none rounded-xl pl-9 pr-8 py-2.5 shadow-xs transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sorter and Mobile Filters Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="md:hidden flex items-center gap-2 border border-[#E5E7EB] bg-white text-xs font-bold text-[#1F2937] px-4 py-2.5 rounded-xl hover:bg-gray-50"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            {/* Sorter Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="text-xs font-semibold text-[#1F2937] bg-white border border-[#E5E7EB] focus:border-[#F59E0B] focus:outline-none px-3 py-2.5 rounded-xl cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">New Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT Sidebar Filter Panel (Desktop) */}
          <aside className="hidden md:block md:col-span-3 space-y-6 bg-white border border-[#E5E7EB] rounded-2xl p-5 sticky top-24">
            
            {/* Categories Filter Block */}
            <div className="space-y-3 pb-5 border-b border-gray-100">
              <h3 className="font-bold text-xs text-[#1F2937] uppercase tracking-wider">Device Category</h3>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: '', label: 'All Categories' },
                  { value: 'gadgets', label: 'Pet Gadgets' },
                  { value: 'accessories', label: 'Accessories' },
                  { value: 'grooming', label: 'Grooming & Health' },
                  { value: 'travel', label: 'Travel Bags' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleCategoryChange(item.value)}
                    className={`text-left text-xs font-medium py-2 px-3 rounded-xl transition-all ${
                      (currentCategory || '') === item.value 
                        ? 'bg-amber-50 text-[#F59E0B] font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pet Type Filter Block */}
            <div className="space-y-3 pb-5 border-b border-gray-100">
              <h3 className="font-bold text-xs text-[#1F2937] uppercase tracking-wider">Target Pet</h3>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: 'all', label: 'All Pets (Cats & Dogs)' },
                  { value: 'cats', label: 'Cats Only' },
                  { value: 'dogs', label: 'Dogs Only' }
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handlePetTypeChange(item.value)}
                    className={`text-left text-xs font-medium py-2 px-3 rounded-xl transition-all ${
                      selectedPetType === item.value 
                        ? 'bg-teal-50 text-teal-600 font-bold' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset All Filters Button */}
            <button
              onClick={clearFilters}
              className="w-full border border-dashed border-gray-200 hover:border-red-200 text-xs text-gray-500 hover:text-red-500 font-bold py-2.5 px-4 rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </aside>

          {/* MOBILE Filters Slide-Down Menu */}
          {isMobileFilterOpen && (
            <div className="md:hidden border border-[#E5E7EB] bg-white p-5 rounded-2xl space-y-4 shadow-inner">
              <div className="grid grid-cols-2 gap-4">
                
                {/* Mobile Categories Block */}
                <div className="space-y-2 text-left">
                  <h4 className="font-bold text-[10px] text-gray-400 uppercase tracking-wider">Category</h4>
                  <div className="flex flex-col gap-1">
                    {[
                      { value: '', label: 'All Devices' },
                      { value: 'gadgets', label: 'Pet Gadgets' },
                      { value: 'accessories', label: 'Accessories' },
                      { value: 'grooming', label: 'Grooming' },
                      { value: 'travel', label: 'Travel Gear' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          handleCategoryChange(item.value);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-left text-xs py-1.5 px-2 rounded-lg ${
                          (currentCategory || '') === item.value 
                            ? 'bg-amber-50 text-[#F59E0B] font-bold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Pet Type Block */}
                <div className="space-y-2 text-left">
                  <h4 className="font-bold text-[10px] text-gray-400 uppercase tracking-wider">Target Pet</h4>
                  <div className="flex flex-col gap-1">
                    {[
                      { value: 'all', label: 'All Pets' },
                      { value: 'cats', label: 'Cats' },
                      { value: 'dogs', label: 'Dogs' }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          handlePetTypeChange(item.value);
                          setIsMobileFilterOpen(false);
                        }}
                        className={`text-left text-xs py-1.5 px-2 rounded-lg ${
                          selectedPetType === item.value 
                            ? 'bg-teal-50 text-teal-600 font-bold' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Reset mobile button */}
              <button
                onClick={() => {
                  clearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full border border-dashed border-gray-200 text-xs text-gray-500 py-2 rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* RIGHT Products Catalog Grid (9 cols) */}
          <div className="md:col-span-9 space-y-8">
            
            {/* If no products matches filters */}
            {processedProducts.length === 0 ? (
              <div className="border border-dashed border-[#E5E7EB] rounded-3xl py-16 px-4 text-center max-w-lg mx-auto">
                <span className="text-4xl">🔍</span>
                <h3 className="font-bold text-base text-[#1F2937] mt-4">No matching products found</h3>
                <p className="text-xs text-gray-500 mt-2">
                  Try adjusting your keywords, choosing another category, or resetting all search parameters to view our standard options.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#F59E0B] hover:bg-amber-600 text-white font-semibold text-xs py-2.5 px-6 rounded-xl mt-5 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                {/* Active Filter Indicators */}
                {(currentCategory || selectedPetType !== 'all' || searchQuery) && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Active:</span>
                    {searchQuery && (
                      <span className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        Search: "{searchQuery}"
                        <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {currentCategory && (
                      <span className="flex items-center gap-1 bg-amber-50 text-[#F59E0B] text-xs px-2.5 py-1 rounded-full font-medium">
                        Category: {currentCategory}
                        <button onClick={() => setSelectedCategory('')} className="text-[#F59E0B] hover:text-amber-600">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    {selectedPetType !== 'all' && (
                      <span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs px-2.5 py-1 rounded-full font-medium">
                        Pet: {selectedPetType}
                        <button onClick={() => setSelectedPetType('all')} className="text-teal-600 hover:text-teal-700">
                          <X size={12} />
                        </button>
                      </span>
                    )}
                    <button 
                      onClick={clearFilters} 
                      className="text-xs text-red-500 hover:underline font-bold"
                    >
                      Clear All
                    </button>
                  </div>
                )}

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProducts.map((product) => {
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <div 
                        key={product.id}
                        className="group bg-white border border-[#E5E7EB] hover:border-amber-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col relative"
                      >
                        {/* Status badge */}
                        {product.isBestSeller && (
                          <span className="absolute top-3 left-3 z-10 bg-[#F59E0B] text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                            Best Seller
                          </span>
                        )}
                        {product.isNew && (
                          <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white font-extrabold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                            New
                          </span>
                        )}

                        {/* Wishlist Icon Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-[#E5E7EB] flex items-center justify-center text-gray-400 hover:text-red-500 shadow-xs hover:scale-105 transition-all"
                        >
                          <Heart size={15} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                        </button>

                        {/* Thumbnail */}
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

                        {/* Product Meta Body */}
                        <div className="p-4 flex-1 flex flex-col justify-between text-left">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                              <span className="text-gray-300 text-[10px]">•</span>
                              <span className="text-[10px] font-bold text-[#F59E0B] bg-amber-50 px-1.5 py-0.25 rounded-md">
                                {product.petType === 'both' ? 'Cats & Dogs' : product.petType === 'cats' ? 'Cats' : 'Dogs'}
                              </span>
                            </div>
                            
                            <h3 
                              onClick={() => handleProductClick(product)}
                              className="font-bold text-sm text-[#1F2937] hover:text-[#F59E0B] transition-colors line-clamp-1 cursor-pointer"
                            >
                              {product.name}
                            </h3>

                            {/* Ratings */}
                            <div className="flex items-center gap-1">
                              <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={11} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                                ))}
                              </div>
                              <span className="text-[10px] text-gray-400 font-semibold">({product.reviewCount})</span>
                            </div>
                          </div>

                          {/* Price Tag & Shopping Trigger */}
                          <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-3">
                            <div className="flex flex-col">
                              {product.originalPrice && (
                                <span className="text-[10px] text-gray-400 line-through font-medium">EGP {product.originalPrice}</span>
                              )}
                              <span className="font-extrabold text-sm text-[#1F2937]">EGP {product.price}</span>
                            </div>
                            <button
                              onClick={() => onAddToCart(product)}
                              className="w-9 h-9 border border-[#E5E7EB] hover:bg-[#F59E0B] hover:text-white text-gray-600 rounded-xl flex items-center justify-center transition-all hover:border-[#F59E0B]"
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

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 pt-6">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            currentPage === pageNum 
                              ? 'bg-[#F59E0B] text-white shadow-xs' 
                              : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
