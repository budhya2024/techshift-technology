export interface Project {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
}

export const INITIAL_CATEGORIES: string[] = [
  "Development",
  "Mobile",
  "Design",
  "Marketing",
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 1,
    category: "Development",
    title: "E-commerce Platform",
    description:
      "Modern e-commerce platform with advanced filtering, payment integration, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 2,
    category: "Mobile",
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication and real-time transactions.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
    tags: ["React Native", "Firebase", "Plaid API"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 3,
    category: "Design",
    title: "Brand Identity Design",
    description:
      "Complete brand identity package including logo, color palette, and brand guidelines.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    tags: ["Figma", "Adobe Creative Suite"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 4,
    category: "Development",
    title: "Hospital Management System",
    description:
      "Comprehensive hospital management system with patient records, appointments, and billing.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
    tags: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 5,
    category: "Marketing",
    title: "Digital Marketing Campaign",
    description:
      "Full-scale digital marketing campaign with SEO, social media, and Google Ads management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
    tags: ["Google Ads", "SEO", "Meta Ads"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 6,
    category: "Mobile",
    title: "Food Delivery App",
    description:
      "On-demand food delivery app with real-time tracking, push notifications, and payment gateway.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
    tags: ["Flutter", "Firebase", "Stripe"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 7,
    category: "Development",
    title: "Real Estate Portal",
    description:
      "Property listing and management portal with advanced search, filters, and agent dashboard.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80",
    tags: ["React", "Node.js", "MongoDB", "Maps API"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 8,
    category: "Design",
    title: "SaaS Dashboard UI",
    description:
      "Clean and modern SaaS dashboard UI design with analytics, charts, and data visualization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    tags: ["Figma", "Prototyping", "UI/UX"],
    liveUrl: "https://techshifttechnology.com",
  },
  {
    id: 9,
    category: "Marketing",
    title: "Social Media Strategy",
    description:
      "Complete social media strategy and content calendar resulting in 300% engagement growth.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
    tags: ["Instagram", "LinkedIn", "Content Creation"],
    liveUrl: "https://techshifttechnology.com",
  },
];

const STORAGE_KEY = "techshift_portfolio_projects";
const CATEGORIES_KEY = "techshift_portfolio_categories";

export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") {
    return INITIAL_PROJECTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load portfolio projects from localStorage:", err);
  }
  return INITIAL_PROJECTS;
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("portfolio_updated"));
  } catch (err) {
    console.error("Failed to save portfolio projects to localStorage:", err);
  }
}

export function getStoredCategories(): string[] {
  if (typeof window === "undefined") {
    return INITIAL_CATEGORIES;
  }
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY);
    if (!raw) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load categories from localStorage:", err);
  }
  return INITIAL_CATEGORIES;
}

export function saveStoredCategories(categories: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    window.dispatchEvent(new Event("portfolio_updated"));
  } catch (err) {
    console.error("Failed to save categories to localStorage:", err);
  }
}
