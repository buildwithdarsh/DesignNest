// DesignNest Main Webapp — Comprehensive Mock Data
// Rich, realistic data for the Indian interior design marketplace

// =============================================================================
// UNSPLASH HELPERS
// =============================================================================

const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop`;

const face = (id: string, size = 400) =>
  `https://images.unsplash.com/${id}?w=${size}&h=${size}&fit=crop&crop=face`;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface Designer {
  id: string;
  name: string;
  photo: string;
  title: string;
  firm: string;
  specializations: string[];
  styles: string[];
  rating: number;
  reviewCount: number;
  projectCount: number;
  responseTime: string;
  priceRange: { min: number; max: number; unit: string };
  location: string;
  city: string;
  bio: string;
  yearsOfExperience: number;
  verified: boolean;
  availability: "available" | "busy" | "unavailable";
  portfolioImages: string[];
  styleMatchScore: number;
}

export interface FeaturedProject {
  id: string;
  title: string;
  location: string;
  type: "Residential" | "Commercial";
  style: string;
  heroImage: string;
  designerName: string;
  budgetRange: string;
  area: string;
}

export interface StyleQuizQuestion {
  id: number;
  question: string;
  optionA: { image: string; label: string };
  optionB: { image: string; label: string };
}

export interface StyleProfile {
  id: string;
  name: string;
  description: string;
  colorPalette: string[];
  recommendedStyles: string[];
  heroImage: string;
}

export interface GalleryProject {
  id: string;
  title: string;
  room: string;
  style: string;
  city: string;
  designer: string;
  beforeImage: string;
  afterImage: string;
  budget: string;
  description: string;
}

export interface PackageDeal {
  id: string;
  name: string;
  scope: string;
  priceRange: { min: number; max: number };
  priceUnit: string;
  duration: string;
  highlights: string[];
  popular?: boolean;
}

export interface MaterialCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  date: string;
  completedDate?: string;
  paymentAmount?: number;
  paymentStatus?: "paid" | "due" | "upcoming";
}

export interface ProjectMessage {
  id: string;
  sender: string;
  senderRole: "client" | "designer" | "contractor" | "system";
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface ProgressPhoto {
  id: string;
  url: string;
  caption: string;
  room: string;
  date: string;
}

export interface ClientDashboardProject {
  id: string;
  title: string;
  designer: { name: string; photo: string; phone: string };
  status: "in-progress" | "completed" | "on-hold";
  startDate: string;
  expectedCompletion: string;
  totalBudget: number;
  amountPaid: number;
  completionPercentage: number;
  currentPhase: string;
  address: string;
  milestones: TimelineMilestone[];
  payments: { id: string; milestone: string; amount: number; status: "paid" | "due" | "upcoming"; date: string }[];
  progressPhotos: ProgressPhoto[];
  messages: ProjectMessage[];
}

export interface HomepageStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  designerName?: string;
}

// =============================================================================
// DESIGNERS
// =============================================================================

