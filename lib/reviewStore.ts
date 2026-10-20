export interface Review {
  id: number;
  name: string;
  role: string;
  company?: string;
  image: string;
  content: string;
  rating: number;
  date?: string;
  status: "Published" | "Pending" | "Archived";
}

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    company: "TechFlow Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    content: "Techshift completely transformed our digital presence. Their attention to detail and ability to execute complex technical requirements flawlessly is unmatched. We saw a 200% increase in user engagement within the first three months of launch.",
    rating: 5,
    date: "Oct 12, 2026",
    status: "Published",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Founder, GrowthStack",
    company: "GrowthStack",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    content: "The team at Techshift isn't just a development agency; they are strategic partners. They helped us rethink our entire user journey and delivered a product that looks stunning and performs even better.",
    rating: 5,
    date: "Sep 28, 2026",
    status: "Published",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "VentureScale",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    content: "Working with them was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and the design is absolutely breathtaking.",
    rating: 5,
    date: "Aug 19, 2026",
    status: "Published",
  },
  {
    id: 4,
    name: "Alexander Wright",
    role: "VP of Engineering",
    company: "CyberCore Dynamics",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    content: "The speed of execution combined with enterprise-grade security standards blew us away. Highly recommended for complex SaaS products and scalable microservices.",
    rating: 5,
    date: "Jul 10, 2026",
    status: "Published",
  },
  {
    id: 5,
    name: "Michael Chang",
    role: "CTO, NextGen Solutions",
    company: "NextGen Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    content: "We had a highly complex backend architecture requirement. Not only did they deliver a robust, scalable solution, but the code quality was pristine with complete documentation.",
    rating: 5,
    date: "Jun 24, 2026",
    status: "Published",
  },
  {
    id: 6,
    name: "Jessica Walsh",
    role: "Product Manager",
    company: "Nova Studios",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    content: "Their UI/UX team is phenomenal. They took our vague ideas and turned them into a beautiful, intuitive interface that our customers love.",
    rating: 5,
    date: "May 15, 2026",
    status: "Published",
  },
  {
    id: 7,
    name: "Amanda Smith",
    role: "Co-Founder, RetailPulse",
    company: "RetailPulse",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    content: "Our mobile conversion rates jumped 45% immediately after launching the new React Native app created by Techshift. Exceptional craft and reliable support.",
    rating: 5,
    date: "Apr 02, 2026",
    status: "Published",
  },
  {
    id: 8,
    name: "Robert Fox",
    role: "Operations Head",
    company: "Apex Global",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    content: "Professional, responsive, and incredibly talented. They are our go-to technology partners for all digital initiatives.",
    rating: 4,
    date: "Mar 11, 2026",
    status: "Published",
  }
];

const STORAGE_KEY = "techshift_reviews";

export function getStoredReviews(): Review[] {
  if (typeof window === "undefined") {
    return INITIAL_REVIEWS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load reviews from localStorage:", err);
  }
  return INITIAL_REVIEWS;
}

export function saveStoredReviews(reviews: Review[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    window.dispatchEvent(new Event("reviews_updated"));
  } catch (err) {
    console.error("Failed to save reviews to localStorage:", err);
  }
}
