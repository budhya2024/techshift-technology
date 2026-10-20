"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  Star,
  Mail,
  Plus,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  RefreshCw,
  Eye,
  Check,
  X,
  Menu,
  Tag,
  MessageSquare,
  Clock,
  Building2,
  Phone,
  User,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Inbox,
  LogOut,
  Upload,
  Filter
} from "lucide-react";

import {
  getStoredProjects,
  saveStoredProjects,
  getStoredCategories,
  saveStoredCategories,
  INITIAL_PROJECTS,
  INITIAL_CATEGORIES,
  Project,
} from "@/lib/portfolioStore";

import {
  getStoredServices,
  saveStoredServices,
  INITIAL_SERVICES,
  Service,
} from "@/lib/serviceStore";

import {
  getStoredReviews,
  saveStoredReviews,
  INITIAL_REVIEWS,
  Review,
} from "@/lib/reviewStore";

import {
  getStoredContacts,
  saveStoredContacts,
  INITIAL_CONTACTS,
  ContactLead,
} from "@/lib/contactStore";

type AdminTab = "dashboard" | "services" | "reviews" | "portfolio" | "contact";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ================= DATA STATES =================
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contacts, setContacts] = useState<ContactLead[]>([]);

  // Load all data on mount
  useEffect(() => {
    setProjects(getStoredProjects());
    setCategories(getStoredCategories());
    setServices(getStoredServices());
    setReviews(getStoredReviews());
    setContacts(getStoredContacts());

    const handlePortfolio = () => {
      setProjects(getStoredProjects());
      setCategories(getStoredCategories());
    };
    const handleServices = () => setServices(getStoredServices());
    const handleReviews = () => setReviews(getStoredReviews());
    const handleContacts = () => setContacts(getStoredContacts());

    window.addEventListener("portfolio_updated", handlePortfolio);
    window.addEventListener("services_updated", handleServices);
    window.addEventListener("reviews_updated", handleReviews);
    window.addEventListener("contacts_updated", handleContacts);

    return () => {
      window.removeEventListener("portfolio_updated", handlePortfolio);
      window.removeEventListener("services_updated", handleServices);
      window.removeEventListener("reviews_updated", handleReviews);
      window.removeEventListener("contacts_updated", handleContacts);
    };
  }, []);

  // Save Handlers
  const updateProjects = (data: Project[]) => {
    setProjects(data);
    saveStoredProjects(data);
  };
  const updateCategories = (data: string[]) => {
    setCategories(data);
    saveStoredCategories(data);
  };
  const updateServices = (data: Service[]) => {
    setServices(data);
    saveStoredServices(data);
  };
  const updateReviews = (data: Review[]) => {
    setReviews(data);
    saveStoredReviews(data);
  };
  const updateContacts = (data: ContactLead[]) => {
    setContacts(data);
    saveStoredContacts(data);
  };

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    title: string;
    itemName?: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const confirmDelete = (
    title: string,
    message: string,
    onConfirm: () => void,
    itemName?: string
  ) => {
    setDeleteModal({
      isOpen: true,
      title,
      itemName,
      message,
      onConfirm: () => {
        onConfirm();
        setDeleteModal(null);
      },
    });
  };

  // Reset all stores to defaults
  const handleResetAllData = () => {
    confirmDelete(
      "Reset All Admin Data",
      "Are you sure you want to reset all Services, Reviews, Portfolio projects, and Contact leads back to the default initial sample data?",
      () => {
        updateProjects(INITIAL_PROJECTS);
        updateCategories(INITIAL_CATEGORIES);
        updateServices(INITIAL_SERVICES);
        updateReviews(INITIAL_REVIEWS);
        updateContacts(INITIAL_CONTACTS);
      },
      "Reset to Default Sample Data"
    );
  };

  // Helper: Handle file image upload and convert to base64 data URL
  const handleImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, SVG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onSuccess(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // ================= TAB SPECIFIC FILTERS & MODALS =================

  // 1. SERVICES
  const [serviceSearch, setServiceSearch] = useState("");
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    category: "",
    badge: "",
    description: "",
    link: "",
    bgImage: "",
  });

  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceForm({
      title: "",
      category: "",
      badge: "",
      description: "",
      link: "",
      bgImage: "",
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (s: Service) => {
    setEditingService(s);
    setServiceForm({
      title: s.title,
      category: s.category || "",
      badge: s.badge || "",
      description: s.description,
      link: s.link || "",
      bgImage: s.bgImage || "",
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.description.trim()) {
      alert("Please fill in the title and description.");
      return;
    }

    if (editingService) {
      const updated = services.map((s) =>
        s.id === editingService.id
          ? {
            ...s,
            title: serviceForm.title,
            category: serviceForm.category,
            badge: serviceForm.badge,
            description: serviceForm.description,
            link: serviceForm.link,
            bgImage: serviceForm.bgImage,
          }
          : s
      );
      updateServices(updated);
    } else {
      const newId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
      const newService: Service = {
        id: newId,
        title: serviceForm.title,
        category: serviceForm.category,
        badge: serviceForm.badge || undefined,
        description: serviceForm.description,
        link: serviceForm.link || "",
        bgImage: serviceForm.bgImage || "",
      };
      updateServices([...services, newService]);
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (service: Service) => {
    confirmDelete(
      "Delete Service",
      "Are you sure you want to delete this service? It will no longer be visible on your website.",
      () => {
        updateServices(services.filter((s) => s.id !== service.id));
      },
      service.title
    );
  };

  const filteredServices = useMemo(() => {
    return services.filter(
      (s) =>
        s.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(serviceSearch.toLowerCase()) ||
        (s.badge && s.badge.toLowerCase().includes(serviceSearch.toLowerCase()))
    );
  }, [services, serviceSearch]);

  // 2. REVIEWS
  const [reviewSearch, setReviewSearch] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    status: "Published" as "Published" | "Pending",
  });

  const handleOpenAddReview = () => {
    setEditingReview(null);
    setReviewForm({
      name: "",
      role: "",
      company: "",
      content: "",
      rating: 5,
      image: "",
      status: "Published",
    });
    setIsReviewModalOpen(true);
  };

  const handleOpenEditReview = (r: Review) => {
    setEditingReview(r);
    setReviewForm({
      name: r.name,
      role: r.role,
      company: r.company || "",
      content: r.content,
      rating: r.rating,
      image: r.image,
      status: r.status === "Archived" ? "Pending" : r.status,
    });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.content.trim()) {
      alert("Please fill in reviewer name and review text.");
      return;
    }

    if (editingReview) {
      const updated = reviews.map((r) =>
        r.id === editingReview.id
          ? {
            ...r,
            name: reviewForm.name,
            role: reviewForm.role,
            company: reviewForm.company,
            content: reviewForm.content,
            rating: reviewForm.rating,
            image: reviewForm.image,
            status: reviewForm.status,
          }
          : r
      );
      updateReviews(updated);
    } else {
      const newId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1;
      const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const newReview: Review = {
        id: newId,
        name: reviewForm.name,
        role: reviewForm.role,
        company: reviewForm.company,
        content: reviewForm.content,
        rating: reviewForm.rating,
        image: reviewForm.image,
        date: today,
        status: reviewForm.status,
      };
      updateReviews([newReview, ...reviews]);
    }
    setIsReviewModalOpen(false);
  };

  const handleDeleteReview = (review: Review) => {
    confirmDelete(
      "Delete Review",
      "Are you sure you want to delete this client testimonial? This action cannot be undone.",
      () => {
        updateReviews(reviews.filter((r) => r.id !== review.id));
      },
      review.name
    );
  };

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        r.role.toLowerCase().includes(reviewSearch.toLowerCase()) ||
        r.content.toLowerCase().includes(reviewSearch.toLowerCase());
      return matchSearch;
    });
  }, [reviews, reviewSearch]);

  // 3. PORTFOLIO
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState("All");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewCategoryInput, setIsNewCategoryInput] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    tags: "",
    liveUrl: "",
  });

  const handleOpenAddProject = () => {
    setEditingProject(null);
    setIsNewCategoryInput(false);
    setProjectForm({
      title: "",
      category: categories.length > 0 ? categories[0] : "",
      description: "",
      image: "",
      tags: "",
      liveUrl: "",
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (p: Project) => {
    setEditingProject(p);
    setIsNewCategoryInput(!categories.includes(p.category));
    setProjectForm({
      title: p.title,
      category: p.category,
      description: p.description,
      image: p.image,
      tags: p.tags.join(", "),
      liveUrl: p.liveUrl,
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.description.trim()) {
      alert("Please fill in project title and description.");
      return;
    }

    const trimmedCategory = projectForm.category.trim();
    if (!trimmedCategory) {
      alert("Please specify a category for the project.");
      return;
    }

    // Automatically register and persist new category if not already in categories
    if (!categories.includes(trimmedCategory)) {
      updateCategories([...categories, trimmedCategory]);
    }

    const tagsArray = projectForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingProject) {
      const updated = projects.map((p) =>
        p.id === editingProject.id
          ? {
            ...p,
            title: projectForm.title,
            category: trimmedCategory,
            description: projectForm.description,
            image: projectForm.image,
            tags: tagsArray,
            liveUrl: projectForm.liveUrl,
          }
          : p
      );
      updateProjects(updated);
    } else {
      const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      const newProj: Project = {
        id: newId,
        title: projectForm.title,
        category: trimmedCategory,
        description: projectForm.description,
        image: projectForm.image,
        tags: tagsArray,
        liveUrl: projectForm.liveUrl,
      };
      updateProjects([newProj, ...projects]);
    }
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (project: Project) => {
    confirmDelete(
      "Delete Showcase Project",
      "Are you sure you want to delete this project from your showcase portfolio?",
      () => {
        updateProjects(projects.filter((p) => p.id !== project.id));
      },
      project.title
    );
  };



  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = selectedPortfolioCategory === "All" || p.category === selectedPortfolioCategory;
      const matchSearch =
        p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(projectSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [projects, projectSearch, selectedPortfolioCategory]);

  // 4. CONTACT US / LEADS
  const [contactSearch, setContactSearch] = useState("");
  const [contactStatusFilter, setContactStatusFilter] = useState<"All" | "New" | "In Progress" | "Resolved">("All");
  const [contactTypeFilter, setContactTypeFilter] = useState<"All" | "contact" | "faq">("All");
  const [selectedLeadModal, setSelectedLeadModal] = useState<ContactLead | null>(null);

  const handleStatusChange = (id: number, newStatus: "New" | "In Progress" | "Resolved") => {
    const updated = contacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    updateContacts(updated);
    if (selectedLeadModal && selectedLeadModal.id === id) {
      setSelectedLeadModal({ ...selectedLeadModal, status: newStatus });
    }
  };

  const handleDeleteContact = (lead: ContactLead) => {
    confirmDelete(
      "Delete Contact Inquiry",
      `Are you sure you want to delete the inquiry from "${lead.name}"? This action cannot be undone.`,
      () => {
        updateContacts(contacts.filter((c) => c.id !== lead.id));
        if (selectedLeadModal?.id === lead.id) setSelectedLeadModal(null);
      },
      lead.name
    );
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchStatus = contactStatusFilter === "All" || c.status === contactStatusFilter;
      const matchType = contactTypeFilter === "All" || c.type === contactTypeFilter;
      const matchSearch =
        c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(contactSearch.toLowerCase())) ||
        c.message.toLowerCase().includes(contactSearch.toLowerCase());
      return matchStatus && matchType && matchSearch;
    });
  }, [contacts, contactStatusFilter, contactTypeFilter, contactSearch]);

  const unreadContactCount = useMemo(() => {
    return contacts.filter((c) => c.status === "New").length;
  }, [contacts]);

  // ================= EXECUTIVE LIGHT THEME CLASSMAP =================
  const theme = {
    bgPage: "bg-[#f8fafc]",
    bgHeader: "bg-white border-slate-200/90",
    bgCard: "bg-white border-slate-200/90 shadow-xs",
    bgCardHover: "hover:border-red-500/50 hover:shadow-md",
    textPrimary: "text-slate-900 font-bold",
    textSecondary: "text-slate-700",
    textMuted: "text-slate-500",
    inputBg: "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white",
    tableRowHover: "hover:bg-slate-50/80",
    tableHeaderBg: "bg-slate-50 text-slate-700 font-bold",
    borderBase: "border-slate-200",
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans flex flex-col md:flex-row antialiased">
      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-xs"
        />
      )}

      {/* ======================================================== */}
      {/* EXECUTIVE WHITE SIDEBAR                                  */}
      {/* ======================================================== */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 w-72 bg-white border-r border-slate-200 h-screen flex flex-col justify-between p-5 transition-transform duration-300 shadow-sm ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1 border-b border-slate-200/80 pb-4">
            <Link href="/" className="flex items-center space-x-2">
              <img
                src="/images/techshift_logo.png"
                alt="Techshift Technology"
                className="h-9 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/images/techshift_logo.png";
                }}
              />
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>


          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Navigation Menu
            </p>

            {/* 1. Dashboard Overview */}
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === "dashboard"
                ? "bg-red-600 text-white font-semibold shadow-sm shadow-red-600/20"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
            >
              <div className="flex items-center space-x-3">
                <LayoutDashboard className="w-4.5 h-4.5" />
                <span>Overview</span>
              </div>
            </button>

            {/* 2. Service Navigation */}
            <button
              onClick={() => {
                setActiveTab("services");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === "services"
                ? "bg-red-600 text-white font-semibold shadow-sm shadow-red-600/20"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
            >
              <div className="flex items-center space-x-3">
                <Layers className="w-4.5 h-4.5" />
                <span>Service</span>
              </div>
            </button>

            {/* 3. Review Navigation */}
            <button
              onClick={() => {
                setActiveTab("reviews");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === "reviews"
                ? "bg-red-600 text-white font-semibold shadow-sm shadow-red-600/20"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
            >
              <div className="flex items-center space-x-3">
                <Star className="w-4.5 h-4.5" />
                <span>Review</span>
              </div>
            </button>

            {/* 4. Portfolio Navigation */}
            <button
              onClick={() => {
                setActiveTab("portfolio");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === "portfolio"
                ? "bg-red-600 text-white font-semibold shadow-sm shadow-red-600/20"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
            >
              <div className="flex items-center space-x-3">
                <FolderKanban className="w-4.5 h-4.5" />
                <span>Portfolio</span>
              </div>
            </button>

            {/* 5. Contact Us Navigation */}
            <button
              onClick={() => {
                setActiveTab("contact");
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${activeTab === "contact"
                ? "bg-red-600 text-white font-semibold shadow-sm shadow-red-600/20"
                : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
            >
              <div className="flex items-center space-x-3">
                <Mail className="w-4.5 h-4.5" />
                <span>Contact Us</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Only Logout Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-red-600 border border-rose-200/80 hover:border-red-600 rounded-xl transition-all shadow-2xs group"
          >
            <LogOut className="w-4.5 h-4.5 text-rose-500 group-hover:text-white group-hover:-translate-x-0.5 transition-all" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* MAIN WORKSPACE CANVAS                                    */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 pb-16">
        {/* Top Header Bar */}
        <header className={`sticky top-0 z-30 ${theme.bgHeader} border-b px-4 md:px-8 py-3.5 flex items-center justify-between gap-4 transition-colors`}>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium mb-0.5">
                <span>Admin Portal</span>
                <span className="text-slate-400">/</span>
                <span className="capitalize font-semibold text-red-600">{activeTab}</span>
              </div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight capitalize">
                {activeTab === "dashboard"
                  ? "Executive Overview"
                  : activeTab === "services"
                    ? "Services Catalog"
                    : activeTab === "reviews"
                      ? "Client Reviews & Testimonials"
                      : activeTab === "portfolio"
                        ? "Portfolio Projects & Showcase"
                        : "Contact Inquiries & Leads"}
              </h1>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center space-x-2.5">

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden sm:inline">Live Site</span>
            </Link>
          </div>
        </header>

        {/* Content Body Container */}
        <div className="p-4 md:p-6 space-y-6 max-w-7xl">
          {/* ======================================================== */}
          {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW                     */}
          {/* ======================================================== */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Services KPI */}
                <div
                  onClick={() => setActiveTab("services")}
                  className={`p-4.5 ${theme.bgCard} ${theme.bgCardHover} rounded-xl cursor-pointer transition-all group border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Active Services
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Layers className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{services.length}</p>
                  <p className="text-sm text-slate-500 mt-2.5 flex items-center gap-1 font-medium">
                    <span>Manage offerings</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                  </p>
                </div>

                {/* Reviews KPI */}
                <div
                  onClick={() => setActiveTab("reviews")}
                  className={`p-4.5 ${theme.bgCard} ${theme.bgCardHover} rounded-xl cursor-pointer transition-all group border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Client Reviews
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Star className="w-4.5 h-4.5 fill-amber-500 text-amber-500" />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{reviews.length}</p>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      ★ 4.9 Avg
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2.5 flex items-center gap-1 font-medium">
                    <span>Client testimonials</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                  </p>
                </div>

                {/* Portfolio KPI */}
                <div
                  onClick={() => setActiveTab("portfolio")}
                  className={`p-4.5 ${theme.bgCard} ${theme.bgCardHover} rounded-xl cursor-pointer transition-all group border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Portfolio Showcase
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FolderKanban className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{projects.length}</p>
                    <span className="text-xs text-slate-500 font-medium">
                      in {categories.length} categories
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2.5 flex items-center gap-1 font-medium">
                    <span>Live showcases</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                  </p>
                </div>

                {/* Contact Leads KPI */}
                <div
                  onClick={() => setActiveTab("contact")}
                  className={`p-4.5 ${theme.bgCard} ${theme.bgCardHover} rounded-xl cursor-pointer transition-all group border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Contact Inquiries
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Inbox className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{contacts.length}</p>
                    {unreadContactCount > 0 && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                        {unreadContactCount} new
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-2.5 flex items-center gap-1 font-medium">
                    <span>Client requests</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
                  </p>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className={`p-4.5 ${theme.bgCard} rounded-xl border`}>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  Quick Actions & Shortcuts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setActiveTab("services");
                      handleOpenAddService();
                    }}
                    className="p-3.5 rounded-xl border text-left transition-all group bg-slate-50 hover:bg-white hover:shadow-xs border-slate-200 hover:border-red-500/40"
                  >
                    <Layers className="w-5 h-5 text-red-600 mb-2 group-hover:scale-105 transition-transform" />
                    <p className="text-sm font-bold text-slate-900">New Service</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Create service card</p>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("reviews");
                      handleOpenAddReview();
                    }}
                    className="p-3.5 rounded-xl border text-left transition-all group bg-slate-50 hover:bg-white hover:shadow-xs border-slate-200 hover:border-red-500/40"
                  >
                    <Star className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-105 transition-transform" />
                    <p className="text-sm font-bold text-slate-900">New Review</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Add client feedback</p>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("portfolio");
                      handleOpenAddProject();
                    }}
                    className="p-3.5 rounded-xl border text-left transition-all group bg-slate-50 hover:bg-white hover:shadow-xs border-slate-200 hover:border-red-500/40"
                  >
                    <FolderKanban className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-105 transition-transform" />
                    <p className="text-sm font-bold text-slate-900">New Project</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Showcase project</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("contact")}
                    className="p-3.5 rounded-xl border text-left transition-all group bg-slate-50 hover:bg-white hover:shadow-xs border-slate-200 hover:border-red-500/40"
                  >
                    <Mail className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-105 transition-transform" />
                    <p className="text-sm font-bold text-slate-900">View Leads</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{contacts.length} submissions</p>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className={`p-4.5 ${theme.bgCard} rounded-xl border space-y-3.5`}>
                <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      Recent Inquiries & Contact Submissions
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">Live customer messages from Contact & FAQ forms</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors flex items-center gap-1"
                  >
                    <span>View All ({contacts.length})</span>

                  </button>
                </div>

                <div className="space-y-2.5">
                  {contacts.slice(0, 4).map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLeadModal(lead);
                        setActiveTab("contact");
                      }}
                      className="p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all bg-slate-50 hover:bg-white hover:shadow-xs border-slate-200"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-bold text-slate-900 truncate">{lead.name}</p>
                            <span
                              className={`text-xs font-semibold uppercase ${lead.type === "contact"
                                ? " text-red-600"
                                : "text-purple-700 "
                                }`}
                            >
                              {lead.type === "contact" ? "Contact Page" : "FAQ Question"}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 truncate max-w-lg mt-0.5 font-normal">
                            {lead.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5 text-xs flex-shrink-0">
                        <span
                          className={` text-xs font-bold uppercase ${lead.status === "New"
                            ? " text-rose-700 "
                            : lead.status === "In Progress"
                              ? " text-amber-800 "
                              : " text-emerald-800"
                            }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-xs font-medium text-slate-400">{lead.createdAt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SERVICE MANAGEMENT                                */}
          {/* ======================================================== */}
          {activeTab === "services" && (
            <div className="space-y-4">
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={serviceSearch}
                    onChange={(e) => setServiceSearch(e.target.value)}
                    placeholder="Search services by title, badge, or description..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white pl-9 pr-3.5 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500 transition-all"
                  />
                </div>

                <button
                  onClick={handleOpenAddService}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Service</span>
                </button>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className={`${theme.bgCard} rounded-xl overflow-hidden flex flex-col justify-between ${theme.bgCardHover} transition-all border`}
                  >
                    <div>
                      {/* Service Card Image Banner */}
                      <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                        <img
                          src={service.bgImage}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow-sm">
                            {service.badge || "Service"}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3">
                          <h3 className="text-sm md:text-base font-bold text-white drop-shadow-sm">{service.title}</h3>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-4">
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 font-normal">
                          {service.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-slate-200">
                          <span className="text-slate-500 font-medium text-[11px]">Target: {service.link}</span>
                          <span className="text-red-600 font-bold text-[11px]">{service.category || "General"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="px-4 py-2.5 border-t border-slate-200 bg-slate-50/70 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEditService(service)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className={`p-8 text-center ${theme.bgCard} rounded-xl border`}>
                  <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">No services found</p>
                  <p className="text-xs text-slate-500 mt-0.5">Try another search or add a new service.</p>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: REVIEW / TESTIMONIALS MANAGEMENT                 */}
          {/* ======================================================== */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {/* Header Filters & Add */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={reviewSearch}
                    onChange={(e) => setReviewSearch(e.target.value)}
                    placeholder="Search reviews by client name, role, quote..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white pl-9 pr-3.5 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500 transition-all"
                  />
                </div>

                <button
                  onClick={handleOpenAddReview}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Review</span>
                </button>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    className={`${theme.bgCard} rounded-xl p-4.5 flex flex-col justify-between ${theme.bgCardHover} transition-all border`}
                  >
                    <div>
                      {/* Client Header */}
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover border border-red-500/30 flex-shrink-0 shadow-2xs"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80";
                          }}
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs md:text-sm font-bold text-slate-900 truncate">{review.name}</h4>
                          <p className="text-xs text-slate-500 truncate font-medium">{review.role}</p>
                          {review.company && (
                            <p className="text-[11px] text-red-600 font-semibold truncate">{review.company}</p>
                          )}
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center space-x-1 mb-2.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-300"
                              }`}
                          />
                        ))}
                        <span className="text-xs text-amber-700 ml-1 font-bold">{review.rating}.0</span>
                      </div>

                      {/* Quote Content */}
                      <p className="text-sm text-slate-700 leading-relaxed mb-4 font-normal">
                        &ldquo;{review.content}&rdquo;
                      </p>
                    </div>

                    {/* Footer Info & Actions */}
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`  text-xs font-bold uppercase ${review.status === "Published"
                            ? " text-emerald-700 "
                            : " text-amber-700 "
                            }`}
                        >
                          {review.status}
                        </span>
                        <span className="text-xs font-medium text-slate-400">{review.date || "Active"}</span>
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleOpenEditReview(review)}
                          className="p-1.5 rounded-lg border transition-colors text-slate-600 hover:text-slate-900 bg-slate-50 border-slate-300 hover:bg-slate-100"
                          title="Edit Review"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review)}
                          className="p-1.5 text-rose-700 hover:bg-rose-100 bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredReviews.length === 0 && (
                <div className={`p-8 text-center ${theme.bgCard} rounded-xl border`}>
                  <Star className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">No reviews found</p>
                  <p className="text-xs text-slate-500 mt-0.5">Try another search or add a client testimonial.</p>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: PORTFOLIO SHOWCASE                                */}
          {/* ======================================================== */}
          {activeTab === "portfolio" && (
            <div className="space-y-4">
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 max-w-xl">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Search projects by title, description, or tags..."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white pl-9 pr-3.5 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500 transition-all"
                    />
                  </div>

                  {/* Category Dropdown Filter with Icon */}
                  <div className="relative min-w-[200px]">
                    <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={selectedPortfolioCategory}
                      onChange={(e) => setSelectedPortfolioCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs md:text-sm font-semibold pl-9 pr-8 py-2 rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-red-500 cursor-pointer transition-colors"
                    >
                      <option value="All">All Categories ({projects.length})</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat} ({projects.filter((p) => p.category === cat).length})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleOpenAddProject}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm flex-shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    className={`${theme.bgCard} rounded-xl overflow-hidden flex flex-col justify-between ${theme.bgCardHover} transition-all border`}
                  >
                    <div>
                      <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute top-2.5 left-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded shadow-sm">
                            {p.category}
                          </span>
                        </div>
                        <div className="absolute bottom-2.5 left-3 right-3">
                          <h3 className="text-sm md:text-base font-bold text-white drop-shadow-sm">{p.title}</h3>
                        </div>
                      </div>

                      <div className="p-4 space-y-2.5">
                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 font-normal">
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between">
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handleOpenEditProject(p)}
                          className="p-1.5 rounded-lg border transition-colors text-slate-600 hover:text-slate-900 bg-white border-slate-300 hover:bg-slate-100 shadow-2xs"
                          title="Edit Project"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p)}
                          className="p-1.5 text-rose-700 hover:bg-rose-100 bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className={`p-8 text-center ${theme.bgCard} rounded-xl border`}>
                  <FolderKanban className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-900">No showcase projects found</p>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or category filter</p>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: CONTACT US & INQUIRIES MANAGEMENT                 */}
          {/* ======================================================== */}
          {activeTab === "contact" && (
            <div className="space-y-4">
              {/* Header Filters */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={contactSearch}
                    onChange={(e) => setContactSearch(e.target.value)}
                    placeholder="Search by sender name, email, company, inquiry message..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white pl-9 pr-3.5 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500 transition-all"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={contactStatusFilter}
                    onChange={(e) => setContactStatusFilter(e.target.value as any)}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New (Unread)</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <select
                    value={contactTypeFilter}
                    onChange={(e) => setContactTypeFilter(e.target.value as any)}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-xs font-semibold px-3 py-2 rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  >
                    <option value="All">All Channels</option>
                    <option value="contact">Contact Form</option>
                    <option value="faq">FAQ Form</option>
                  </select>
                </div>
              </div>

              {/* Leads Table */}
              <div className={`${theme.bgCard} rounded-xl overflow-hidden border shadow-xs`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 uppercase font-semibold text-[11px] tracking-wider text-slate-500">
                      <tr>
                        <th className="py-3 px-4">Sender</th>
                        <th className="py-3 px-4">Channel</th>
                        <th className="py-3 px-4">Message Preview</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Received</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-slate-200">
                      {filteredContacts.map((lead) => (
                        <tr
                          key={lead.id}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                          onClick={() => setSelectedLeadModal(lead)}
                        >
                          {/* Sender Column */}
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center justify-center font-bold text-xs flex-shrink-0">
                                {lead.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 text-xs md:text-sm truncate">{lead.name}</p>
                                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{lead.email}</p>
                                {lead.company && (
                                  <p className="text-[11px] text-red-600 font-semibold truncate mt-0.5">{lead.company}</p>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Channel Column */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span
                              className={`text-xs font-semibold uppercase ${lead.type === "contact"
                                ? " text-blue-700 "
                                : " text-purple-700 "
                                }`}
                            >
                              {lead.type === "contact" ? "Contact Page" : "FAQ Form"}
                            </span>
                          </td>

                          {/* Message Snippet */}
                          <td className="py-3 px-4 max-w-xs md:max-w-md">
                            <p className="text-sm text-slate-600 truncate font-normal leading-relaxed">
                              {lead.message}
                            </p>
                          </td>

                          {/* Status Pill */}
                          <td className="py-3 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                              className={`text-xs font-semibold px-2.5 py-1 rounded-md border outline-none cursor-pointer ${lead.status === "New"
                                ? "bg-rose-50 text-rose-700 border-rose-300"
                                : lead.status === "In Progress"
                                  ? "bg-amber-50 text-amber-700 border-amber-300"
                                  : "bg-emerald-50 text-emerald-700 border-emerald-300"
                                }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>

                          {/* Date */}
                          <td className="py-3 px-4 whitespace-nowrap text-slate-400 text-xs font-medium">
                            {lead.createdAt}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end space-x-1.5">
                              <a
                                href={`mailto:${lead.email}?subject=Reply from Techshift Technology`}
                                className="p-1.5 text-emerald-700 hover:bg-emerald-100 bg-emerald-50 border border-emerald-200 rounded-lg transition-colors"
                                title="Reply by email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setSelectedLeadModal(lead)}
                                className="p-1.5 rounded-lg border transition-colors text-slate-600 hover:text-slate-900 bg-slate-100 border-slate-200 hover:bg-slate-200"
                                title="View Details"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteContact(lead)}
                                className="p-1.5 text-rose-700 hover:bg-rose-100 bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredContacts.length === 0 && (
                  <div className="p-8 text-center">
                    <Inbox className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-bold text-slate-900">No contact inquiries found</p>
                    <p className="text-xs text-slate-500 mt-0.5">Try another filter or submit a contact inquiry on the site.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT SERVICE                                */}
      {/* ======================================================== */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 md:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Website Development"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    placeholder="e.g. Next.js / AI"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                    placeholder="Development / Mobile"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Service Background Image
                </label>
                {serviceForm.bgImage ? (
                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-300 bg-slate-50">
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <img
                        src={serviceForm.bgImage}
                        alt="Service preview"
                        className="w-12 h-9 rounded object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">Background image attached</p>
                        <p className="text-[10px] text-emerald-600 font-medium">Ready</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md transition-colors shadow-2xs">
                        <Upload className="w-3 h-3" />
                        <span>Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileChange(e, (dataUrl) =>
                              setServiceForm({ ...serviceForm, bgImage: dataUrl })
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, bgImage: "" })}
                        className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border border-dashed border-slate-300 hover:border-red-500 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer bg-slate-50 hover:bg-red-50/15 transition-colors group">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Upload className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-700 leading-tight">
                          Click to upload background image
                        </p>
                        <p className="text-[10px] text-slate-400">PNG, JPG, WEBP (max 5MB)</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-red-600 bg-white border border-red-200 px-2.5 py-1 rounded-md shadow-2xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                      Browse
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageFileChange(e, (dataUrl) =>
                          setServiceForm({ ...serviceForm, bgImage: dataUrl })
                        )
                      }
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  placeholder="Describe this service offering..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Target Link
                </label>
                <input
                  type="text"
                  value={serviceForm.link}
                  onChange={(e) => setServiceForm({ ...serviceForm, link: e.target.value })}
                  placeholder="/contact or /portfolio"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
                >
                  {editingService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT REVIEW                                 */}
      {/* ======================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 md:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingReview ? "Edit Review" : "Add Client Review"}
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    placeholder="e.g. CEO at TechFlow"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={reviewForm.company}
                    onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                    placeholder="e.g. TechFlow Inc."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Rating (Stars)
                  </label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Client Avatar Photo
                </label>
                <div className="flex items-center justify-between p-2 rounded-lg border border-slate-300 bg-slate-50">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    {reviewForm.image ? (
                      <img
                        src={reviewForm.image}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">
                        {reviewForm.image ? "Avatar attached" : "No photo selected"}
                      </p>
                      <p className="text-[10px] text-slate-400">Square JPG or PNG, max 5MB</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md transition-colors shadow-2xs">
                      <Upload className="w-3 h-3" />
                      <span>{reviewForm.image ? "Change" : "Upload"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleImageFileChange(e, (dataUrl) =>
                            setReviewForm({ ...reviewForm, image: dataUrl })
                          )
                        }
                      />
                    </label>
                    {reviewForm.image && (
                      <button
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, image: "" })}
                        className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  required
                  rows={2}
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  placeholder="Client feedback and praise..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Publish Status
                </label>
                <select
                  value={reviewForm.status}
                  onChange={(e) => setReviewForm({ ...reviewForm, status: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                >
                  <option value="Published">Published (Visible on Home Marquee)</option>
                  <option value="Pending">Pending (Hidden)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
                >
                  {editingReview ? "Save Review" : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD / EDIT PORTFOLIO PROJECT                      */}
      {/* ======================================================== */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl w-full max-w-lg p-5 md:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingProject ? "Edit Showcase Project" : "Add Showcase Project"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. AI-Powered Healthcare Portal"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Category *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const next = !isNewCategoryInput;
                        setIsNewCategoryInput(next);
                        if (next) {
                          setProjectForm({ ...projectForm, category: "" });
                        } else {
                          setProjectForm({ ...projectForm, category: categories[0] || "" });
                        }
                      }}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline flex items-center gap-0.5"
                    >
                      {isNewCategoryInput ? "Choose Existing" : "+ New Category"}
                    </button>
                  </div>
                  {isNewCategoryInput ? (
                    <input
                      type="text"
                      required
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      placeholder="Type new category (e.g. AI / Fintech)..."
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                      autoFocus
                    />
                  ) : (
                    <select
                      value={projectForm.category}
                      onChange={(e) => {
                        if (e.target.value === "__create_new__") {
                          setIsNewCategoryInput(true);
                          setProjectForm({ ...projectForm, category: "" });
                        } else {
                          setProjectForm({ ...projectForm, category: e.target.value });
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="__create_new__" className="text-red-600 font-bold">
                        + Create New Category...
                      </option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Project Cover Image
                </label>
                {projectForm.image ? (
                  <div className="flex items-center justify-between p-2 rounded-lg border border-slate-300 bg-slate-50">
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <img
                        src={projectForm.image}
                        alt="Project preview"
                        className="w-12 h-9 rounded object-cover border border-slate-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">Cover image attached</p>
                        <p className="text-[10px] text-emerald-600 font-medium">Ready</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <label className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-md transition-colors shadow-2xs">
                        <Upload className="w-3 h-3" />
                        <span>Change</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageFileChange(e, (dataUrl) =>
                              setProjectForm({ ...projectForm, image: dataUrl })
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setProjectForm({ ...projectForm, image: "" })}
                        className="px-2 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border border-dashed border-slate-300 hover:border-red-500 rounded-lg px-3 py-2 flex items-center justify-between cursor-pointer bg-slate-50 hover:bg-red-50/15 transition-colors group">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Upload className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-slate-700 leading-tight">
                          Click to upload cover image
                        </p>
                        <p className="text-[10px] text-slate-400">PNG, JPG, WEBP (16:9 recommended)</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-red-600 bg-white border border-red-200 px-2.5 py-1 rounded-md shadow-2xs group-hover:bg-red-600 group-hover:text-white transition-colors">
                      Browse
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageFileChange(e, (dataUrl) =>
                          setProjectForm({ ...projectForm, image: dataUrl })
                        )
                      }
                    />
                  </label>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Tech Stack Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  placeholder="React, Next.js, Stripe, Tailwind CSS"
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Overview of the challenges solved and features shipped..."
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium outline-none focus:outline-none focus:ring-0 focus:border-red-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
                >
                  {editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* ======================================================== */}
      {/* DRAWER: VIEW CONTACT LEAD DETAILS (RIGHT-SIDE VIEW)      */}
      {/* ======================================================== */}
      {selectedLeadModal && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop overlay click area */}
          <div
            className="flex-1 cursor-pointer"
            onClick={() => setSelectedLeadModal(null)}
          />

          {/* Right Slide-over Panel */}
          <div className="bg-white border-l border-slate-200 w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 z-10">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {selectedLeadModal.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedLeadModal.name}</h3>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded font-semibold uppercase mt-0.5 ${selectedLeadModal.type === "contact"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-purple-50 text-purple-700 border border-purple-200"
                    }`}>
                    {selectedLeadModal.type === "contact" ? "Contact Page Inquiry" : "FAQ Page Inquiry"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-colors"
                title="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body (scrollable) */}
            <div className="p-5 space-y-4 flex-1 overflow-y-auto">
              {/* Contact Metadata Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div>
                  <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-0.5">Email Address</span>
                  <a
                    href={`mailto:${selectedLeadModal.email}`}
                    className="text-red-600 font-semibold hover:underline text-xs md:text-sm break-all"
                  >
                    {selectedLeadModal.email}
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2.5 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-0.5">Phone Number</span>
                    <span className="text-slate-800 font-medium text-xs md:text-sm">{selectedLeadModal.phone || "Not provided"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-0.5">Company</span>
                    <span className="text-slate-800 font-medium text-xs md:text-sm">{selectedLeadModal.company || "Not provided"}</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-slate-200">
                  <span className="text-slate-400 uppercase text-[10px] font-semibold block mb-0.5">Received Date</span>
                  <span className="text-slate-600 font-medium text-xs">{selectedLeadModal.createdAt}</span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Inquiry Message / Request
                </label>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                  {selectedLeadModal.message}
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Update Lead Status
                </label>
                <select
                  value={selectedLeadModal.status}
                  onChange={(e) => handleStatusChange(selectedLeadModal.id, e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-3 py-2 rounded-lg text-xs md:text-sm font-semibold outline-none focus:outline-none focus:ring-0 focus:border-red-500 transition-colors"
                >
                  <option value="New"> New (Unread)</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Footer with Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => handleDeleteContact(selectedLeadModal)}
                className="px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedLeadModal(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedLeadModal.email}?subject=Regarding your inquiry to Techshift Technology`}
                  className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all inline-flex items-center gap-1.5 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: DELETE CONFIRMATION MODAL                         */}
      {/* ======================================================== */}
      {deleteModal && deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-sm font-bold text-slate-900">
                  {deleteModal.title}
                </h3>
                {deleteModal.itemName && (
                  <p className="text-xs font-semibold text-rose-600 truncate mt-0.5">
                    {deleteModal.itemName}
                  </p>
                )}
                <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                  {deleteModal.message}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteModal.onConfirm}
                className="px-3.5 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg shadow-sm transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
