export interface Faq {
  id: number;
  question: string;
  answer: string;
  orderIndex?: number;
  status: "Published" | "Draft" | "Archived";
}

const STORAGE_KEY = "techshift_faqs";

export function getStoredFaqs(): Faq[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (err) {
    console.error("Failed to load FAQs from localStorage:", err);
  }
  return [];
}

export function getPublishedFaqs(): Faq[] {
  return getStoredFaqs().filter((f) => f.status === "Published");
}

export function saveStoredFaqs(faqs: Faq[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(faqs));
    window.dispatchEvent(new Event("faqs_updated"));
  } catch (err) {
    console.error("Failed to save FAQs to localStorage:", err);
  }
}

// ================= DATABASE API METHODS =================

export async function fetchFaqs(status?: string): Promise<Faq[]> {
  try {
    const url = status ? `/api/faqs?status=${encodeURIComponent(status)}` : "/api/faqs";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch FAQs");
    const data: Faq[] = await res.json();
    if (typeof window !== "undefined" && !status && Array.isArray(data)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("faqs_updated"));
    }
    return data;
  } catch (error) {
    console.error("Error in fetchFaqs:", error);
    const local = getStoredFaqs();
    return status ? local.filter((f) => f.status.toLowerCase() === status.toLowerCase()) : local;
  }
}

export async function createFaq(faqData: Omit<Faq, "id">): Promise<Faq> {
  const res = await fetch("/api/faqs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faqData),
  });
  if (!res.ok) throw new Error("Failed to create FAQ in database");
  const created = await res.json();
  await fetchFaqs();
  return created;
}

export async function updateFaq(faqData: Faq): Promise<Faq> {
  const res = await fetch("/api/faqs", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(faqData),
  });
  if (!res.ok) throw new Error("Failed to update FAQ in database");
  const updated = await res.json();
  await fetchFaqs();
  return updated;
}

export async function deleteFaq(id: number): Promise<boolean> {
  const res = await fetch(`/api/faqs?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete FAQ in database");
  await fetchFaqs();
  return true;
}