export const designers: Designer[] = [
  {
    id: "arjun-rao",
    name: "Arjun Rao",
    photo: face("photo-1507003211169-0a1dd7228f2d"),
    title: "Principal Designer",
    firm: "Studio Rao Design",
    specializations: ["Luxury Residential", "Heritage Restoration", "Villa Design"],
    styles: ["Contemporary", "Transitional", "Art Deco"],
    rating: 4.9,
    reviewCount: 147,
    projectCount: 210,
    responseTime: "Under 2 hours",
    priceRange: { min: 1200, max: 3500, unit: "per sq ft" },
    location: "Bandra West, Mumbai",
    city: "Mumbai",
    bio: "With 18 years in luxury residential design, I specialize in creating spaces that marry Indian craftsmanship with global aesthetics. From heritage villa restorations in South Mumbai to contemporary penthouses overlooking the Arabian Sea, every project is a new story.",
    yearsOfExperience: 18,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1600596542815-ffad4c1539a9", 800, 600),
      unsplash("photo-1600585154340-be6161a56a0c", 800, 600),
      unsplash("photo-1600210492486-724fe5c67fb0", 800, 600),
      unsplash("photo-1618221195710-dd6b41faaea6", 800, 600),
    ],
    styleMatchScore: 92,
  },
  {
    id: "meera-iyer",
    name: "Meera Iyer",
    photo: face("photo-1494790108377-be9c29b29330"),
    title: "Lead Commercial Designer",
    firm: "Iyer & Associates",
    specializations: ["Office Spaces", "Hospitality Design", "Co-working Spaces"],
    styles: ["Modern Industrial", "Biophilic", "Scandinavian"],
    rating: 4.8,
    reviewCount: 112,
    projectCount: 165,
    responseTime: "Under 4 hours",
    priceRange: { min: 900, max: 2800, unit: "per sq ft" },
    location: "Indiranagar, Bangalore",
    city: "Bangalore",
    bio: "I design workspaces that people actually want to come to. Combining biophilic elements with functional zoning, my commercial projects consistently improve employee satisfaction scores. Worked with 30+ startups and 10 Fortune 500 offices across South India.",
    yearsOfExperience: 12,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1497366216548-37526070297c", 800, 600),
      unsplash("photo-1497366811353-6870744d04b2", 800, 600),
      unsplash("photo-1572025442646-866d16c84a54", 800, 600),
      unsplash("photo-1604328698692-f76ea9498e76", 800, 600),
    ],
    styleMatchScore: 85,
  },
  {
    id: "karan-malhotra",
    name: "Karan Malhotra",
    photo: face("photo-1472099645785-5658abf4ff4e"),
    title: "Senior Interior Architect",
    firm: "Malhotra Interiors",
    specializations: ["Modular Kitchens", "Space Planning", "Smart Homes"],
    styles: ["Modern", "Minimalist", "Japanese Zen"],
    rating: 4.7,
    reviewCount: 98,
    projectCount: 140,
    responseTime: "Under 3 hours",
    priceRange: { min: 800, max: 2200, unit: "per sq ft" },
    location: "Sector 54, Gurugram",
    city: "Delhi NCR",
    bio: "I believe great design is invisible. My focus is on creating effortlessly functional spaces where every element serves a purpose. Specialist in modular solutions and smart home integration for modern Indian families navigating compact urban living.",
    yearsOfExperience: 10,
    verified: true,
    availability: "busy",
    portfolioImages: [
      unsplash("photo-1556909114-f6e7ad7d3136", 800, 600),
      unsplash("photo-1524758631624-e2822e304c36", 800, 600),
      unsplash("photo-1600607687939-ce8a6c25118c", 800, 600),
      unsplash("photo-1616486338812-3dadae4b4ace", 800, 600),
    ],
    styleMatchScore: 78,
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    photo: face("photo-1438761681033-6461ffad8d80"),
    title: "Design Director",
    firm: "Nair Design Studio",
    specializations: ["Contemporary Living", "Biophilic Design", "Sustainable Interiors"],
    styles: ["Contemporary", "Biophilic", "Tropical Modern"],
    rating: 4.9,
    reviewCount: 134,
    projectCount: 190,
    responseTime: "Under 1 hour",
    priceRange: { min: 1000, max: 3000, unit: "per sq ft" },
    location: "Koramangala, Bangalore",
    city: "Bangalore",
    bio: "Nature-inspired design is not just a trend, it is a responsibility. Every project I take uses at least 40% sustainable or reclaimed materials. My homes breathe, literally, with living walls, indoor gardens, and natural ventilation systems that reduce AC dependency by 30%.",
    yearsOfExperience: 14,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1600585154526-990dced4db0d", 800, 600),
      unsplash("photo-1600566753086-00f18fb6b3ea", 800, 600),
      unsplash("photo-1617806118233-18e1de247200", 800, 600),
      unsplash("photo-1600334129128-685c5582fd35", 800, 600),
    ],
    styleMatchScore: 95,
  },
  {
    id: "ankit-desai",
    name: "Ankit Desai",
    photo: face("photo-1500648767791-00dcc994a43e"),
    title: "Visualization & Design Lead",
    firm: "Desai Design Lab",
    specializations: ["3D Visualization", "VR Walkthroughs", "Compact Homes"],
    styles: ["Modern", "Minimalist", "Muji-inspired"],
    rating: 4.6,
    reviewCount: 76,
    projectCount: 95,
    responseTime: "Under 6 hours",
    priceRange: { min: 700, max: 1800, unit: "per sq ft" },
    location: "Satellite, Ahmedabad",
    city: "Ahmedabad",
    bio: "Started as a 3D visualization artist, now I design spaces from render to reality. My strength is helping clients see exactly what they will get before a single rupee is spent. Specialize in maximizing small apartments (under 800 sq ft) for young professionals.",
    yearsOfExperience: 8,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1502672260266-1c1ef2d93688", 800, 600),
      unsplash("photo-1522708323590-d24dbb6b0267", 800, 600),
      unsplash("photo-1560448204-e02f11c3d0e2", 800, 600),
      unsplash("photo-1524484485831-a92ffc0de03f", 800, 600),
    ],
    styleMatchScore: 72,
  },
  {
    id: "sneha-kapoor",
    name: "Sneha Kapoor",
    photo: face("photo-1580489944761-15a19d654956"),
    title: "Lighting & Material Specialist",
    firm: "Lumen Interiors",
    specializations: ["Lighting Design", "Material Selection", "Boutique Retail"],
    styles: ["Warm Modern", "Bohemian Luxe", "Maximalist"],
    rating: 4.8,
    reviewCount: 89,
    projectCount: 120,
    responseTime: "Under 3 hours",
    priceRange: { min: 850, max: 2400, unit: "per sq ft" },
    location: "Jubilee Hills, Hyderabad",
    city: "Hyderabad",
    bio: "Light transforms everything. I design layered lighting schemes that shift mood throughout the day alongside carefully curated material palettes. From a single statement chandelier to complete smart lighting systems, I help spaces come alive after sundown.",
    yearsOfExperience: 9,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1555041469-a586c61ea9bc", 800, 600),
      unsplash("photo-1524484485831-a92ffc0de03f", 800, 600),
      unsplash("photo-1581858726788-75bc0f6a952d", 800, 600),
      unsplash("photo-1559329007-40df8a9345d8", 800, 600),
    ],
    styleMatchScore: 88,
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    photo: face("photo-1506794778202-cad84cf45f1d"),
    title: "Principal Architect",
    firm: "Verma & Co. Design",
    specializations: ["Restaurant Design", "Cafe Interiors", "Hospitality"],
    styles: ["Industrial Chic", "Rustic Modern", "Art Deco"],
    rating: 4.7,
    reviewCount: 103,
    projectCount: 155,
    responseTime: "Under 4 hours",
    priceRange: { min: 1100, max: 3200, unit: "per sq ft" },
    location: "Hauz Khas, New Delhi",
    city: "Delhi NCR",
    bio: "I have designed 40+ restaurants and cafes across North India. From the tandoor placement to the bar counter height to the ambient noise levels at table 12, I obsess over every detail that makes an F&B space successful. Repeat clients are my biggest marketing channel.",
    yearsOfExperience: 15,
    verified: true,
    availability: "busy",
    portfolioImages: [
      unsplash("photo-1554118811-1e0d58224f24", 800, 600),
      unsplash("photo-1509042239860-f550ce710b93", 800, 600),
      unsplash("photo-1559329007-40df8a9345d8", 800, 600),
      unsplash("photo-1572025442646-866d16c84a54", 800, 600),
    ],
    styleMatchScore: 68,
  },
  {
    id: "divya-krishnan",
    name: "Divya Krishnan",
    photo: face("photo-1573496359142-b8d87734a5a2"),
    title: "Design Director",
    firm: "Studio DK",
    specializations: ["Luxury Apartments", "Vastu-Compliant Design", "Wellness Spaces"],
    styles: ["Contemporary Indian", "Minimalist", "Wabi-Sabi"],
    rating: 4.9,
    reviewCount: 118,
    projectCount: 175,
    responseTime: "Under 2 hours",
    priceRange: { min: 950, max: 2600, unit: "per sq ft" },
    location: "Anna Nagar, Chennai",
    city: "Chennai",
    bio: "Rooted in South Indian design sensibility with a global perspective. I create homes that respect Vastu principles without compromising on modern aesthetics. Known for integrating traditional brass, Chettinad tiles, and Tanjore elements into contemporary frameworks.",
    yearsOfExperience: 13,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1600585154340-be6161a56a0c", 800, 600),
      unsplash("photo-1618221195710-dd6b41faaea6", 800, 600),
      unsplash("photo-1600210492486-724fe5c67fb0", 800, 600),
      unsplash("photo-1617806118233-18e1de247200", 800, 600),
    ],
    styleMatchScore: 90,
  },
  {
    id: "aditya-joshi",
    name: "Aditya Joshi",
    photo: face("photo-1534528741775-53994a69daeb"),
    title: "Senior Designer",
    firm: "Joshi Interiors",
    specializations: ["Home Office Design", "Renovation", "Bachelor Pads"],
    styles: ["Modern", "Industrial Loft", "Scandinavian"],
    rating: 4.5,
    reviewCount: 64,
    projectCount: 82,
    responseTime: "Under 5 hours",
    priceRange: { min: 600, max: 1600, unit: "per sq ft" },
    location: "Viman Nagar, Pune",
    city: "Pune",
    bio: "I design for young professionals who want a space that works as hard as they do. Specializing in home offices, studio apartments, and bachelor pads that are functional, low-maintenance, and Instagram-ready. Budget-friendly without looking budget.",
    yearsOfExperience: 6,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1502672260266-1c1ef2d93688", 800, 600),
      unsplash("photo-1522708323590-d24dbb6b0267", 800, 600),
      unsplash("photo-1555041469-a586c61ea9bc", 800, 600),
      unsplash("photo-1524758631624-e2822e304c36", 800, 600),
    ],
    styleMatchScore: 75,
  },
  {
    id: "nisha-gupta",
    name: "Nisha Gupta",
    photo: face("photo-1544005313-94ddf0286df2"),
    title: "Creative Director",
    firm: "Gupta & Grey Studio",
    specializations: ["Kids Rooms", "Nursery Design", "Family Homes"],
    styles: ["Playful Modern", "Warm Minimalist", "Coastal"],
    rating: 4.8,
    reviewCount: 91,
    projectCount: 130,
    responseTime: "Under 2 hours",
    priceRange: { min: 750, max: 2000, unit: "per sq ft" },
    location: "Salt Lake, Kolkata",
    city: "Kolkata",
    bio: "Designing for families means designing for chaos, love, and growth. My homes are child-safe, pet-friendly, and parent-approved. Scratch-resistant surfaces, rounded corners, washable walls, and hidden storage are not compromises, they are design features.",
    yearsOfExperience: 11,
    verified: true,
    availability: "available",
    portfolioImages: [
      unsplash("photo-1616486338812-3dadae4b4ace", 800, 600),
      unsplash("photo-1600585154526-990dced4db0d", 800, 600),
      unsplash("photo-1600334129128-685c5582fd35", 800, 600),
      unsplash("photo-1618221195710-dd6b41faaea6", 800, 600),
    ],
    styleMatchScore: 82,
  },
];

