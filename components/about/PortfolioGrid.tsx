"use client";

import { FiArrowRight, FiExternalLink } from "react-icons/fi";

/* ─────────────────────────── Portfolio Data ─────────────────────────── */

const projects = [
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

/* ─────────────────────────── Component ─────────────────────────── */

export default function PortfolioGrid() {
    return (
        <section className="py-16 bg-background">
            <div className="container">

                {/* Section Header */}
                <div className="text-center mb-12">

                    <h2 className="sec-title">
                        Projects We Are{" "}
                        Proud Of
                    </h2>
                    <p className="sec-desc">
                        A showcase of our best work across web development, mobile apps,
                        design, and digital marketing.
                    </p>
                </div>



                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-card border border-border hover:border-red-500/40 transition-all duration-300 group flex flex-col"
                        >
                            {/* Image */}
                            <div className="overflow-hidden aspect-[4/3] relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                {/* Category badge */}
                                <span className="inline-block bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mb-3 w-fit">
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-base font-bold text-foreground mb-2">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1">
                                    {project.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-border text-muted-foreground text-[10px] px-2 py-0.5"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Live Demo Button */}
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-red-700 hover:bg-red-800 text-white text-xs font-bold py-3.5 rounded-xl transition-colors duration-300"
                                >
                                    <FiExternalLink className="w-3.5 h-3.5" />
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-14 pt-10 border-t border-zinc-900">
                    <p className="text-muted-foreground text-sm mb-5">
                        Have a project in mind? Let's build something amazing together.
                    </p>
                    <a href="/contact">
                        <button className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold text-base px-8 py-4 rounded-2xl transition-colors duration-300 group">
                            Start Your Project <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </a>
                </div>
            </div>
        </section>
    );
}
