// DesignNest — Rich mock data reflecting the BRD's data model

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  type: "Residential" | "Commercial";
  description: string;
  heroImage: string;
  gallery: string[];
  beforeImage?: string;
  afterImage?: string;
  area: string;
  duration: string;
  budget: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  specialization: string;
  yearsOfExperience: number;
  photo: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

// --- Services ---
export const services: Service[] = [
  {
    id: "residential",
    name: "Residential Interior Design",
    description:
      "Complete home interiors from concept to execution — living rooms, bedrooms, dining areas, and more. We create spaces that reflect your personality and lifestyle.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=600&fit=crop",
  },
  {
    id: "commercial",
    name: "Commercial & Office Design",
    description:
      "Modern workspaces designed for productivity and brand alignment. Meeting rooms, breakout zones, reception areas, and ergonomic layouts for teams of any size.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchen Design",
    description:
      "Factory-precision modular kitchens with premium hardware, soft-close mechanisms, and space-maximizing layouts. From L-shaped to island configurations.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
  },
  {
    id: "renovation",
    name: "Renovation & Remodeling",
    description:
      "Breathe new life into aging spaces. Structural modifications, bathroom overhauls, flooring upgrades, and complete home makeovers with minimal disruption.",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop",
  },
  {
    id: "space-planning",
    name: "Space Planning & Vastu",
    description:
      "Intelligent floor plans optimized for flow, natural light, and Vastu compliance. Ideal for new constructions and pre-move-in layout decisions.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
  },
  {
    id: "furniture",
    name: "Furniture Design & Customization",
    description:
      "Bespoke furniture crafted to your exact specifications — custom wardrobes, entertainment units, study tables, and statement pieces in solid wood and premium laminates.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
  },
  {
    id: "lighting",
    name: "Lighting Design",
    description:
      "Layered lighting schemes combining ambient, task, and accent lighting. Smart home integration, circadian-friendly setups, and dramatic focal points.",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop",
  },
  {
    id: "landscape",
    name: "Landscape & Outdoor Living",
    description:
      "Terrace gardens, balcony makeovers, outdoor dining areas, and biophilic design elements. Creating seamless indoor-outdoor living experiences.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
  },
];

// --- Portfolio ---
export const portfolioProjects: PortfolioProject[] = [
  {
    id: "azure-penthouse",
    title: "Azure Penthouse",
    location: "Bandra West, Mumbai",
    type: "Residential",
    description:
      "A 4,200 sq ft penthouse designed with contemporary minimalism. Floor-to-ceiling windows frame panoramic sea views, while warm oak flooring and Venetian plaster walls create an inviting contrast to the sleek marble kitchen island.",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop",
    ],
    beforeImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
    area: "4,200 sq ft",
    duration: "4.5 months",
    budget: "INR 38 Lakhs",
  },
  {
    id: "fintech-hq",
    title: "FinEdge Technologies HQ",
    location: "Cyber City, Gurugram",
    type: "Commercial",
    description:
      "A 12,000 sq ft fintech office balancing collaborative open floors with sound-isolated focus pods. Biophilic elements — living walls and indoor planters — soften the industrial concrete-and-steel palette.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=800&h=600&fit=crop",
    ],
    area: "12,000 sq ft",
    duration: "3 months",
    budget: "INR 72 Lakhs",
  },
  {
    id: "heritage-villa",
    title: "Heritage Villa Reimagined",
    location: "Koramangala, Bangalore",
    type: "Residential",
    description:
      "A 1960s villa restored with respect for its colonial bones — arched doorways, terrazzo tiles, and original teak beams — while introducing a modern chef's kitchen, spa bathroom, and a glass-roofed courtyard reading nook.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
    ],
    beforeImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=500&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=500&fit=crop",
    area: "3,800 sq ft",
    duration: "6 months",
    budget: "INR 28 Lakhs",
  },
  {
    id: "cafe-bloom",
    title: "Cafe Bloom",
    location: "Jubilee Hills, Hyderabad",
    type: "Commercial",
    description:
      "A 2,400 sq ft artisan cafe with a greenhouse-inspired atrium, hand-thrown ceramic tile accent wall, and a custom terrazzo bar counter. Seating flows from cozy booths to communal harvest tables to a sunlit patio.",
    heroImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    ],
    area: "2,400 sq ft",
    duration: "2.5 months",
    budget: "INR 18 Lakhs",
  },
  {
    id: "compact-studio",
    title: "The 450 Studio",
    location: "Indiranagar, Bangalore",
    type: "Residential",
    description:
      "Proof that small spaces can feel grand. This 450 sq ft studio apartment uses multi-functional furniture, mirrored panels, and a cohesive cream-and-sage palette to create distinct living, sleeping, and work zones without a single interior wall.",
    heroImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    ],
    area: "450 sq ft",
    duration: "1.5 months",
    budget: "INR 6.5 Lakhs",
  },
  {
    id: "wellness-spa",
    title: "Serenity Wellness Centre",
    location: "Whitefield, Bangalore",
    type: "Commercial",
    description:
      "A 5,500 sq ft premium wellness centre featuring treatment rooms with circadian lighting, a Himalayan salt lounge, hydrotherapy suite, and reception area clad in rammed-earth panels and hand-oiled walnut.",
    heroImage: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&h=600&fit=crop",
    ],
    area: "5,500 sq ft",
    duration: "3.5 months",
    budget: "INR 45 Lakhs",
  },
];