// =============================================================================
// FEATURED PROJECTS (Home Page Inspiration)
// =============================================================================

export const featuredProjects: FeaturedProject[] = [
  {
    id: "azure-penthouse",
    title: "Azure Penthouse",
    location: "Bandra West, Mumbai",
    type: "Residential",
    style: "Contemporary Minimalist",
    heroImage: unsplash("photo-1600596542815-ffad4c1539a9", 1200, 800),
    designerName: "Arjun Rao",
    budgetRange: "INR 35-40 Lakhs",
    area: "4,200 sq ft",
  },
  {
    id: "fintech-hq",
    title: "FinEdge Technologies HQ",
    location: "Cyber City, Gurugram",
    type: "Commercial",
    style: "Modern Industrial",
    heroImage: unsplash("photo-1497366216548-37526070297c", 1200, 800),
    designerName: "Meera Iyer",
    budgetRange: "INR 65-75 Lakhs",
    area: "12,000 sq ft",
  },
  {
    id: "heritage-villa",
    title: "Heritage Villa Reimagined",
    location: "Koramangala, Bangalore",
    type: "Residential",
    style: "Transitional",
    heroImage: unsplash("photo-1600210492486-724fe5c67fb0", 1200, 800),
    designerName: "Priya Nair",
    budgetRange: "INR 25-30 Lakhs",
    area: "3,800 sq ft",
  },
  {
    id: "cafe-bloom",
    title: "Cafe Bloom",
    location: "Jubilee Hills, Hyderabad",
    type: "Commercial",
    style: "Bohemian Luxe",
    heroImage: unsplash("photo-1554118811-1e0d58224f24", 1200, 800),
    designerName: "Rahul Verma",
    budgetRange: "INR 15-20 Lakhs",
    area: "2,400 sq ft",
  },
  {
    id: "zen-apartment",
    title: "Zen Living - 2BHK",
    location: "Satellite, Ahmedabad",
    type: "Residential",
    style: "Japanese Zen",
    heroImage: unsplash("photo-1600585154340-be6161a56a0c", 1200, 800),
    designerName: "Karan Malhotra",
    budgetRange: "INR 8-12 Lakhs",
    area: "1,100 sq ft",
  },
  {
    id: "chettinad-home",
    title: "Chettinad Modern Home",
    location: "Anna Nagar, Chennai",
    type: "Residential",
    style: "Contemporary Indian",
    heroImage: unsplash("photo-1617806118233-18e1de247200", 1200, 800),
    designerName: "Divya Krishnan",
    budgetRange: "INR 18-22 Lakhs",
    area: "2,200 sq ft",
  },
];

// =============================================================================
// STYLE QUIZ QUESTIONS
// =============================================================================

