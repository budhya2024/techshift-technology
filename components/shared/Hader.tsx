"use client";

import { useState } from "react";
import { ArrowLeftCircle, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



interface NavigationProps {
    currentPage?: string;
}

export const Header = ({ currentPage }: NavigationProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "HOME" },
        { href: "/services", label: "SERVICES" },
        { href: "/portfolio", label: "PORTFOLIO" },
        { href: "/about", label: "ABOUT" },
        { href: "/careers", label: "CAREERS" },
        { href: "/contact", label: "CONTACT US" },
    ];

    const isCurrentPage = (href: string) => {
        return currentPage === href || pathname === href;
    };

    return (
        <>
            <nav className="sticky  top-0 w-full z-50 bg-background  border-b border-border/50">
                <div className="container py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="w-40 h-auto">
                        <img
                            src="/images/techshift_logo.png"
                            alt="Techshift Technology Logo"
                            className="h-auto w-full object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) =>
                            link.label === "CONTACT US" ? (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative inline-flex items-center justify-center bg-red-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl overflow-hidden group shadow-lg shadow-red-500/20 transition-all duration-700 ease-out"
                                >
                                    {/* Slow & Smooth Center Circular Expanding Fill */}
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                                    <span className="relative z-10">{link.label}</span>
                                </Link>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative overflow-hidden transition-all duration-300 text-sm font-semibold px-3 py-2 group ${isCurrentPage(link.href)
                                        ? "text-red-500"
                                        : "text-foreground hover:text-red-500"
                                        }`}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center space-x-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                            className="relative z-50 p-2 text-foreground hover:text-red-500 transition-colors duration-300 rounded hover:bg-card flex items-center justify-center"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu — single column */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="absolute inset-0 bg-background" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
                    {navLinks.map((link, index) =>
                        link.label === "CONTACT US" ? (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`relative inline-flex items-center justify-center mt-4 bg-red-500 text-white font-bold text-base px-10 py-3.5 rounded-xl uppercase tracking-wider overflow-hidden group shadow-xl shadow-red-500/20 transition-all duration-700 ease-out ${
                                    mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                }`}
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                                <span className="relative z-10">{link.label}</span>
                            </Link>
                        ) : (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`relative text-2xl font-semibold px-6 py-2 group transition-all duration-300 ${
                                    isCurrentPage(link.href) ? "text-red-500" : "text-foreground hover:text-red-500"
                                } ${mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                                style={{ transitionDelay: `${index * 80}ms` }}
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </Link>
                        )
                    )}
                </div>
            </div>

            {/* Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 md:hidden bg-background/20"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Header;