// --- Team ---
export const teamMembers: TeamMember[] = [
  {
    id: "arjun-rao",
    name: "Arjun Rao",
    title: "Founder & Principal Designer",
    specialization: "Luxury Residential, Heritage Restoration",
    yearsOfExperience: 18,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "meera-iyer",
    name: "Meera Iyer",
    title: "Lead Commercial Designer",
    specialization: "Office Spaces, Hospitality Design",
    yearsOfExperience: 12,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "karan-malhotra",
    name: "Karan Malhotra",
    title: "Senior Interior Architect",
    specialization: "Modular Solutions, Space Planning",
    yearsOfExperience: 10,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    title: "Design Director — Residential",
    specialization: "Contemporary Living, Biophilic Design",
    yearsOfExperience: 14,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "ankit-desai",
    name: "Ankit Desai",
    title: "3D Visualization Lead",
    specialization: "Photorealistic Renders, VR Walkthroughs",
    yearsOfExperience: 8,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
  },
  {
    id: "sneha-kapoor",
    name: "Sneha Kapoor",
    title: "Lighting & Material Specialist",
    specialization: "Lighting Design, Sustainable Materials",
    yearsOfExperience: 9,
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
];

// --- Testimonials ---
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    clientName: "Priya & Rohan Mehta",
    projectType: "Full Home — 3BHK",
    location: "Powai, Mumbai",
    quote:
      "DesignNest transformed our bare apartment into a home that genuinely feels like us. The 3D renders were so accurate we had zero surprises on reveal day. Arjun's team managed everything — from the custom walnut bookshelf to coordinating with the electrician for our smart lighting. We never had to take a single day off work.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "t2",
    clientName: "Vikram Sharma",
    projectType: "Office — 5,000 sq ft",
    location: "Whitefield, Bangalore",
    quote:
      "We needed our new office ready in 8 weeks — an impossible timeline, or so every other firm told us. DesignNest delivered in 7 weeks flat. The space perfectly balances our startup energy with the professionalism our enterprise clients expect. The breakout zone with the living wall is everyone's favourite spot.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "t3",
    clientName: "Ananya Singh",
    projectType: "Bedroom Studio Redesign",
    location: "Koramangala, Bangalore",
    quote:
      "I was skeptical that any designer would take a single-room project seriously, let alone on my budget. Sneha not only respected my constraints but turned my cramped bedroom into a stunning studio that I now shoot all my content in. My followers keep asking who designed it!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "t4",
    clientName: "Rajesh & Sunita Kumar",
    projectType: "Kitchen & Bathroom Renovation",
    location: "Defence Colony, New Delhi",
    quote:
      "After a disastrous experience with a local contractor, we were terrified of renovating again. DesignNest's milestone payment system and daily photo updates gave us full visibility. The modular kitchen is restaurant-grade and the bathroom feels like a five-star hotel. Worth every rupee.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&h=200&fit=crop&crop=face",
  },
  {
    id: "t5",
    clientName: "Dr. Kavitha Reddy",
    projectType: "Wellness Centre — 5,500 sq ft",
    location: "Jubilee Hills, Hyderabad",
    quote:
      "Designing a wellness space requires understanding sensory experience, not just aesthetics. The DesignNest team studied circadian lighting research, acoustic engineering, and aromatherapy flow before drawing a single line. My clients comment on how calming the space feels the moment they walk in.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
  },
];