export const styleQuizQuestions: StyleQuizQuestion[] = [
  {
    id: 1,
    question: "Which living room feels more like home to you?",
    optionA: {
      image: unsplash("photo-1600210492486-724fe5c67fb0", 600, 400),
      label: "Clean lines, neutral tones, open space",
    },
    optionB: {
      image: unsplash("photo-1616486338812-3dadae4b4ace", 600, 400),
      label: "Warm textures, layered decor, rich colors",
    },
  },
  {
    id: 2,
    question: "Pick a kitchen vibe:",
    optionA: {
      image: unsplash("photo-1556909114-f6e7ad7d3136", 600, 400),
      label: "Sleek modular with handleless cabinets",
    },
    optionB: {
      image: unsplash("photo-1600585154526-990dced4db0d", 600, 400),
      label: "Warm wood tones with open shelving",
    },
  },
  {
    id: 3,
    question: "How would you prefer your workspace?",
    optionA: {
      image: unsplash("photo-1497366216548-37526070297c", 600, 400),
      label: "Bright, minimal, distraction-free",
    },
    optionB: {
      image: unsplash("photo-1572025442646-866d16c84a54", 600, 400),
      label: "Creative, eclectic, personality-filled",
    },
  },
  {
    id: 4,
    question: "Which bedroom setting appeals more?",
    optionA: {
      image: unsplash("photo-1522708323590-d24dbb6b0267", 600, 400),
      label: "Light, airy, Scandinavian comfort",
    },
    optionB: {
      image: unsplash("photo-1618221195710-dd6b41faaea6", 600, 400),
      label: "Moody, dramatic, cocooning warmth",
    },
  },
  {
    id: 5,
    question: "Your ideal dining experience:",
    optionA: {
      image: unsplash("photo-1600607687939-ce8a6c25118c", 600, 400),
      label: "Formal dining with elegant fixtures",
    },
    optionB: {
      image: unsplash("photo-1554118811-1e0d58224f24", 600, 400),
      label: "Casual, cafe-style, conversation-friendly",
    },
  },
  {
    id: 6,
    question: "Pick a color mood:",
    optionA: {
      image: unsplash("photo-1600585154340-be6161a56a0c", 600, 400),
      label: "Whites, greys, and muted earth tones",
    },
    optionB: {
      image: unsplash("photo-1600334129128-685c5582fd35", 600, 400),
      label: "Deep greens, navy blues, warm golds",
    },
  },
  {
    id: 7,
    question: "Which outdoor space draws you in?",
    optionA: {
      image: unsplash("photo-1600566753086-00f18fb6b3ea", 600, 400),
      label: "Lush garden with natural landscaping",
    },
    optionB: {
      image: unsplash("photo-1524758631624-e2822e304c36", 600, 400),
      label: "Structured terrace with modern furniture",
    },
  },
  {
    id: 8,
    question: "How do you feel about patterns and textures?",
    optionA: {
      image: unsplash("photo-1502672260266-1c1ef2d93688", 600, 400),
      label: "Subtle, monochrome, smooth surfaces",
    },
    optionB: {
      image: unsplash("photo-1581858726788-75bc0f6a952d", 600, 400),
      label: "Bold patterns, mixed textures, artisan crafts",
    },
  },
];

// =============================================================================
// STYLE PROFILES
// =============================================================================

export const styleProfiles: StyleProfile[] = [
  {
    id: "modern-minimalist",
    name: "Modern Minimalist",
    description:
      "You value clarity and calm. Your spaces are edited, intentional, and breathe with open layouts. Think clean geometry, concealed storage, and a 'less but better' philosophy.",
    colorPalette: ["#FFFFFF", "#F5F5F0", "#C4C4C4", "#2C2C2C", "#B8A99A"],
    recommendedStyles: ["Minimalist", "Japanese Zen", "Scandinavian"],
    heroImage: unsplash("photo-1600585154340-be6161a56a0c", 800, 500),
  },
  {
    id: "warm-contemporary",
    name: "Warm Contemporary",
    description:
      "You blend modern structure with natural warmth. Wood grains, linen textures, and earthy tones soften contemporary lines. Comfort is as important as aesthetics in your world.",
    colorPalette: ["#F7F3EE", "#D4A574", "#8B6F47", "#3D3D3D", "#A3B18A"],
    recommendedStyles: ["Contemporary", "Warm Modern", "Biophilic"],
    heroImage: unsplash("photo-1616486338812-3dadae4b4ace", 800, 500),
  },
  {
    id: "bold-eclectic",
    name: "Bold Eclectic",
    description:
      "Rules are for breaking. You mix eras, cultures, and moods with confidence. Your home tells stories through collected objects, vibrant art, and unexpected combinations.",
    colorPalette: ["#1B3A4B", "#C19A6B", "#D4573D", "#F2E8DC", "#5B8C5A"],
    recommendedStyles: ["Maximalist", "Bohemian Luxe", "Art Deco"],
    heroImage: unsplash("photo-1581858726788-75bc0f6a952d", 800, 500),
  },
  {
    id: "contemporary-indian",
    name: "Contemporary Indian",
    description:
      "You honor tradition while embracing the new. Chettinad pillars meet polished concrete, brass accents pair with minimal shelving. Your home is proudly rooted yet globally aware.",
    colorPalette: ["#FAF3E3", "#B8860B", "#5C3317", "#F5F5F5", "#8B0000"],
    recommendedStyles: ["Contemporary Indian", "Transitional", "Tropical Modern"],
    heroImage: unsplash("photo-1617806118233-18e1de247200", 800, 500),
  },
  {
    id: "industrial-modern",
    name: "Industrial Modern",
    description:
      "Exposed brick, raw concrete, steel frames, and Edison bulbs speak your language. You like seeing the bones of a space and celebrating materiality over decoration.",
    colorPalette: ["#2F2F2F", "#6B6B6B", "#B87333", "#F0EDE8", "#4A4A4A"],
    recommendedStyles: ["Industrial Chic", "Loft Style", "Rustic Modern"],
    heroImage: unsplash("photo-1497366216548-37526070297c", 800, 500),
  },
];

// =============================================================================
// GALLERY PROJECTS (Before/After)
// =============================================================================

