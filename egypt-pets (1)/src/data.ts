import { Product, FAQ, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-water-fountain',
    name: 'Automatic Water Fountain',
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviewCount: 124,
    category: 'gadgets',
    petType: 'both',
    image: 'assets/images/water_fountain_cat_1783014745040.jpg',
    images: [
      'assets/images/water_fountain_cat_1783014745040.jpg',
      'https://picsum.photos/seed/wf1/600/600',
      'https://picsum.photos/seed/wf2/600/600'
    ],
    description: 'Provide your pet with a constant source of fresh, filtered running water. This ultra-quiet automatic water fountain features a multi-stage filtration system that removes impurities, hair, and chlorine, ensuring clean and healthy water that encourages your cats and dogs to drink more.',
    features: [
      'Multi-stage triple filtration system',
      'Ultra-quiet water pump (< 30dB)',
      'Large 2.5L capacity, perfect for multi-pet households',
      'LED water level indicator with auto-shutoff protection',
      'BPA-free food-grade premium plastic'
    ],
    specs: {
      'Capacity': '2.5 Liters',
      'Material': 'BPA-free ABS Plastic',
      'Dimensions': '19 x 19 x 14 cm',
      'Filter Type': 'Activated Carbon & Ion Exchange Resin',
      'Power Connection': 'USB Powered (5V)'
    },
    isBestSeller: true,
    isNew: false,
    stock: 45
  },
  {
    id: 'prod-grooming-brush',
    name: 'Pet Grooming Brush',
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    reviewCount: 86,
    category: 'grooming',
    petType: 'both',
    image: 'assets/images/grooming_brush_pet_1783014759075.jpg',
    images: [
      'assets/images/grooming_brush_pet_1783014759075.jpg',
      'https://picsum.photos/seed/brush1/600/600',
      'https://picsum.photos/seed/brush2/600/600'
    ],
    description: 'Keep your pet’s coat looking healthy, clean, and shiny. This self-cleaning slicker brush gently removes loose hair, tangles, knots, and trapped dirt. The fine bent wire bristles with massage beads penetrate deep into the undercoat without scratching your pet’s sensitive skin, and with a single click, the bristles retract for instant hair disposal.',
    features: [
      'One-click self-cleaning button for effortless hair removal',
      'Fine bent metal bristles with protective massage tips',
      'Ergonomic, non-slip rubberized comfort handle',
      'Suitable for long, short, thick, curly, or wiry fur',
      'Promotes blood circulation and healthy skin'
    ],
    specs: {
      'Material': 'ABS Plastic, Stainless Steel Bristles',
      'Dimensions': '20 x 10 x 5 cm',
      'Weight': '150g',
      'Color': 'Premium Gray & White'
    },
    isBestSeller: true,
    isNew: false,
    stock: 120
  },
  {
    id: 'prod-dog-leash',
    name: 'Retractable Dog Leash',
    price: 249,
    originalPrice: 349,
    rating: 4.6,
    reviewCount: 95,
    category: 'accessories',
    petType: 'dogs',
    image: 'assets/images/retractable_leash_1783014775063.jpg',
    images: [
      'assets/images/retractable_leash_1783014775063.jpg',
      'https://picsum.photos/seed/leash1/600/600',
      'https://picsum.photos/seed/leash2/600/600'
    ],
    description: 'Give your dog the freedom of exploration while maintaining complete control. This robust, heavy-duty retractable dog leash extends up to 5 meters. It is designed with an anti-tangle 360-degree tape-mouth, a reliable quick-lock brake system, and an ergonomic anti-slip handle that is comfortable for long walks in the park.',
    features: [
      '5-meter high-strength nylon tape leash',
      'One-handed quick brake, pause, and lock button mechanism',
      '360° tangle-free design for smooth expansion and retraction',
      'Comfortable ergonomic soft grip handle',
      'For dogs up to 25kg'
    ],
    specs: {
      'Leash Length': '5 meters (16 feet)',
      'Max Tension': 'Supports dogs up to 25 kg',
      'Material': 'Nylon Tape, Premium ABS Casing',
      'Dimensions': '16 x 11 x 3.5 cm'
    },
    isBestSeller: false,
    isNew: false,
    stock: 72
  },
  {
    id: 'prod-travel-backpack',
    name: 'Pet Travel Backpack',
    price: 699,
    originalPrice: 899,
    rating: 4.9,
    reviewCount: 156,
    category: 'travel',
    petType: 'both',
    image: 'assets/images/travel_backpack_pet_1783014789397.jpg',
    images: [
      'assets/images/travel_backpack_pet_1783014789397.jpg',
      'https://picsum.photos/seed/bp1/600/600',
      'https://picsum.photos/seed/bp2/600/600'
    ],
    description: 'Travel in comfort and style with your furry companion. This space-capsule design pet travel backpack features a clear hard bubble window that allows your cat or small dog to look outside and enjoy the scenery. It is equipped with multiple ventilation holes on the sides, mesh panels, a safety strap, and a cozy removable fleece mat for maximum comfort.',
    features: [
      'Unique transparent hard space-capsule bubble dome window',
      '9 large ventilation ports and breathable mesh fabric sides',
      'Internal security leash leash-clip attachment for safety',
      'Comfortable padded shoulder straps and chest buckle support',
      'Removable, washable soft fleece inner comfort liner pad'
    ],
    specs: {
      'Weight Capacity': 'Cats up to 7 kg, Dogs up to 5 kg',
      'Material': 'Food-grade PC, High-density Oxford Cloth',
      'Dimensions': '42 x 32 x 25 cm',
      'Weight': '1.1 kg'
    },
    isBestSeller: true,
    isNew: false,
    stock: 28
  },
  {
    id: 'prod-gps-collar',
    name: 'Smart GPS Tracking Pet Collar',
    price: 1499,
    originalPrice: 1799,
    rating: 4.5,
    reviewCount: 42,
    category: 'gadgets',
    petType: 'both',
    image: 'https://picsum.photos/seed/collar/600/600',
    images: [
      'https://picsum.photos/seed/collar/600/600',
      'https://picsum.photos/seed/collar1/600/600'
    ],
    description: 'Never lose track of your pet again. This lightweight, waterproof smart collar offers real-time GPS tracking with cellular coverage across Egypt. Set virtual safe-zones (geo-fencing) around your house and receive instant mobile notifications the moment your pet wanders off. It also monitors activity levels and sleep patterns to ensure optimal health.',
    features: [
      'Real-time GPS location tracking with no distance limit',
      'Virtual safe-zone fence boundaries with instant alerts',
      'IP67 100% waterproof construction',
      'Daily step count, sleep tracking, and calorie burned monitor',
      'Rechargeable battery lasting up to 10 days on a single charge'
    ],
    specs: {
      'Waterproof Rating': 'IP67',
      'Battery Life': 'Up to 10 Days',
      'Network Support': '2G / 3G / 4G (Egypt networks)',
      'Weight': '35g (Ultra-lightweight)',
      'Collar Size': 'Adjustable 20 cm - 50 cm'
    },
    isBestSeller: false,
    isNew: true,
    stock: 18
  },
  {
    id: 'prod-laser-toy',
    name: 'Interactive Laser Cat Toy',
    price: 349,
    originalPrice: 449,
    rating: 4.7,
    reviewCount: 68,
    category: 'gadgets',
    petType: 'cats',
    image: 'https://picsum.photos/seed/lasertoy/600/600',
    images: [
      'https://picsum.photos/seed/lasertoy/600/600',
      'https://picsum.photos/seed/lasertoy1/600/600'
    ],
    description: 'Keep your cat active and entertained even when you are busy or away. This automated, 360-degree rotating red laser pointer toy generates random patterns that trigger your cat’s natural hunting instincts. It features adjustable speeds, custom timer loops, and a completely safe low-wattage laser emitter.',
    features: [
      '360-degree automatic rotating head',
      'Randomized non-repetitive path patterns',
      'Five selectable trajectory diameter options',
      'Auto-timer: shuts down after 15 minutes of play to prevent exhaustion',
      'Dual power: works with 4 AA batteries or USB plug-in'
    ],
    specs: {
      'Laser Safety': 'Class II Laser (< 1mW power)',
      'Rotation Modes': 'Slow, Medium, Fast, Randomized',
      'Material': 'BPA-free PC & ABS Plastic',
      'Dimensions': '18.5 x 7 x 7 cm'
    },
    isBestSeller: false,
    isNew: true,
    stock: 55
  },
  {
    id: 'prod-smart-feeder',
    name: 'Smart Pet Feeder with Camera',
    price: 2499,
    originalPrice: 2999,
    rating: 4.9,
    reviewCount: 38,
    category: 'gadgets',
    petType: 'both',
    image: 'https://picsum.photos/seed/smartfeeder/600/600',
    images: [
      'https://picsum.photos/seed/smartfeeder/600/600',
      'https://picsum.photos/seed/smartfeeder1/600/600'
    ],
    description: 'Connect with your pet from anywhere in the world. This high-tech automatic food dispenser features a built-in 1080p HD camera with night vision, 2-way audio communication, and mobile app integration. Program custom portion sizes and specific feeding times so your dog or cat gets fed on time, every time, while watching and talking to them through your phone.',
    features: [
      '1080p HD camera with 130° wide-angle lens & night vision',
      'WiFi mobile app schedule control for feeding planning',
      'Two-way audio speaker to talk and listen to your pets',
      'Manual "feed now" remote button on app',
      'Dual power supply backup keeps schedule working during power cuts'
    ],
    specs: {
      'Food Capacity': '4 Liters (Dry food only)',
      'Camera Resolution': 'Full HD 1080p',
      'Audio': 'Built-in microphone & 1W speaker',
      'Connectivity': 'WiFi 2.4 GHz',
      'Dimensions': '33 x 28 x 18 cm'
    },
    isBestSeller: true,
    isNew: true,
    stock: 12
  },
  {
    id: 'prod-heated-bed',
    name: 'Thermostatic Heated Pet Bed',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviewCount: 57,
    category: 'travel',
    petType: 'both',
    image: 'https://picsum.photos/seed/petbed/600/600',
    images: [
      'https://picsum.photos/seed/petbed/600/600',
      'https://picsum.photos/seed/petbed1/600/600'
    ],
    description: 'Provide your pet with the ultimate comfort during cold Cairo winter nights. This smart heated pet bed automatically warms up to your pet’s natural body temperature when they lie on it, and drops to energy-saving standby mode when they leave. It features a chew-resistant cord, waterproof inner fabric, and an ultra-soft removable orthopaedic cover.',
    features: [
      'Smart internal dual thermostat sensors prevent overheating',
      'Chew-resistant steel wrapped cord protection for ultimate safety',
      'Water-resistant, flame-retardant inner polyvinyl material',
      'Soft coral fleece zippered cover, machine washable',
      'Orthopedic memory foam core base supports joints'
    ],
    specs: {
      'Constant Temp': '38°C - 40°C (Natural body temp)',
      'Voltage': '12V Low Voltage for maximum safety',
      'Power Consumption': '15 Watts',
      'Dimensions': '50 x 50 x 12 cm'
    },
    isBestSeller: false,
    isNew: false,
    stock: 22
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'How do you ship inside Egypt and how long does it take?',
    answer: 'We deliver directly to your doorstep anywhere in Egypt (Cairo, Giza, Alexandria, Delta, Canal, Upper Egypt, etc.). Shipping typically takes 1 to 3 business days for Cairo and Giza, and 3 to 5 business days for other governorates.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Cash on Delivery (COD) across Egypt, all major Visa and Mastercard credit/debit cards, and Meeza cards for easy local electronic transactions.'
  },
  {
    question: 'What is your warranty and return policy on smart pet gadgets?',
    answer: 'We offer a full 14-day hassle-free return or exchange period for unused products in their original packaging. All of our electronic smart gadgets come with a 1-year warranty against manufacturing defects.'
  },
  {
    question: 'Can the automatic water fountain work during a power outage?',
    answer: 'Our water fountains are powered by a standard USB connection. You can easily plug them into a standard power bank to keep them running continuously if the electricity goes out.'
  },
  {
    question: 'How do I track my delivery order?',
    answer: 'Once your order is confirmed, you will receive an SMS and an email containing your order details and a tracking number. Our shipping partners will contact you via phone or WhatsApp to coordinate the exact delivery time.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Mariam K. from Heliopolis',
    rating: 5,
    date: '2026-06-15',
    comment: 'The Automatic Water Fountain is a lifesaver! My cat used to only drink from dripping taps, but she fell in love with this fountain immediately. Delivery was super fast (next day in Cairo). Highly recommended!',
    verified: true
  },
  {
    id: 'rev-2',
    userName: 'Ahmed S. from Maadi',
    rating: 5,
    date: '2026-06-28',
    comment: 'Bought the Smart Feeder with Camera for my golden retriever. It works flawlessly. I can see, talk, and dispense treats to him while I am working in the office. Best gadget I have ever purchased.',
    verified: true
  },
  {
    id: 'rev-3',
    userName: 'Yasmine A. from Alexandria',
    rating: 4,
    date: '2026-07-01',
    comment: 'Great quality on the Space Capsule Travel Backpack. It is highly breathable and my cat feels secure looking out the bubble dome window. Docked one star because shipping took 3 days, but customer service was very helpful.',
    verified: true
  }
];
