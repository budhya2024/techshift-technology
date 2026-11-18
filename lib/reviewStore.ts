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

export const INITIAL_REVIEWS: Review[] = [];

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