export const galleryProjects: GalleryProject[] = [
  {
    id: "g1",
    title: "Powai 3BHK Complete Makeover",
    room: "Full Home",
    style: "Contemporary",
    city: "Mumbai",
    designer: "Arjun Rao",
    beforeImage: unsplash("photo-1560448204-e02f11c3d0e2", 800, 500),
    afterImage: unsplash("photo-1600596542815-ffad4c1539a9", 800, 500),
    budget: "INR 18 Lakhs",
    description:
      "A dated 1,400 sq ft apartment transformed into a contemporary family home with custom walnut joinery, Italian marble kitchen, and smart lighting throughout.",
  },
  {
    id: "g2",
    title: "Minimalist Kitchen Renovation",
    room: "Kitchen",
    style: "Minimalist",
    city: "Bangalore",
    designer: "Karan Malhotra",
    beforeImage: unsplash("photo-1524484485831-a92ffc0de03f", 800, 500),
    afterImage: unsplash("photo-1556909114-f6e7ad7d3136", 800, 500),
    budget: "INR 4.5 Lakhs",
    description:
      "A cramped kitchen with outdated cabinetry reimagined as a sleek handleless modular kitchen with quartz countertops and hidden appliance garage.",
  },
  {
    id: "g3",
    title: "Indiranagar Studio Apartment",
    room: "Studio",
    style: "Scandinavian",
    city: "Bangalore",
    designer: "Ankit Desai",
    beforeImage: unsplash("photo-1524758631624-e2822e304c36", 800, 500),
    afterImage: unsplash("photo-1502672260266-1c1ef2d93688", 800, 500),
    budget: "INR 3.2 Lakhs",
    description:
      "A 450 sq ft bachelor studio redesigned with fold-down furniture, mirrored panels, and a cohesive cream palette to feel twice its size.",
  },
  {
    id: "g4",
    title: "Jubilee Hills Master Bedroom",
    room: "Bedroom",
    style: "Warm Modern",
    city: "Hyderabad",
    designer: "Sneha Kapoor",
    beforeImage: unsplash("photo-1559329007-40df8a9345d8", 800, 500),
    afterImage: unsplash("photo-1618221195710-dd6b41faaea6", 800, 500),
    budget: "INR 2.8 Lakhs",
    description:
      "A plain white-walled bedroom transformed with fluted wood paneling, layered lighting, and a custom upholstered bed with integrated reading lights.",
  },
  {
    id: "g5",
    title: "Defence Colony Living Room",
    room: "Living Room",
    style: "Contemporary Indian",
    city: "New Delhi",
    designer: "Divya Krishnan",
    beforeImage: unsplash("photo-1572025442646-866d16c84a54", 800, 500),
    afterImage: unsplash("photo-1600210492486-724fe5c67fb0", 800, 500),
    budget: "INR 5.5 Lakhs",
    description:
      "A formal drawing room updated for modern living with a custom entertainment unit, Tanjore-inspired accent wall, and Chettinad tile inlays.",
  },
  {
    id: "g6",
    title: "Startup Office Redesign",
    room: "Office",
    style: "Industrial",
    city: "Gurugram",
    designer: "Meera Iyer",
    beforeImage: unsplash("photo-1497366811353-6870744d04b2", 800, 500),
    afterImage: unsplash("photo-1497366216548-37526070297c", 800, 500),
    budget: "INR 28 Lakhs",
    description:
      "A 5,000 sq ft sterile white office transformed into an energetic workspace with exposed ducts, living wall, phone booths, and collaborative zones.",
  },
  {
    id: "g7",
    title: "Artisan Cafe Interior",
    room: "Restaurant",
    style: "Bohemian Luxe",
    city: "Hyderabad",
    designer: "Rahul Verma",
    beforeImage: unsplash("photo-1509042239860-f550ce710b93", 800, 500),
    afterImage: unsplash("photo-1554118811-1e0d58224f24", 800, 500),
    budget: "INR 12 Lakhs",
    description:
      "A vacant 1,800 sq ft ground floor turned into a greenhouse-inspired cafe with terrazzo bar, ceramic tile walls, and indoor herb garden.",
  },
  {
    id: "g8",
    title: "Kolkata Family Home Refresh",
    room: "Full Home",
    style: "Warm Minimalist",
    city: "Kolkata",
    designer: "Nisha Gupta",
    beforeImage: unsplash("photo-1581858726788-75bc0f6a952d", 800, 500),
    afterImage: unsplash("photo-1600585154526-990dced4db0d", 800, 500),
    budget: "INR 14 Lakhs",
    description:
      "A 1,800 sq ft family home refreshed with child-safe finishes, washable wall paint, rounded furniture, and a dedicated homework corner for two kids.",
  },
  {
    id: "g9",
    title: "Pune Home Office Setup",
    room: "Home Office",
    style: "Modern",
    city: "Pune",
    designer: "Aditya Joshi",
    beforeImage: unsplash("photo-1522708323590-d24dbb6b0267", 800, 500),
    afterImage: unsplash("photo-1524758631624-e2822e304c36", 800, 500),
    budget: "INR 1.8 Lakhs",
    description:
      "A spare bedroom converted into a professional home office with acoustic panels, motorized sit-stand desk, and studio-quality video call backdrop.",
  },
  {
    id: "g10",
    title: "Chennai 4BHK Villa",
    room: "Full Home",
    style: "Contemporary Indian",
    city: "Chennai",
    designer: "Divya Krishnan",
    beforeImage: unsplash("photo-1604328698692-f76ea9498e76", 800, 500),
    afterImage: unsplash("photo-1617806118233-18e1de247200", 800, 500),
    budget: "INR 32 Lakhs",
    description:
      "A sprawling 3,200 sq ft villa blending Chettinad tile flooring, brass fixtures, and courtyard greenery with sleek modern kitchen and bath fittings.",
  },
  {
    id: "g11",
    title: "Wellness Centre Spa Room",
    room: "Commercial",
    style: "Wabi-Sabi",
    city: "Bangalore",
    designer: "Priya Nair",
    beforeImage: unsplash("photo-1600334129128-685c5582fd35", 800, 500),
    afterImage: unsplash("photo-1600566753086-00f18fb6b3ea", 800, 500),
    budget: "INR 8 Lakhs",
    description:
      "A raw concrete shell transformed into a calming treatment room with circadian-tunable lighting, rammed-earth panels, and a walnut soaking tub surround.",
  },
];

// =============================================================================
// PACKAGE DEALS (from BRD Section 5D.5)
// =============================================================================

