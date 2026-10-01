"use client";

import { useState } from "react";
import { FiPhone, FiMail, FiClock, FiMessageCircle, FiSend, FiUser, FiBriefcase } from "react-icons/fi";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

const contactInfo = [
    {
        icon: FiPhone,
        label: "PHONE",
        value: "+91 7797538010",
        href: "tel:+917797538010",
    },
    {
        icon: FiMail,
        label: "EMAIL",
        value: "techshifttechnology@gmail.com",
        href: "mailto:techshifttechnology@gmail.com",
    },
    {
        icon: FiClock,
        label: "BUSINESS HOURS",
        value: "Mon-Fri 9AM-6PM EST",
        href: null,
    },
    {
        icon: FiMessageCircle,
        label: "LIVE CHAT",
        value: "Available 24/7",
        href: null,
    },
];

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <section className="py-16 bg-background min-h-screen">
            <div className="container">
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* ── Left: Contact Info ── */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-foreground mb-1">
                                Contact Information
                            </h2>
                        </div>

                        {contactInfo.map((item, i) => {
                            const Icon = item.icon;
                            const content = (
                                <div
                                    className="flex items-center space-x-4 bg-card border border-border rounded px-6 py-5 transition-all duration-300 hover:border-red-500/40 hover:bg-secondary/60 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary group-hover:bg-red-500/10 transition-colors duration-300 flex-shrink-0">
                                        <Icon className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                            {item.label}
                                        </p>
                                        <p className="text-foreground font-medium text-sm group-hover:text-red-400 transition-colors duration-300">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            );

                            return item.href ? (
                                <a key={i} href={item.href} className="block">
                                    {content}
                                </a>
                            ) : (
                                <div key={i} className="block">{content}</div>
                            );
                        })}

                        {/* Quick Response Guarantee card */}
                        <div className="bg-card border border-red-500/30 rounded px-5 py-5 mt-2">
                            <h4 className="text-red-500 font-bold mb-2 text-sm">
                                Quick Response Guarantee
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                We respond to all inquiries within 2 hours during business
                                hours and within 24 hours on weekends.
                            </p>
                        </div>


                    </div>

                    {/* ── Right: Contact Form ── */}
                    <div className="lg:col-span-2">
                        <div className="bg-card/60 border border-border rounded p-8 md:p-10">
                            {submitted ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <FiSend className="w-10 h-10 text-red-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-1">
                                        Message Sent!
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        Thank you for reaching out. We'll get back to you within 2
                                        hours during business hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormData({
                                                firstName: "",
                                                lastName: "",
                                                email: "",
                                                phone: "",
                                                company: "",
                                                message: "",
                                            });
                                        }}
                                        className="text-red-500 hover:text-red-400 font-semibold transition-colors"
                                    >
                                        Send another message →
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <h3 className="text-3xl font-bold text-foreground mb-1">
                                            Send us a Message
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            Fill out the form below and we'll get back to you as soon
                                            as possible.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* First / Last Name */}
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="relative">
                                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    type="text"
                                                    required
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    className="w-full bg-secondary/80 border border-border rounded pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-500 focus:bg-secondary transition-all duration-200"
                                                />
                                            </div>
                                            <div className="relative">
                                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                                                <input
                                                    id="lastName"
                                                    name="lastName"
                                                    type="text"
                                                    required
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    className="w-full bg-secondary/80 border border-border rounded pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-500 focus:bg-secondary transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {/* Email */}
                                            <div className="relative">
                                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="Email Address"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-secondary/80 border border-border rounded pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-500 focus:bg-secondary transition-all duration-200"
                                                />
                                            </div>

                                            {/* Phone */}
                                            <div className="relative">
                                                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="Phone Number"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full bg-secondary/80 border border-border rounded pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-500 focus:bg-secondary transition-all duration-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Company */}
                                        <div className="relative">
                                            <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                                            <input
                                                id="company"
                                                name="company"
                                                type="text"
                                                placeholder="Company Name (Optional)"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full bg-secondary/80 border border-border rounded pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-500 focus:bg-secondary transition-all duration-200"
                                            />
                                        </div>

                                        {/* Message */}
                                        <div>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder="Tell us about your project, goals, and how we can help you..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full bg-secondary/80 border border-border rounded px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-red-500 focus:bg-secondary transition-all duration-200 resize-none"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <button
                                            id="submit-contact"
                                            type="submit"
                                            disabled={loading}
                                            className="relative w-full inline-flex items-center justify-center gap-2 bg-red-500 text-white font-bold text-base px-8 py-4 rounded-2xl overflow-hidden group shadow-xl shadow-red-500/25 transition-all duration-700 ease-out disabled:opacity-60 cursor-pointer"
                                        >
                                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <>
                                                        <svg
                                                            className="animate-spin w-5 h-5 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8v8z"
                                                            />
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        Send Message
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
