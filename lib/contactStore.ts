export interface ContactLead {
  id: number;
  type: "contact" | "faq";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  createdAt: string;
  status: "New" | "In Progress" | "Resolved";
}

export const INITIAL_CONTACTS: ContactLead[] = [
  {
    id: 1,
    type: "contact",
    name: "Marcus Vance",
    email: "marcus.vance@solarispay.io",
    phone: "+1 (415) 890-2341",
    company: "SolarisPay FinTech",
    message: "We need a complete web and mobile dashboard architecture with multi-currency crypto-to-fiat conversion, biometric auth, and PCI-DSS compliance. Looking to begin next month.",
    createdAt: "2026-10-19 14:32",
    status: "New",
  },
  {
    id: 2,
    type: "contact",
    name: "Elena Rostova",
    email: "elena@luminahealth.com",
    phone: "+44 20 7946 0912",
    company: "Lumina Health UK",
    message: "Interested in rebuilding our patient scheduling portal using Next.js and secure HL7/FHIR API integrations. Could we arrange an introductory discovery call?",
    createdAt: "2026-10-18 10:15",
    status: "In Progress",
  },
  {
    id: 3,
    type: "faq",
    name: "Rohan Mukherjee",
    email: "rohan.m@zenithlogistics.in",
    phone: "+91 98301 22441",
    company: "Zenith Logistics",
    message: "What is your typical turnaround timeline for an MVP mobile application with fleet GPS tracking?",
    createdAt: "2026-10-17 18:40",
    status: "Resolved",
  },
  {
    id: 4,
    type: "contact",
    name: "Liam O'Connor",
    email: "liam@dublinretail.ie",
    phone: "+353 1 496 0123",
    company: "Dublin Retail Group",
    message: "Looking for an expert Shopify Plus agency to migrate from Magento with 25,000 SKUs and custom ERP inventory integration.",
    createdAt: "2026-10-16 09:20",
    status: "Resolved",
  }
];

const STORAGE_KEY = "techshift_contacts";

export function getStoredContacts(): ContactLead[] {
  if (typeof window === "undefined") {
    return INITIAL_CONTACTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
      return INITIAL_CONTACTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load contacts from localStorage:", err);
  }
  return INITIAL_CONTACTS;
}

export function saveStoredContacts(contacts: ContactLead[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    window.dispatchEvent(new Event("contacts_updated"));
  } catch (err) {
    console.error("Failed to save contacts to localStorage:", err);
  }
}

export function addContactLead(data: Omit<ContactLead, "id" | "createdAt" | "status">): ContactLead {
  const current = getStoredContacts();
  const newId = current.length > 0 ? Math.max(...current.map((c) => c.id)) + 1 : 1;
  const now = new Date();
  const dateStr = now.toISOString().replace("T", " ").substring(0, 16);

  const newLead: ContactLead = {
    ...data,
    id: newId,
    createdAt: dateStr,
    status: "New",
  };

  const updated = [newLead, ...current];
  saveStoredContacts(updated);
  return newLead;
}