export const packageDeals: PackageDeal[] = [
  {
    id: "full-home-1bhk",
    name: "Full Home (1BHK)",
    scope: "All rooms design + execution",
    priceRange: { min: 300000, max: 800000 },
    priceUnit: "fixed",
    duration: "45-75 days",
    highlights: [
      "Living room + bedroom + kitchen",
      "3D renders for every room",
      "Modular kitchen included",
      "Electrical & plumbing work",
      "1-year warranty",
    ],
  },
  {
    id: "full-home-2bhk",
    name: "Full Home (2BHK)",
    scope: "All rooms design + execution",
    priceRange: { min: 500000, max: 1500000 },
    priceUnit: "fixed",
    duration: "60-100 days",
    highlights: [
      "All rooms including bathrooms",
      "Custom modular kitchen",
      "False ceiling & lighting",
      "Dedicated project manager",
      "1-year warranty",
    ],
    popular: true,
  },
  {
    id: "full-home-3bhk",
    name: "Full Home (3BHK)",
    scope: "All rooms design + execution",
    priceRange: { min: 800000, max: 2500000 },
    priceUnit: "fixed",
    duration: "75-120 days",
    highlights: [
      "Complete home transformation",
      "Premium material options",
      "Smart home integration ready",
      "VR walkthrough included",
      "1-year warranty + extended care option",
    ],
    popular: true,
  },
  {
    id: "full-home-4bhk",
    name: "Full Home (4BHK / Villa)",
    scope: "All rooms design + execution",
    priceRange: { min: 1500000, max: 5000000 },
    priceUnit: "fixed",
    duration: "90-150 days",
    highlights: [
      "Luxury material palette",
      "Landscape & outdoor living",
      "Home automation package",
      "Dedicated design team",
      "3-year extended warranty",
    ],
  },
  {
    id: "single-room",
    name: "Single Room Refresh",
    scope: "One room design + furnishing (no civil work)",
    priceRange: { min: 50000, max: 200000 },
    priceUnit: "fixed",
    duration: "15-30 days",
    highlights: [
      "Any one room of your choice",
      "Furniture & decor sourcing",
      "Paint & wallpaper",
      "Lighting upgrade",
      "No civil work disruption",
    ],
  },
  {
    id: "kitchen-only",
    name: "Kitchen Only",
    scope: "Modular kitchen design + execution",
    priceRange: { min: 150000, max: 600000 },
    priceUnit: "fixed",
    duration: "30-60 days",
    highlights: [
      "Custom modular layout",
      "Premium hardware & soft-close",
      "Countertop options (granite/quartz)",
      "Backsplash & lighting",
      "10-year modular warranty",
    ],
  },
  {
    id: "bathroom-renovation",
    name: "Bathroom Renovation",
    scope: "Single bathroom complete overhaul",
    priceRange: { min: 100000, max: 400000 },
    priceUnit: "fixed",
    duration: "20-40 days",
    highlights: [
      "Complete demolition & rebuild",
      "Premium sanitaryware",
      "Anti-skid tiling",
      "Vanity & storage",
      "Waterproofing warranty",
    ],
  },
  {
    id: "home-office",
    name: "Home Office Setup",
    scope: "Study/office room complete design",
    priceRange: { min: 50000, max: 250000 },
    priceUnit: "fixed",
    duration: "15-30 days",
    highlights: [
      "Ergonomic furniture selection",
      "Acoustic treatment",
      "Task & ambient lighting",
      "Cable management",
      "Video call backdrop design",
    ],
  },
  {
    id: "office-space",
    name: "Office Space",
    scope: "Commercial office interiors",
    priceRange: { min: 700, max: 2500 },
    priceUnit: "per sq ft",
    duration: "45-90 days",
    highlights: [
      "Space planning & zoning",
      "Meeting rooms & breakout areas",
      "Reception & branding",
      "Fire safety compliance",
      "IT infrastructure planning",
    ],
  },
  {
    id: "retail-store",
    name: "Retail Store",
    scope: "Retail interior with fixtures",
    priceRange: { min: 800, max: 3000 },
    priceUnit: "per sq ft",
    duration: "30-60 days",
    highlights: [
      "Customer flow optimization",
      "Display & shelving systems",
      "POS counter design",
      "Brand-aligned interiors",
      "Lighting for merchandise",
    ],
  },
  {
    id: "restaurant-cafe",
    name: "Restaurant / Cafe",
    scope: "F&B outlet complete interiors",
    priceRange: { min: 1000, max: 3500 },
    priceUnit: "per sq ft",
    duration: "45-90 days",
    highlights: [
      "Kitchen layout & ventilation",
      "Seating optimization",
      "Ambiance & acoustic design",
      "FSSAI-compliant layout",
      "Bar & counter design",
    ],
  },
  {
    id: "design-only",
    name: "Design Only",
    scope: "Design, 3D renders, BOQ (no execution)",
    priceRange: { min: 15000, max: 100000 },
    priceUnit: "fixed",
    duration: "15-30 days",
    highlights: [
      "Detailed 2D floor plans",
      "Photorealistic 3D renders",
      "Complete BOQ document",
      "Material specification sheets",
      "Vendor recommendations",
    ],
  },
];

// =============================================================================
// MATERIAL CATEGORIES
// =============================================================================

export const materialCategories: MaterialCategory[] = [
  {
    id: "furniture",
    name: "Furniture",
    description: "Sofas, beds, dining tables, wardrobes, and custom joinery from verified manufacturers.",
    image: unsplash("photo-1555041469-a586c61ea9bc", 600, 400),
    productCount: 2340,
  },
  {
    id: "lighting",
    name: "Lighting",
    description: "Chandeliers, pendant lights, recessed LEDs, smart lighting systems, and task lamps.",
    image: unsplash("photo-1524484485831-a92ffc0de03f", 600, 400),
    productCount: 1870,
  },
  {
    id: "flooring",
    name: "Flooring",
    description: "Vitrified tiles, hardwood, laminate, marble, terrazzo, and vinyl flooring options.",
    image: unsplash("photo-1600585154340-be6161a56a0c", 600, 400),
    productCount: 980,
  },
  {
    id: "wall-treatments",
    name: "Wall Treatments",
    description: "Wallpapers, textured paints, wood paneling, stone cladding, and accent wall materials.",
    image: unsplash("photo-1618221195710-dd6b41faaea6", 600, 400),
    productCount: 1250,
  },
  {
    id: "kitchen-fittings",
    name: "Kitchen & Bath Fittings",
    description: "Modular cabinets, countertops, sinks, faucets, sanitaryware, and kitchen hardware.",
    image: unsplash("photo-1556909114-f6e7ad7d3136", 600, 400),
    productCount: 1680,
  },
  {
    id: "soft-furnishings",
    name: "Soft Furnishings",
    description: "Curtains, blinds, rugs, cushions, upholstery fabrics, and bedding collections.",
    image: unsplash("photo-1616486338812-3dadae4b4ace", 600, 400),
    productCount: 2100,
  },
  {
    id: "decor-art",
    name: "Decor & Art",
    description: "Wall art, sculptures, vases, mirrors, planters, and curated decor accessories.",
    image: unsplash("photo-1600210492486-724fe5c67fb0", 600, 400),
    productCount: 3200,
  },
  {
    id: "smart-home",
    name: "Smart Home",
    description: "Home automation, smart switches, motorized curtains, security systems, and IoT devices.",
    image: unsplash("photo-1604328698692-f76ea9498e76", 600, 400),
    productCount: 640,
  },
];

// =============================================================================
// CLIENT DASHBOARD — MOCK PROJECT
// =============================================================================

