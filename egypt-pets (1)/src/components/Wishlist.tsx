import React from 'react';
import { Heart, Trash2, ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface WishlistProps {
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

export default function Wishlist({
  wishlist,
  onToggleWishlist,
  onAddToCart,
  setCurrentView
}: WishlistProps) {
  // Filter products that are in the wishlist array
  const lovedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8 text-left">
        
        {/* Header Title */}
        <div className="border-b border-[#E5E7EB] pb-5">
          <h1 className="text-3xl font-extrabold text-[#1F2937] tracking-tight flex items-center gap-2">
            <Heart className="text-red-500 fill-red-500" />
            Your Wishlist
          </h1>
        </div>

        {lovedProducts.length === 0 ? (
          /* Empty state */
          <div className="border border-dashed border-[#E5E7EB] rounded-3xl py-16 px-4 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto text-2xl">
              ❤️
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-[#1F2937]">Your wishlist is empty</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                No items added to your wishlist yet. Explore our gadgets catalog and tap the heart icon to save items here!
              </p>
            </div>
            <button
              onClick={() => setCurrentView('shop')}
              className="bg-[#F59E0B] hover:bg-amber-600 text-white font-bold text-xs py-3.5 px-8 rounded-xl transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              Explore Products
            </button>
          </div>
        ) : (
          /* Wishlist Items Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lovedProducts.map((product) => (
              <div 
                key={product.id}
                className="group bg-white border border-[#E5E7EB] hover:border-red-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col relative"
              >
                {/* Remove from wishlist button */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white border border-red-100 flex items-center justify-center text-red-500 shadow-xs hover:scale-105 transition-all"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={14} />
                </button>

                {/* Thumbnail */}
                <div 
                  className="w-full aspect-square bg-[#F8F9FA] overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Meta details */}
                <div className="p-4 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                      <span className="text-gray-300 text-[10px]">•</span>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.25 rounded-md">
                        {product.petType === 'both' ? 'Cats & Dogs' : product.petType === 'cats' ? 'Cats' : 'Dogs'}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-sm text-[#1F2937] line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="font-extrabold text-sm text-[#1F2937]">EGP {product.price}</p>
                  </div>

                  {/* Move to Cart actions row */}
                  <div className="mt-4 border-t border-gray-50 pt-3 flex gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="flex-1 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingCart size={13} />
                      Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
