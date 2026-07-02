import React, { useState, useMemo } from 'react';
import { Star, Heart, ShoppingCart, ShieldCheck, HeartHandshake, Truck, RotateCcw, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  setSelectedProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

export default function ProductDetails({
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  setSelectedProduct,
  setCurrentView
}: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'specs'>('description');

  const isWishlisted = wishlist.includes(product.id);

  // Filter related products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  }, [product]);

  const handleRelatedClick = (relatedProd: Product) => {
    setSelectedProduct(relatedProd);
    setActiveImage(relatedProd.image);
    setQuantity(1);
    setActiveTab('description');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-12 text-left">
        
        {/* Back navigation */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-gray-400 hover:text-[#F59E0B] transition-colors"
          >
            Shop
          </button>
          <span className="text-gray-300 text-xs">/</span>
          <span className="text-xs font-semibold text-gray-500 capitalize">{product.category}</span>
          <span className="text-gray-300 text-xs">/</span>
          <span className="text-xs font-bold text-[#1F2937] truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Grid Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Images Gallery Column (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image Frame */}
            <div className="w-full aspect-square bg-[#F8F9FA] rounded-2xl overflow-hidden border border-[#E5E7EB] relative flex items-center justify-center">
              {product.isBestSeller && (
                <span className="absolute top-4 left-4 z-10 bg-[#F59E0B] text-white font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  Best Seller
                </span>
              )}
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Gallery Thumbnails List */}
            <div className="flex gap-3">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-20 rounded-xl bg-[#F8F9FA] border-2 overflow-hidden transition-all ${
                    activeImage === imgUrl ? 'border-[#F59E0B]' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Details & Purchasing Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-[10px] font-extrabold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {product.petType === 'both' ? 'Cats & Dogs' : product.petType === 'cats' ? 'Cats' : 'Dogs'}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">{product.name}</h1>
              
              {/* Ratings and reviews */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'} />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1F2937]">{product.rating}</span>
                <span className="text-gray-300 text-xs">•</span>
                <span className="text-xs text-gray-500 font-medium">({product.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Price Frame */}
            <div className="border-t border-b border-gray-100 py-4 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-[#1F2937]">EGP {product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm text-gray-400 line-through font-medium">EGP {product.originalPrice}</span>
                  <span className="text-xs font-bold text-[#10B981] bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save EGP {product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Interactive Quantity & Buy Row */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E5E7EB] rounded-xl bg-[#F8F9FA] overflow-hidden">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 font-bold text-sm text-[#1F2937] min-w-[20px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => Math.min(prev + 1, product.stock))}
                    className="px-4 py-2 text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  onClick={handleAddToCartClick}
                  className="flex-1 bg-[#F59E0B] hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 text-sm cursor-pointer"
                  id="details-add-to-cart"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                {/* Wishlist Icon */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 flex items-center justify-center transition-colors ${
                    isWishlisted ? 'text-red-500 border-red-200 bg-red-50/20' : 'text-gray-400'
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                </button>
              </div>

              {/* Stock availability banner */}
              <p className="text-xs text-gray-500 font-medium">
                Availability: {product.stock > 0 ? (
                  <span className="text-[#10B981] font-bold">In Stock ({product.stock} units available)</span>
                ) : (
                  <span className="text-red-500 font-bold">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-[#F8F9FA] rounded-2xl p-4 border border-[#E5E7EB] grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 text-left">
                <Truck size={16} className="text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[11px] text-[#1F2937]">Fast Local Shipping</p>
                  <p className="text-[10px] text-gray-500">Delivered within 1-3 business days.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-left">
                <ShieldCheck size={16} className="text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[11px] text-[#1F2937]">1-Year Egypt Warranty</p>
                  <p className="text-[10px] text-gray-500">Secure manufacturer support guarantee.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Description / Specs Container */}
        <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden">
          {/* Tab buttons heading */}
          <div className="bg-[#F8F9FA] border-b border-[#E5E7EB] flex">
            {[
              { id: 'description', label: 'Description' },
              { id: 'features', label: 'Key Features' },
              { id: 'specs', label: 'Specifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider border-r border-[#E5E7EB] transition-colors relative ${
                  activeTab === tab.id 
                    ? 'bg-white text-[#F59E0B] border-b-2 border-b-[#F59E0B]' 
                    : 'text-gray-500 hover:text-[#1F2937]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab contents body */}
          <div className="p-6 text-sm text-gray-600 leading-relaxed">
            {activeTab === 'description' && (
              <p className="text-xs sm:text-sm font-normal text-gray-500 max-w-4xl leading-relaxed">
                {product.description}
              </p>
            )}

            {activeTab === 'features' && (
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-gray-500 font-normal">
                {product.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-xl border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 p-3 text-xs">
                    <span className="font-bold text-gray-500 capitalize">{key}</span>
                    <span className="col-span-2 text-[#1F2937] font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-extrabold text-[#1F2937] tracking-tight">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProd) => (
                <div
                  key={relatedProd.id}
                  onClick={() => handleRelatedClick(relatedProd)}
                  className="group bg-white border border-gray-200 hover:border-amber-200 rounded-2xl p-4 cursor-pointer transition-all hover:shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="aspect-square bg-[#F8F9FA] rounded-xl overflow-hidden">
                      <img src={relatedProd.image} alt={relatedProd.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-left space-y-1">
                      <h4 className="font-bold text-xs text-gray-400 uppercase tracking-wider">{relatedProd.category}</h4>
                      <h3 className="font-bold text-sm text-[#1F2937] group-hover:text-[#F59E0B] transition-colors line-clamp-1">{relatedProd.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-extrabold text-sm text-[#1F2937]">EGP {relatedProd.price}</span>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">View Details</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