// --- FAQ ---
export const faqItems: FAQItem[] = [
  {
    question: "What's your typical project timeline?",
    answer:
      "Timelines vary by scope. A single room redesign typically takes 3–6 weeks. A full home interior (2–3 BHK) runs 3–5 months from concept to handover. Commercial projects depend on area — a 5,000 sq ft office averages 8–12 weeks. We provide a detailed timeline during the discovery call and update it weekly via your project dashboard.",
  },
  {
    question: "Do you work within a budget?",
    answer:
      "Absolutely. Every project starts with a transparent cost estimate broken into design fees, material costs, labour, and contingency (typically 8–10%). We generate a detailed Bill of Quantities (BOQ) so you see exactly where each rupee goes. Milestone-based payments ensure you never pay ahead of completed work.",
  },
  {
    question: "Do you handle construction and renovation?",
    answer:
      "Yes. Our verified contractor network covers civil work, electrical, plumbing, carpentry, painting, and HVAC. We manage all coordination so you have a single point of contact. For renovation projects, we plan phased execution to minimize disruption — especially important when you're living in the space.",
  },
  {
    question: "Can I see 3D renders before execution?",
    answer:
      "Every design package includes photorealistic 3D renders of every room. You'll review and approve renders before we order a single material. For premium projects, we also offer VR walkthroughs so you can 'walk through' your future space wearing a headset, and AR furniture placement to preview pieces in your actual room.",
  },
  {
    question: "Do you work on single-room projects?",
    answer:
      "We do — and we love them. Whether it's a bedroom makeover, home office setup, nursery design, or a kitchen refresh, we have packages starting at INR 50,000. Single-room projects are a great way to experience our process before committing to a full home.",
  },
  {
    question: "What cities do you currently serve?",
    answer:
      "We're active in Mumbai, Bangalore, Delhi NCR, Hyderabad, Pune, Chennai, Kolkata, Ahmedabad, Jaipur, and Kochi. Virtual design consultations are available nationwide — we can create designs remotely and partner with local contractors for execution in other cities.",
  },
  {
    question: "What is your warranty and post-handover support?",
    answer:
      "All projects include a 1-year comprehensive warranty covering workmanship, modular fittings, and installed fixtures. We also offer an optional 3-year extended care plan that covers annual inspections, touch-up painting, and hardware servicing at a flat annual fee.",
  },
];

// --- Process Steps ---
export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "A 45-minute conversation to understand your space, lifestyle, aesthetic preferences, budget, and timeline. We visit the site (or review floor plans remotely) and define the project scope.",
    icon: "phone",
  },
  {
    step: 2,
    title: "Concept & Mood Board",
    description:
      "We present 2–3 design directions with curated mood boards, material palettes, and spatial layouts. You pick the direction that resonates — or we blend elements until it's perfect.",
    icon: "palette",
  },
  {
    step: 3,
    title: "3D Visualization",
    description:
      "Photorealistic renders of every room so you see the final result before a single nail is hammered. Revisions are included until you sign off on the design.",
    icon: "cube",
  },
  {
    step: 4,
    title: "Execution",
    description:
      "Our project manager coordinates contractors, material procurement, and quality checks. You get daily progress photos, weekly video walkthroughs, and milestone updates.",
    icon: "hammer",
  },
  {
    step: 5,
    title: "Handover",
    description:
      "A thorough quality inspection, deep cleaning, and styling before we hand you the keys. Includes a digital binder with all warranties, care guides, and paint codes for future touch-ups.",
    icon: "key",
  },
];

// --- About Stats ---
export const aboutStats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "15+", label: "Years of Experience" },
  { value: "10", label: "Cities Served" },
  { value: "98%", label: "Client Satisfaction" },
];
