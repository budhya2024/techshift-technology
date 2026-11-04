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
    status: "Pending",
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
    role: "Product Lead",
    company: "Nexus Labs",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    content: "Outstanding quality and incredible domain knowledge across Next.js and cloud architectures. They helped us launch our mobile app without any friction.",
    rating: 5,
    date: "Jun 22, 2026",
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
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load reviews from localStorage:", err);
  }
  return INITIAL_REVIEWS;
}

export function getPublishedReviews(): Review[] {
  return getStoredReviews().filter((r) => r.status === "Published");
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

// ================= DATABASE API METHODS =================

export async function fetchReviews(status?: string): Promise<Review[]> {
  try {
    const url = status ? `/api/reviews?status=${encodeURIComponent(status)}` : "/api/reviews";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    const data: Review[] = await res.json();
    if (typeof window !== "undefined" && !status && Array.isArray(data)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("reviews_updated"));
    }
    return data;
  } catch (error) {
    console.error("Error in fetchReviews:", error);
    const local = getStoredReviews();
    return status ? local.filter((r) => r.status.toLowerCase() === status.toLowerCase()) : local;
  }
}

export async function createReview(reviewData: Omit<Review, "id">): Promise<Review> {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error("Failed to create review in database");
  const created = await res.json();
  await fetchReviews();
  return created;
}

export async function updateReview(reviewData: Review): Promise<Review> {
  const res = await fetch("/api/reviews", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error("Failed to update review in database");
  const updated = await res.json();
  await fetchReviews();
  return updated;
}

export async function deleteReview(id: number): Promise<boolean> {
  const res = await fetch(`/api/reviews?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete review in database");
  await fetchReviews();
  return true;
}