export const clientDashboardProject: ClientDashboardProject = {
  id: "proj-2026-0142",
  title: "Mehta Residence - 3BHK Full Home",
  designer: {
    name: "Priya Nair",
    photo: face("photo-1438761681033-6461ffad8d80"),
    phone: "+91 98765 43210",
  },
  status: "in-progress",
  startDate: "2026-01-15",
  expectedCompletion: "2026-05-10",
  totalBudget: 1650000,
  amountPaid: 825000,
  completionPercentage: 58,
  currentPhase: "Execution - Carpentry & Modular Work",
  address: "Flat 1204, Celestia Heights, Powai, Mumbai 400076",

  milestones: [
    {
      id: "m1",
      title: "Discovery & Site Survey",
      description: "Initial consultation, site measurements, and requirement documentation",
      status: "completed",
      date: "2026-01-15",
      completedDate: "2026-01-17",
      paymentAmount: 49500,
      paymentStatus: "paid",
    },
    {
      id: "m2",
      title: "Concept Design & Mood Boards",
      description: "3 design directions with mood boards, material palettes, and spatial layouts",
      status: "completed",
      date: "2026-01-25",
      completedDate: "2026-01-28",
      paymentAmount: 132000,
      paymentStatus: "paid",
    },
    {
      id: "m3",
      title: "3D Design & Approval",
      description: "Photorealistic renders for all rooms, 2 rounds of revisions, final sign-off",
      status: "completed",
      date: "2026-02-10",
      completedDate: "2026-02-18",
      paymentAmount: 148500,
      paymentStatus: "paid",
    },
    {
      id: "m4",
      title: "BOQ & Procurement",
      description: "Detailed Bill of Quantities, vendor selection, material ordering",
      status: "completed",
      date: "2026-02-25",
      completedDate: "2026-03-02",
      paymentAmount: 330000,
      paymentStatus: "paid",
    },
    {
      id: "m5",
      title: "Civil & Electrical Work",
      description: "Demolition, false ceiling framework, electrical rewiring, plumbing modifications",
      status: "completed",
      date: "2026-03-05",
      completedDate: "2026-03-18",
      paymentAmount: 165000,
      paymentStatus: "paid",
    },
    {
      id: "m6",
      title: "Carpentry & Modular Work",
      description: "Modular kitchen installation, wardrobes, TV unit, shoe rack, custom joinery",
      status: "in-progress",
      date: "2026-03-20",
      paymentAmount: 330000,
      paymentStatus: "due",
    },
    {
      id: "m7",
      title: "Painting & Wall Treatments",
      description: "Wall preparation, primer, finish coats, accent wall paneling, wallpaper installation",
      status: "upcoming",
      date: "2026-04-08",
      paymentAmount: 165000,
      paymentStatus: "upcoming",
    },
    {
      id: "m8",
      title: "Furnishing & Styling",
      description: "Furniture delivery, soft furnishing installation, decor placement, final styling",
      status: "upcoming",
      date: "2026-04-22",
      paymentAmount: 165000,
      paymentStatus: "upcoming",
    },
    {
      id: "m9",
      title: "Quality Check & Handover",
      description: "Punch list walkthrough, deep cleaning, documentation handover, warranty activation",
      status: "upcoming",
      date: "2026-05-06",
      paymentAmount: 165000,
      paymentStatus: "upcoming",
    },
  ],

  payments: [
    { id: "pay1", milestone: "Discovery & Site Survey", amount: 49500, status: "paid", date: "2026-01-15" },
    { id: "pay2", milestone: "Concept Design", amount: 132000, status: "paid", date: "2026-01-28" },
    { id: "pay3", milestone: "3D Design Approval", amount: 148500, status: "paid", date: "2026-02-18" },
    { id: "pay4", milestone: "BOQ & Procurement", amount: 330000, status: "paid", date: "2026-03-02" },
    { id: "pay5", milestone: "Civil & Electrical", amount: 165000, status: "paid", date: "2026-03-18" },
    { id: "pay6", milestone: "Carpentry & Modular", amount: 330000, status: "due", date: "2026-03-28" },
    { id: "pay7", milestone: "Painting & Walls", amount: 165000, status: "upcoming", date: "2026-04-15" },
    { id: "pay8", milestone: "Furnishing & Styling", amount: 165000, status: "upcoming", date: "2026-04-28" },
    { id: "pay9", milestone: "Handover", amount: 165000, status: "upcoming", date: "2026-05-10" },
  ],

  progressPhotos: [
    {
      id: "pp1",
      url: unsplash("photo-1560448204-e02f11c3d0e2", 800, 600),
      caption: "Site survey - existing kitchen layout",
      room: "Kitchen",
      date: "2026-01-16",
    },
    {
      id: "pp2",
      url: unsplash("photo-1604328698692-f76ea9498e76", 800, 600),
      caption: "Electrical conduit work completed in living room",
      room: "Living Room",
      date: "2026-03-08",
    },
    {
      id: "pp3",
      url: unsplash("photo-1581858726788-75bc0f6a952d", 800, 600),
      caption: "False ceiling POP framework - master bedroom",
      room: "Master Bedroom",
      date: "2026-03-12",
    },
    {
      id: "pp4",
      url: unsplash("photo-1524758631624-e2822e304c36", 800, 600),
      caption: "Modular kitchen carcass installation started",
      room: "Kitchen",
      date: "2026-03-22",
    },
    {
      id: "pp5",
      url: unsplash("photo-1556909114-f6e7ad7d3136", 800, 600),
      caption: "Kitchen upper cabinets installed with soft-close hardware",
      room: "Kitchen",
      date: "2026-03-26",
    },
  ],

  messages: [
    {
      id: "msg1",
      sender: "Priya Nair",
      senderRole: "designer",
      message: "Hi Priya! The mood boards are ready. I have prepared three directions - Contemporary Warm, Minimalist Zen, and Tropical Modern. Let me know when you can review.",
      timestamp: "2026-01-24T10:30:00Z",
    },
    {
      id: "msg2",
      sender: "Priya Mehta",
      senderRole: "client",
      message: "Love the Contemporary Warm direction! Can we add a bit more greenery like the Tropical option? Maybe a living wall in the balcony area?",
      timestamp: "2026-01-24T14:15:00Z",
    },
    {
      id: "msg3",
      sender: "Priya Nair",
      senderRole: "designer",
      message: "Absolutely! I will blend the two. A vertical garden on the balcony wall will look stunning and improve air quality. I will update the renders by Thursday.",
      timestamp: "2026-01-24T14:45:00Z",
    },
    {
      id: "msg4",
      sender: "System",
      senderRole: "system",
      message: "Milestone completed: 3D Design & Approval. Payment of INR 1,48,500 has been processed.",
      timestamp: "2026-02-18T16:00:00Z",
    },
    {
      id: "msg5",
      sender: "Priya Nair",
      senderRole: "designer",
      message: "Kitchen carcass installation is going well. The soft-close hinges for the upper cabinets arrived today. Attaching progress photos. We are on track for the 28th March milestone.",
      timestamp: "2026-03-26T11:20:00Z",
      attachments: [
        unsplash("photo-1556909114-f6e7ad7d3136", 600, 400),
      ],
    },
    {
      id: "msg6",
      sender: "Rajesh (Contractor)",
      senderRole: "contractor",
      message: "Wardrobe laminate delivery confirmed for Monday. Will start master bedroom wardrobes by Tuesday morning.",
      timestamp: "2026-03-27T09:00:00Z",
    },
  ],
};

