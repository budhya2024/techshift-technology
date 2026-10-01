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
        <section id="faq" className="">
            <div className="container">
                {/* Heading */}
                <div className="text-center sec-header">
                    <h2 className="sec-title text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="sec-desc mx-auto">
                        Get answers to the most common questions about our services
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">

                    {/* LEFT — FAQ Accordion */}
                    <div>
                        <Accordion type="single" collapsible className="space-y-4">
                            {faqs.map((faq, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="bg-card px-6 border border-border/50 hover:border-red-500/20 transition-colors duration-300"
                                >
                                    <AccordionTrigger className="text-left text-base sm:text-lg font-semibold hover:text-red-500 transition-colors duration-300 hover:no-underline py-5">
                                        {faq.question}
                                    </AccordionTrigger>

                                    <AccordionContent className="text-muted-foreground text-base pb-5 leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    {/* RIGHT — Question Form */}
                    <div className="bg-card border border-border/50 p-4 sm:p-8 lg:p-10 h-fit">
                        {/* Form header */}
                        <div className="mb-8">

                            <h3 className="text-2xl font-bold text-foreground text-center">
                                Still have a question?
                            </h3>

                        </div>

                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-14 text-center gap-4">
                                <div className="w-14 h-14 bg-red-500 flex items-center justify-center">
                                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-foreground">Question Submitted!</h4>
                                <p className="text-muted-foreground text-sm max-w-xs">
                                    Thank you! We&apos;ll review your question and respond within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-2 text-red-500 text-sm font-semibold hover:underline"
                                >
                                    Ask another question →
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="faq-name"
                                        className="block text-sm font-semibold text-foreground mb-1.5"
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
                                        className="w-full bg-background border border-border/60 text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors duration-200"
                                    />
                                </div>

                                {/* Email + Phone row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="faq-email"
                                            className="block text-sm font-semibold text-foreground mb-1.5"
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
                                            className="w-full bg-background border border-border/60 text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="faq-phone"
                                            className="block text-sm font-semibold text-foreground mb-1.5"
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
                                            className="w-full bg-background border border-border/60 text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <div>
                                    <label
                                        htmlFor="faq-question"
                                        className="block text-sm font-semibold text-foreground mb-1.5"
                                    >
                                        Your Question <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="faq-question"
                                        name="question"
                                        required
                                        rows={5}
                                        value={formData.question}
                                        onChange={handleChange}
                                        placeholder="Type your question here..."
                                        className="w-full bg-background border border-border/60 text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm outline-none focus:border-red-500 transition-colors duration-200 resize-none"
                                    />
                                </div>

                                {/* Submit */}
                                <button
                                    id="faq-submit"
                                    type="submit"
                                    disabled={loading}
                                    className="relative w-full sm:w-auto inline-flex items-center justify-center bg-red-500 text-white font-bold text-base tracking-wider uppercase px-8 py-4 rounded-2xl overflow-hidden group shadow-xl shadow-red-500/25 transition-all duration-700 ease-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {loading ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Question
                                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
