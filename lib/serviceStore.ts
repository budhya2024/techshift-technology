export interface Service {
  id: number;
  title: string;
  description: string;
  link: string;
  bgImage: string;
  badge?: string;
  category?: string;
}

export const INITIAL_SERVICES: Service[] = [
  {
    id: 1,
    title: "Shopify Development",
    description: "Custom Shopify e-commerce storefronts, custom theme building, app integrations, and checkout conversion optimization.",
    link: "/contact",
    bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
    badge: "E-Commerce",
    category: "Development"
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android built with React Native and Flutter.",
    link: "/contact",
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
    badge: "iOS / Android",
    category: "Mobile"
  },
  {
    id: 3,
    title: "Website Development",
    description: "Modern, high-performance, and responsive web applications built with Next.js, React, and cutting-edge frontend architectures.",
    link: "/contact",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    badge: "Next.js / React",
    category: "Development"
  },
  {
    id: 4,
    title: "Digital Marketing",
    description: "Strategic SEO optimization, targeted Google & Meta ad campaigns, social media marketing, and brand growth strategies.",
    link: "/contact",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    badge: "Growth & SEO",
    category: "Marketing"
  },
  {
    id: 5,
    title: "AI Solutions",
    description: "Smart AI integration, custom LLM chatbots, automated workflow intelligence, and predictive business data analytics.",
    link: "/contact",
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    badge: "Machine Learning",
    category: "AI & Data"
  },
  {
    id: 6,
    title: "Cloud & DevOps",
    description: "Scalable cloud infrastructure, automated CI/CD deployment pipelines, containerization, and server security setups.",
    link: "/contact",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    badge: "AWS / Docker",
    category: "Infrastructure"
  }
];

const STORAGE_KEY = "techshift_services";

export function getStoredServices(): Service[] {
  if (typeof window === "undefined") {
    return INITIAL_SERVICES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SERVICES));
      return INITIAL_SERVICES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load services from localStorage:", err);
  }
  return INITIAL_SERVICES;
}

export function saveStoredServices(services: Service[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new Event("services_updated"));
  } catch (err) {
    console.error("Failed to save services to localStorage:", err);
  }
}