// =============================================================================
// HOMEPAGE STATS
// =============================================================================

export const homepageStats: HomepageStat[] = [
  { value: "2,000", label: "Verified Designers", suffix: "+" },
  { value: "8,500", label: "Projects Completed", suffix: "+" },
  { value: "10", label: "Cities Across India" },
  { value: "4.8", label: "Average Client Rating", suffix: "/5" },
];

// =============================================================================
// TESTIMONIALS
// =============================================================================

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Priya & Rohan Mehta",
    projectType: "Full Home - 3BHK",
    location: "Powai, Mumbai",
    quote:
      "DesignNest transformed our bare apartment into a home that genuinely feels like us. The 3D renders were so accurate we had zero surprises on reveal day. The team managed everything from the custom walnut bookshelf to coordinating with the electrician for smart lighting.",
    rating: 5,
    avatar: face("photo-1544005313-94ddf0286df2"),
    designerName: "Arjun Rao",
  },
  {
    id: "t2",
    clientName: "Vikram Sharma",
    projectType: "Office - 5,000 sq ft",
    location: "Whitefield, Bangalore",
    quote:
      "We needed our new office ready in 8 weeks. DesignNest delivered in 7 weeks flat. The breakout zone with the living wall is everyone's favourite spot. Productivity scores went up 15% after the move.",
    rating: 5,
    avatar: face("photo-1506794778202-cad84cf45f1d"),
    designerName: "Meera Iyer",
  },
  {
    id: "t3",
    clientName: "Ananya Singh",
    projectType: "Bedroom Studio Redesign",
    location: "Koramangala, Bangalore",
    quote:
      "I was skeptical any designer would take a single-room project seriously on my budget. Sneha turned my cramped bedroom into a stunning studio that I now shoot all my content in. My followers keep asking who designed it!",
    rating: 5,
    avatar: face("photo-1534528741775-53994a69daeb"),
    designerName: "Sneha Kapoor",
  },
  {
    id: "t4",
    clientName: "Rajesh & Sunita Kumar",
    projectType: "Kitchen & Bathroom Renovation",
    location: "Defence Colony, New Delhi",
    quote:
      "After a disastrous experience with a local contractor, we were terrified of renovating again. The milestone payment system and daily photo updates gave us full visibility. The modular kitchen is restaurant-grade and the bathroom feels like a five-star hotel.",
    rating: 5,
    avatar: face("photo-1547425260-76bcadfb4f2c"),
    designerName: "Karan Malhotra",
  },
  {
    id: "t5",
    clientName: "Dr. Kavitha Reddy",
    projectType: "Wellness Centre - 5,500 sq ft",
    location: "Jubilee Hills, Hyderabad",
    quote:
      "Designing a wellness space requires understanding sensory experience, not just aesthetics. The team studied circadian lighting research, acoustic engineering, and aromatherapy flow before drawing a single line. My clients comment on how calming the space feels.",
    rating: 5,
    avatar: face("photo-1573496359142-b8d87734a5a2"),
    designerName: "Priya Nair",
  },
  {
    id: "t6",
    clientName: "Amit & Deepa Patel",
    projectType: "Full Home - 4BHK Villa",
    location: "SG Highway, Ahmedabad",
    quote:
      "Our 3,600 sq ft villa was a blank canvas and honestly overwhelming. The style quiz matched us with Ankit who understood our taste instantly. The Vastu-compliant layout satisfied my parents, and the modern finishes made us happy. Best of both worlds.",
    rating: 5,
    avatar: face("photo-1500648767791-00dcc994a43e"),
    designerName: "Ankit Desai",
  },
  {
    id: "t7",
    clientName: "Snehal Joshi",
    projectType: "Home Office Setup",
    location: "Viman Nagar, Pune",
    quote:
      "Working from home for 3 years in a makeshift desk corner was draining. Aditya designed a proper home office with acoustic panels, cable management, and even a professional Zoom backdrop. My meeting presence improved overnight and the project cost less than 2 lakhs.",
    rating: 4,
    avatar: face("photo-1580489944761-15a19d654956"),
    designerName: "Aditya Joshi",
  },
  {
    id: "t8",
    clientName: "Meera Patel",
    projectType: "Restaurant - 3,200 sq ft",
    location: "Koramangala, Bangalore",
    quote:
      "Rahul understood that restaurant design is not just about looks but about operations. The kitchen flow, the bar placement, the acoustic zoning between the loud bar area and the quiet dining section are all perfect. We hit 90% table occupancy within the first month.",
    rating: 5,
    avatar: face("photo-1494790108377-be9c29b29330"),
    designerName: "Rahul Verma",
  },
  {
    id: "t9",
    clientName: "Siddharth & Nandini Rao",
    projectType: "Full Home - 2BHK",
    location: "Salt Lake, Kolkata",
    quote:
      "With two kids under 5 and a Labrador, we needed a home that could survive chaos but still look beautiful. Nisha designed rounded-corner furniture, washable walls, hidden toy storage, and a pet-washing station near the entrance. Genius touches that make daily life easier.",
    rating: 5,
    avatar: face("photo-1507003211169-0a1dd7228f2d"),
    designerName: "Nisha Gupta",
  },
];

// =============================================================================
// HELPER: Format INR
// =============================================================================

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatINRRange(min: number, max: number, unit?: string): string {
  const suffix = unit ? ` ${unit}` : "";
  return `${formatINR(min)} - ${formatINR(max)}${suffix}`;
}
