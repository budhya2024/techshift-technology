"use client";

import React from "react";
import Link from "next/link";
import {
    Laptop,
    Sparkles,
    ShoppingBag,
    Store,
    TrendingUp,
    Coins,
    Building2,
    Compass,
    ArrowRight
} from "lucide-react";

/* ─────────────────────────── Data ─────────────────────────── */

const stats = [
    { label: "Products Shipped", value: "200+" },
    { label: "Client Retention Rate", value: "93%" },
    { label: "Client Revenue Generated", value: "$200M+" },
    { label: "Customer Satisfaction Score", value: "95%" },
];

const industries = [
    {
        title: "SaaS & Software Products",
        icon: Laptop,
    },
    {
        title: "AI & Data-Driven Products",
        icon: Sparkles,
    },
    {
        title: "E-Commerce & Digital Commerce",
        icon: ShoppingBag,
    },
    {
        title: "Small & Medium Enterprises (SMEs)",
        icon: Store,
    },
    {
        title: "Financial & Fintech Solutions",
        icon: TrendingUp,
    },
    {
        title: "Crypto & Web3",
        icon: Coins,
    },
    {
        title: "Real Estate & Property Tech",
        icon: Building2,
    },
    {
        title: "Travel & Hospitality",
        icon: Compass,
    },
];

/* ─────────────────────────── Main Component ─────────────────────────── */

export default function AboutContent() {
    return (
        <div className="bg-[#070b10] text-white">

            {/* ── 1. Founding Story & Metrics Section ── */}
            <section className="py-7 md:py-14 border-b border-gray-800/60">
                <div className="container">


                    <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">

                        {/* Left Content Column */}
                        <div className="lg:col-span-2 space-y-5 text-gray-300 text-sm md:text-base leading-relaxed">

                            <h2 className="text-xl md:text-2xl  font-mdeium text-white max-w-4xl mb-10 leading-tight tracking-tight">
                                TechShift Was Founded With A Simple Belief: <br className="hidden md:inline" />
                                <span className="text-white">
                                    Great Businesses Are Built When Strategy, Design, Technology, And Operations Work Together.
                                </span>
                            </h2>
                            <p className="tracking-wide leading-relaxed md:leading-loose">
                                TechShift was founded with a simple belief: great businesses are built when strategy, design, technology, and operations work together - not in silos. Over the years, we&apos;ve partnered with startups, growing companies, and established enterprises to turn ambitious ideas into scalable digital products that generate real revenue.
                            </p>

                            <p className="tracking-wide leading-relaxed md:leading-loose">
                                Our work spans product design, software engineering, AI-driven solutions, digital marketing, and accounting support - all aligned toward helping businesses grow sustainably, operate efficiently, and compete at the highest level.
                            </p>

                            <p className="tracking-wide leading-relaxed md:leading-loose">
                                We don&apos;t chase trends or build for vanity. Every decision is rooted in long-term value, technical soundness, and real-world business impact. When you partner with TechShift, you get a team that thinks in systems - not silos.
                            </p>

                            <div className="border-l-2 border-red-500 pl-5 py-3.5 my-6 text-gray-200 text-sm md:text-base italic bg-[#0c1118]/80 rounded-r">
                                &ldquo;At TechShift, we think in systems, not silos. We collaborate in-sync, challenge assumptions, and spitball concepts in real time - because the best solutions emerge when disciplines collide.&rdquo;
                            </div>
                        </div>

                        {/* Right Metrics Column */}
                        <div className="space-y-6 bg-[#090d14]  text-right">
                            {stats.map((stat, i) => (
                                <div key={i} className=" pb-5 md:pb-10  last:pb-0 ">
                                    <div className="text-xs md:text-base font-medium text-gray-400 mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                                        {stat.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2. Industries We Serve Section ── */}
            <section className="py-7 md:py-14 bg-[#0a0f16]">
                <div className="container">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="sec-title text-white mb-2">
                                Industries We Serve
                            </h2>
                        </div>
                        <div className="max-w-md md:text-right">
                            <p className="sec-desc text-white">
                                We focus on industries where design, technology, and business strategy unite to drive measurable impact:
                            </p>
                        </div>
                    </div>

                    {/* 8 Grid Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industries.map((ind, index) => {
                            const Icon = ind.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative rounded-lg bg-[#0d131c] border border-gray-800/80 p-8 h-48 flex flex-col justify-between overflow-hidden hover:border-red-500/50 transition-all duration-300 shadow-lg cursor-pointer"
                                >



                                    <div className="relative z-10">
                                        <div className="w-10 h-10 rounded bg-[#070b10] border border-gray-800 flex items-center justify-center text-red-500 group-hover:border-red-500/40 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Card Title */}
                                    <h3 className="text-lg font-bold text-white relative z-10 group-hover:text-red-400 transition-colors duration-300 max-w-[85%]">
                                        {ind.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── 3. Call to Action Banner ── */}
            <section className="py-7 md:py-14 bg-[#070b10]">
                <div className="container">
                    <div className="bg-gradient-to-r from-black via-[#0d131c] to-black border border-gray-800 rounded-lg p-8 md:p-14 text-center">
                        <h2 className="sec-title text-white mb-4">
                            Ready to Transform Your Business?
                        </h2>
                        <p className="sec-desc text-gray-300 mx-auto mb-8">
                            Partner with TechShift Technology and build scalable digital products that drive real revenue.
                        </p>
                        <div className="flex justify-center">
                            <Link
                                href="/contact"
                                className="relative inline-flex items-center justify-center gap-2 bg-red-500 text-white font-bold text-base px-8 py-4 rounded-2xl overflow-hidden group transition-all duration-700 ease-out"
                            >
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover:w-[380%] group-hover:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>Get In Touch</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
