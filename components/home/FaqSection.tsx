"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What services does Techshift Technology offer?",
        answer:
            "We offer a comprehensive range of digital services including mobile app development, web development, digital marketing, e-commerce solutions, UI/UX design, and performance optimization.",
    },
    {
        question: "How long does it take to complete a project?",
        answer:
            "Project timelines vary depending on complexity and scope. Typically, web development projects take 2-6 weeks, mobile apps take 4-12 weeks, and digital marketing campaigns can be launched within 1-2 weeks.",
    },
    {
        question: "Do you provide ongoing support after project completion?",
        answer:
            "Yes, we provide comprehensive post-launch support including maintenance, updates, hosting support, and technical assistance to ensure your digital solution continues to perform optimally.",
    },
    {
        question: "What is your pricing structure?",
        answer:
            "Our pricing varies based on project requirements. We offer competitive rates starting from $1,500 for digital marketing, $3,000 for branding, $5,000 for web development, and $8,000 for e-commerce solutions.",
    },
    {
        question: "Can you help with SEO and digital marketing?",
        answer:
            "Absolutely! We specialize in SEO optimization, Google Ads management, social media marketing, and comprehensive digital marketing strategies to help increase your online visibility and drive conversions.",
    },
    {
        question: "Do you work with businesses of all sizes?",
        answer:
            "Yes, we work with businesses of all sizes — from startups and small businesses to large enterprises. We tailor our solutions to meet the specific needs and budget of each client.",
    },
];

export default function FaqSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        question: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", question: "" });
    };

    return (
        <section id="faq" className="py-7 md:py-14 bg-black text-white border-t border-zinc-900">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-14">
                    <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 inline-block">
                        NEED HELP?
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto">
                        Get clear answers to the most common questions about our software development and technology services.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

                    {/* LEFT — FAQ Accordion */}
                    <div>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-black border border-zinc-800 hover:border-red-500/50 rounded-2xl px-6 py-1 transition-colors duration-300"
                                >
                                    <AccordionTrigger className="text-left text-base sm:text-lg font-bold text-white hover:text-red-500 transition-colors duration-300 hover:no-underline py-5">
                                        {faq.question}
                                    </AccordionTrigger>

                                    <AccordionContent className="text-zinc-400 text-sm sm:text-base pb-5 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* RIGHT — Question Form */}
                    <div className="bg-black border border-zinc-800 rounded-2xl p-6 sm:p-8 lg:p-10 h-fit">
                        {/* Form header */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white text-center">
                                Still Have A Question?
                            </h3>
                            <p className="text-zinc-400 text-xs text-center mt-1">
                                Send us a message and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                                <div className="w-14 h-14 bg-red-700 rounded-full flex items-center justify-center">
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-white">Question Submitted!</h4>
                                <p className="text-zinc-400 text-sm max-w-xs">
                                    Thank you! We&apos;ll review your question and respond shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-2 text-red-500 text-sm font-semibold hover:underline cursor-pointer"
                                >
                                    Ask another question →
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="faq-name"
                                        className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                                    >
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="faq-name"
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>

                                {/* Email + Phone row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="faq-email"
                                            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                                        >
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="faq-email"
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@email.com"
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="faq-phone"
                                            className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                                        >
                                            Phone
                                        </label>
                                        <input
                                            id="faq-phone"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (000) 000-0000"
                                            className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <div>
                                    <label
                                        htmlFor="faq-question"
                                        className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                                    >
                                        Your Question <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="faq-question"
                                        name="question"
                                        required
                                        rows={4}
                                        value={formData.question}
                                        onChange={handleChange}
                                        placeholder="Type your question here..."
                                        className="w-full bg-zinc-950 border border-zinc-800 text-white placeholder:text-zinc-600 px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        id="faq-submit"
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800 text-white font-bold text-sm tracking-wider uppercase px-8 py-3.5 rounded-xl transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Question
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
