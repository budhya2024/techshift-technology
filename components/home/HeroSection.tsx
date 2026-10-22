"use client";

import React from "react";
import Link from "next/link";
import { FaReact, FaMeta, FaGoogle, FaNodeJs } from "react-icons/fa6";
import {
    SiNextdotjs,
    SiDotnet,
    SiFlutter,
    SiOpenai,
    SiAnthropic,
} from "react-icons/si";

export default function HeroSection() {
    return (
        <section className="relative w-full min-h-[90vh] lg:min-h-[92vh] flex items-center justify-center bg-black text-white overflow-hidden py-16 md:py-24">

            {/* Background Orbital Rings with Revolving Tech Badges */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none z-10 overflow-hidden">

                {/* Ring 1 - Inner Orbit spinning Clockwise (Next.js, React, Node.js, ChatGPT) */}
                <div
                    className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] lg:w-[620px] lg:h-[620px] rounded-full border-2 border-dashed border-red-500/40 absolute animate-spin pointer-events-none"
                    style={{ animationDuration: "35s" }}
                >
                    {/* Next.js Badge - Mounted 12 o'clock */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-red-500/20 flex items-center justify-center group hover:scale-110 hover:border-red-500 transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "35s" }}>
                                <SiNextdotjs className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-red-400 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* React Badge - Mounted 6 o'clock */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-cyan-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#61dafb] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "35s" }}>
                                <FaReact className="w-6 h-6 md:w-7 md:h-7 text-[#61dafb]" />
                            </div>
                        </div>
                    </div>

                    {/* Node.js Badge - Mounted 3 o'clock */}
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-green-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#5fa04e] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "35s" }}>
                                <FaNodeJs className="w-6 h-6 md:w-7 md:h-7 text-[#5fa04e]" />
                            </div>
                        </div>
                    </div>

                    {/* ChatGPT / OpenAI Badge - Mounted 9 o'clock */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-emerald-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#10a37f] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "35s" }}>
                                <SiOpenai className="w-6 h-6 md:w-7 md:h-7 text-[#10a37f]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ring 2 - Middle Orbit spinning Clockwise (Claude, Flutter, .NET) */}
                <div
                    className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] md:w-[740px] md:h-[740px] lg:w-[880px] lg:h-[880px] rounded-full border-2 border-dashed border-zinc-600/50 absolute animate-spin pointer-events-none"
                    style={{ animationDuration: "55s" }}
                >
                    {/* Claude / Anthropic Badge - Mounted Top Right (1:30 position) */}
                    <div className="absolute top-[14.6%] right-[14.6%] translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-amber-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#d97706] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "55s" }}>
                                <SiAnthropic className="w-6 h-6 md:w-7 md:h-7 text-[#d97706]" />
                            </div>
                        </div>
                    </div>

                    {/* .NET Badge - Mounted Top Left (10:30 position) */}
                    <div className="absolute top-[14.6%] left-[14.6%] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-purple-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#512bd4] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "55s" }}>
                                <SiDotnet className="w-6 h-6 md:w-7 md:h-7 text-[#512bd4]" />
                            </div>
                        </div>
                    </div>

                    {/* Flutter Badge - Mounted Bottom Right (4:30 position) */}
                    <div className="absolute bottom-[14.6%] right-[14.6%] translate-x-1/2 translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-sky-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#54c5f8] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "55s" }}>
                                <SiFlutter className="w-6 h-6 md:w-7 md:h-7 text-[#54c5f8]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ring 3 - Outer Orbit spinning Clockwise (Meta, Google) */}
                <div
                    className="w-[560px] h-[560px] sm:w-[780px] sm:h-[780px] md:w-[960px] md:h-[960px] lg:w-[1140px] lg:h-[1140px] rounded-full border-2 border-dashed border-zinc-700/40 absolute animate-spin pointer-events-none hidden sm:block"
                    style={{ animationDuration: "85s" }}
                >
                    {/* Meta Badge - Mounted 9 o'clock Outer */}
                    <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-blue-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#0064e0] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "85s" }}>
                                <FaMeta className="w-6 h-6 md:w-7 md:h-7 text-[#0064e0]" />
                            </div>
                        </div>
                    </div>

                    {/* Google Badge - Mounted 3 o'clock Outer */}
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-zinc-900/95 backdrop-blur-md border-2 border-zinc-700 shadow-2xl shadow-red-500/20 flex items-center justify-center group hover:scale-110 hover:border-[#ea4335] transition-all duration-300">
                            <div className="animate-spin-reverse" style={{ animationDuration: "85s" }}>
                                <FaGoogle className="w-6 h-6 md:w-7 md:h-7 text-[#ea4335]" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subtle Ambient Red Glow */}
                <div className="w-[550px] h-[550px] bg-red-600/10 rounded-full blur-3xl absolute pointer-events-none" />
            </div>

            {/* Central Hero Content */}
            <div className="container relative z-20 max-w-4xl mx-auto text-center px-4 ">

                <p className="text-sm bg-white/20  text-white border border-white/20 rounded-full px-5 py-2 w-fit mx-auto mb-5 font-semibold tracking-wider">Techshift Technology</p>

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
                    Create better, <br />
                    faster, and together
                </h1>

                {/* Description Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                    The modern software development & technology partner designed specifically for high-growth teams and enterprises. Streamline your digital products from concept to launch.
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center justify-center gap-3 sm:gap-5">
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-base tracking-wide transition-colors duration-300 text-center"
                    >
                        Get Started
                    </Link>

                    <Link
                        href="/work"
                        className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-base tracking-wide border border-zinc-800 transition-colors duration-300 text-center"
                    >
                        See Demo
                    </Link>
                </div>
            </div>

            {/* Float Animations CSS */}
            <style jsx global>{`
                @keyframes floatSlow {
                    0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
                    50% { transform: translateY(-10px) rotate(var(--tw-rotate, 0deg)); }
                }
                @keyframes floatDelayed {
                    0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); }
                    50% { transform: translateY(10px) rotate(var(--tw-rotate, 0deg)); }
                }
                .animate-float-slow {
                    animation: floatSlow 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: floatDelayed 7s ease-in-out 1s infinite;
                }
            `}</style>
        </section>
    );
}

