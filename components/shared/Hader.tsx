"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
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
        { href: "/portfolio", label: "PORTFOLIO" },
        { href: "/about", label: "ABOUT" },
        { href: "/contact", label: "CONTACT US" },
    ];

    const isCurrentPage = (href: string) => {
        return currentPage === href || pathname === href;
    };

    return (
        <>
            <nav className="sticky top-0 w-full z-50 bg-background border-b border-border/50">
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
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative overflow-hidden transition-all duration-300 text-sm font-semibold px-3 py-2 group ${
                                    isCurrentPage(link.href)
                                        ? "text-red-500"
                                        : "text-foreground hover:text-red-500"
                                }`}
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
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
                    {navLinks.map((link, index) => (
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
                    ))}
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
