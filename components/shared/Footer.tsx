"use client";

import Link from "next/link";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiHeadphones,
  FiMessageCircle,
  FiClock,
} from "react-icons/fi";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-900 text-white">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="text-3xl font-bold text-red-500 mb-4 relative overflow-hidden group cursor-pointer">
              Techshift Technology
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 "></span>
            </div>

            <p className="text-white/70 mb-6 max-w-md leading-relaxed text-sm">
              Empowering brands with bold digital brilliance. We create
              cutting-edge digital experiences that drive results and transform
              businesses.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <FiMapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>We serve clients remotely</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <FiPhone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>+91 7797538010</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80 text-sm">
                <FiMail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>techshifttechnology@gmail.com</span>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61557874367373" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#1877F2] rounded-full text-white hover:opacity-90 transition">
                <FaFacebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/techshifttechnology" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 rounded-full text-white hover:opacity-90 transition">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/917797538010" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center bg-[#25D366] rounded-full text-white hover:opacity-90 transition">
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact" },
                { href: "/privacy-policy", label: "Privacy Policy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}
                    className="text-sm text-white/70 hover:text-red-500 transition-colors duration-200 relative group inline-block">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/#services", label: "Web Development" },
                { href: "/#services", label: "Mobile Apps" },
                { href: "/#services", label: "Digital Marketing" },
                { href: "/#services", label: "E-commerce" },
                { href: "/#services", label: "UI/UX Design" },
                { href: "/portfolio", label: "Portfolio" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href}
                    className="text-sm text-white/70 hover:text-red-500 transition-colors duration-200 relative group inline-block">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-white/70 text-sm">
                <FiHeadphones className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>24/7 Support</span>
              </li>
              <li className="flex items-center space-x-2 text-white/70 text-sm">
                <FiMessageCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Live Chat</span>
              </li>
              <li className="flex items-center space-x-2 text-white/70 text-sm">
                <FiClock className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Response within 2 hours</span>
              </li>
              {[
                { href: "/contact", label: "Help Center" },
                { href: "/contact", label: "Contact Support" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href}
                    className="text-sm text-white/70 hover:text-red-500 transition-colors duration-200 relative group inline-block">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-900 pt-8 text-center">
          <p className="text-white/90 text-sm">
            © {currentYear} Techshift Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
