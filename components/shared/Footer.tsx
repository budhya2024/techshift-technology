"use client";

import { ChevronRight } from "lucide-react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiChevronRight,

} from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className=" bg-black  text-zinc-300 relative overflow-hidden">

      <div className="container py-12 md:py-16 relative z-10">



        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Column 1: Brand Info & Socials (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block">
              <img
                src="/assets/images/brand-white.png"
                alt="Techshift Technology"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Empowering global brands with bold digital brilliance. We craft cutting-edge web, mobile, and custom tech solutions engineered for growth and results.
            </p>

            <div className="pt-2">

              <div className="flex items-center space-x-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61557874367373"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center transition-all duration-300"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/techshifttechnology"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center transition-all duration-300"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/917797538010"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-red-600 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 flex items-center justify-center transition-all duration-300"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm md:text-base font-bold uppercase tracking-wide text-white mb-5 pb-2  inline-block">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact Us" },
                { href: "/privacy-policy", label: "Privacy Policy" },
                { href: "/terms-and-conditions", label: "Terms & Conditions" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200 inline-flex items-center gap-1.5 group text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-500 transition-colors shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm md:text-base font-bold uppercase tracking-wide text-white mb-5 pb-2  inline-block">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                "Web Application Development",
                "Mobile App Development",
                "UI/UX Experience Design",
                "E-Commerce Solutions",
                "Digital Marketing Strategy",
                "Custom Enterprise Software",
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    href="/portfolio"
                    className="text-zinc-400 hover:text-red-500 transition-colors duration-200 inline-flex items-center gap-1.5 group text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-500 transition-colors shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (3 Cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm md:text-base font-bold uppercase tracking-wide text-white mb-5 pb-2  inline-block">
              Get In Touch
            </h4>
            <div className="space-y-4 text-sm">
              <a
                href="tel:+917797538010"
                className="flex items-center gap-3 text-zinc-400 hover:text-red-500 transition-colors group"
              >
                <FiPhone className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-zinc-300 group-hover:text-red-500 font-medium">+91 7797538010</span>
              </a>

              <a
                href="mailto:techshifttechnology@gmail.com"
                className="flex items-center gap-3 text-zinc-400 hover:text-red-500 transition-colors group"
              >
                <FiMail className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-zinc-300 group-hover:text-red-500 font-medium break-all">techshifttechnology@gmail.com</span>
              </a>

              <div className="flex items-center gap-3 text-zinc-400">
                <FiMapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span className="text-zinc-300 font-medium">We serve clients remotely</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <p>© {currentYear} Techshift Technology. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-zinc-300 transition-colors">
              Terms & Conditions
            </Link>


          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
