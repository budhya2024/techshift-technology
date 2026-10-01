"use client";

import React, { useState, useEffect } from "react";
import {
    FiSend,
    FiUser,
    FiMail,
    FiPhone,
    FiBriefcase,
    FiUpload,
    FiCheckCircle,
    FiGlobe,
    FiFileText,
    FiX,
} from "react-icons/fi";

const positions = [
    "Senior Frontend Developer",
    "Full Stack Engineer",
    "UI/UX Designer",
    "Digital Marketing Specialist",
    "General / Spontaneous Application",
];

interface CareerFormSectionProps {
    selectedJobTitle?: string;
    isModal?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
}

export default function CareerFormSection({
    selectedJobTitle,
    isModal = false,
    isOpen = true,
    onClose,
}: CareerFormSectionProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        position: selectedJobTitle || positions[0],
        experience: "2-5 Years",
        portfolio: "",
        message: "",
        resumeName: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (selectedJobTitle) {
            setFormData((prev) => ({ ...prev, position: selectedJobTitle }));
        }
    }, [selectedJobTitle]);

    if (isModal && !isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, resumeName: e.target.files[0].name });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    };

    const formContent = (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden max-w-3xl w-full mx-auto">
            {isModal && onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-muted-foreground hover:text-white hover:border-red-500 transition-colors z-20 cursor-pointer"
                    aria-label="Close Modal"
                >
                    <FiX className="w-5 h-5" />
                </button>
            )}

            {/* Header inside form */}
            <div className="text-center mb-8 pr-6 pl-6">
                <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 inline-block">
                    JOIN TECHSHIFT
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tight mb-2">
                    {selectedJobTitle ? `Apply for ${selectedJobTitle}` : "Apply For A Position"}
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm max-w-xl mx-auto">
                    Fill out the form below to submit your application. Our recruitment team will review your profile and get back to you shortly.
                </p>
            </div>

            {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500 flex items-center justify-center mb-6">
                        <FiCheckCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-foreground mb-3">
                        Application Submitted!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8 leading-relaxed">
                        Thank you for your interest in joining Techshift Technology. Our HR team has received your details and will contact you via email soon.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({
                                    fullName: "",
                                    email: "",
                                    phone: "",
                                    position: selectedJobTitle || positions[0],
                                    experience: "2-5 Years",
                                    portfolio: "",
                                    message: "",
                                    resumeName: "",
                                });
                            }}
                            className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-2xl bg-zinc-900 text-white text-sm font-bold border border-zinc-800 overflow-hidden group transition-all duration-700 ease-out cursor-pointer"
                        >
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-500 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                            <span className="relative z-10">Submit Another Application</span>
                        </button>

                        {isModal && onClose && (
                            <button
                                onClick={onClose}
                                className="px-6 py-3.5 rounded-2xl bg-red-500 text-white text-sm font-bold shadow-lg shadow-red-500/25 hover:bg-red-600 transition-colors cursor-pointer"
                            >
                                Done & Close
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                <FiUser className="text-red-500" /> Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Email Address */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                <FiMail className="text-red-500" /> Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                <FiPhone className="text-red-500" /> Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                required
                                placeholder="+1 (555) 000-0000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Position Applied For */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                <FiBriefcase className="text-red-500" /> Position <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none transition-colors cursor-pointer"
                            >
                                {positions.map((pos) => (
                                    <option key={pos} value={pos} className="bg-background text-foreground">
                                        {pos}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Experience Level */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                <FiFileText className="text-red-500" /> Experience Level <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground focus:outline-none transition-colors cursor-pointer"
                            >
                                <option value="0-2 Years" className="bg-background text-foreground">Entry Level (0-2 Years)</option>
                                <option value="2-5 Years" className="bg-background text-foreground">Mid Level (2-5 Years)</option>
                                <option value="5+ Years" className="bg-background text-foreground">Senior Level (5+ Years)</option>
                                <option value="Lead / Management" className="bg-background text-foreground">Lead / Executive</option>
                            </select>
                        </div>

                        {/* Portfolio / LinkedIn URL */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                                <FiGlobe className="text-red-500" /> Portfolio / LinkedIn URL
                            </label>
                            <input
                                type="url"
                                placeholder="https://linkedin.com/in/johndoe"
                                value={formData.portfolio}
                                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    {/* Resume Upload File Box */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2 flex items-center gap-2">
                            <FiUpload className="text-red-500" /> Attach Resume (PDF/DOCX) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative border-2 border-dashed border-border/80 hover:border-red-500/60 rounded-2xl p-6 text-center bg-background/50 cursor-pointer transition-colors group">
                            <input
                                type="file"
                                required
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2 group-hover:scale-110 transition-transform">
                                    <FiUpload className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-semibold text-foreground mb-1">
                                    {formData.resumeName ? (
                                        <span className="text-red-500 font-bold">{formData.resumeName}</span>
                                    ) : (
                                        "Click to upload or drag & drop your resume"
                                    )}
                                </p>
                                <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Cover Letter / Message */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                            Cover Letter / Brief Introduction
                        </label>
                        <textarea
                            rows={4}
                            placeholder="Tell us about yourself, your accomplishments, and why you'd be a great fit for Techshift Technology..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-background border border-border/80 focus:border-red-500 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    {/* Submit Button featuring Center Circular Color Fill Animation */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-full inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-red-500 text-white font-bold text-base shadow-xl shadow-red-500/30 overflow-hidden group transition-all duration-700 ease-out disabled:opacity-50 cursor-pointer"
                        >
                            {/* Center Circular Expanding Fill Animation */}
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                            
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    "Submitting Application..."
                                ) : (
                                    <>
                                        Submit Application <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </span>
                        </button>
                    </div>
                </form>
            )}
        </div>
    );

    if (isModal) {
        return (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
                onClick={(e) => {
                    if (e.target === e.currentTarget && onClose) onClose();
                }}
            >
                <div className="w-full max-w-3xl my-auto max-h-[90vh] overflow-y-auto rounded-3xl">
                    {formContent}
                </div>
            </div>
        );
    }

    return (
        <section id="apply-form" className="py-20 bg-background border-t border-border">
            <div className="container max-w-4xl mx-auto px-4">
                {formContent}
            </div>
        </section>
    );
}
