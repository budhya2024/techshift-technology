"use client";

import { useState, useEffect } from "react";
import { addContactLead } from "@/lib/contactStore";
import { getPublishedFaqs, fetchFaqs, Faq } from "@/lib/faqStore";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import CountryPhoneInput from "@/components/ui/CountryPhoneInput";

export default function FaqSection() {
    const [faqsList, setFaqsList] = useState<Faq[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        question: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFaqsList(getPublishedFaqs());
        fetchFaqs("Published").then((res) => {
            if (Array.isArray(res)) {
                setFaqsList(res.filter((f) => f.status === "Published"));
            }
        });

        const handleUpdate = () => {
            setFaqsList(getPublishedFaqs());
            fetchFaqs("Published").then((res) => {
                if (Array.isArray(res)) {
                    setFaqsList(res.filter((f) => f.status === "Published"));
                }
            });
        };

        window.addEventListener("faqs_updated", handleUpdate);
        return () => window.removeEventListener("faqs_updated", handleUpdate);
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addContactLead({
                type: "faq",
                name: formData.name || "Anonymous",
                email: formData.email,
                phone: formData.phone,
                message: formData.question,
            });
        } catch (err) {
            console.error("Error saving FAQ inquiry:", err);
        }
        await new Promise((r) => setTimeout(r, 1000));
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", question: "" });
    };

    return (
        <section id="faq" className="py-7 md:py-14 bg-background border-t border-border">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center sec-header">

                    <h2 className="sec-title">
                        Frequently Asked Questions
                    </h2>
                    <p className="sec-desc mx-auto">
                        Get clear answers to the most common questions about our software development and technology services.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">

                    {/* LEFT — FAQ Accordion */}
                    <div>
                        {faqsList.length > 0 ? (
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqsList.map((faq, index) => (
                                    <AccordionItem
                                        key={faq.id || index}
                                        value={`item-${faq.id || index}`}
                                        className="bg-card border border-border/80 hover:border-red-500/50 rounded-sm px-6 py-1 transition-colors duration-300"
                                    >
                                        <AccordionTrigger className="text-left text-base sm:text-lg font-bold text-foreground hover:text-red-500 transition-colors duration-300 hover:no-underline py-5">
                                            {faq.question}
                                        </AccordionTrigger>

                                        <AccordionContent className="text-muted-foreground text-sm sm:text-base pb-5 leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <div className="bg-card border border-border/80 rounded-sm p-8 text-center text-muted-foreground">
                                <p className="text-base font-medium">Have questions? Submit your inquiry using the form, and our engineering team will assist you.</p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT — Question Form */}
                    <div className="bg-card border border-border/80 rounded-sm p-6 sm:p-8 lg:p-10 h-fit">
                        {/* Form header */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-foreground text-center">
                                Still Have A Question?
                            </h3>
                            <p className="text-muted-foreground text-sm md:text-base text-center mt-1">
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
                                <h4 className="text-xl font-bold text-foreground">Question Submitted!</h4>
                                <p className="text-muted-foreground text-sm max-w-xs">
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
                                        className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
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
                                        className="w-full bg-background border border-border/80 text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
                                    />
                                </div>

                                {/* Email + Phone row */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="faq-email"
                                            className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
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
                                            className="w-full bg-background border border-border/80 text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="faq-phone"
                                            className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
                                        >
                                            Phone
                                        </label>
                                        <CountryPhoneInput
                                            id="faq-phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Question */}
                                <div>
                                    <label
                                        htmlFor="faq-question"
                                        className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5"
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
                                        className="w-full bg-background border border-border/80 text-foreground placeholder:text-muted-foreground px-4 py-3 rounded-xl text-sm outline-none focus:border-red-500 transition-colors resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <button
                                        id="faq-submit"
                                        type="submit"
                                        disabled={loading}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm tracking-wider px-4  sm:px-8 py-3.5 rounded-lg sm:rounded-xl transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
