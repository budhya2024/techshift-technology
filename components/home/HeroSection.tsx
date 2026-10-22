"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
} from "framer-motion";

interface WordProps {
    children: React.ReactNode;
    range: [number, number];
    progress: MotionValue<number>;
    dimColor?: string;
    activeColor?: string;
}

function AnimatedWord({
    children,
    range,
    progress,
    dimColor = "rgba(255, 255, 255, 0.22)",
    activeColor = "#ffffff",
}: WordProps) {
    const color = useTransform(progress, range, [dimColor, activeColor]);
    return (
        <motion.span
            style={{ color }}
            className="inline-block transition-colors will-change-[color]"
        >
            {children}
        </motion.span>
    );
}

const DESCRIPTION_WORDS = [
    "The",
    "modern",
    "software",
    "development",
    "&",
    "technology",
    "partner",
    "designed",
    "specifically",
    "for",
    "high-growth",
    "teams",
    "and",
    "enterprises.",
    "Streamline",
    "your",
    "digital",
    "products",
    "from",
    "concept",
    "to",
    "launch.",
];

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // CTA buttons fade-in / slide-up as text finishes lighting up
    const ctaOpacity = useTransform(scrollYProgress, [0, 0.55, 0.75], [0.5, 0.7, 1]);
    const ctaY = useTransform(scrollYProgress, [0, 0.55, 0.75], [8, 4, 0]);

    return (
        // Outer scroll container that creates the scroll track in normal document flow
        <div ref={containerRef} className="relative w-full h-[180vh] sm:h-[200vh]">
            {/* 
              Hero Section - Position Sticky in the bottom layer (z-0).
              Content sections below it on the top layer (z-10) scroll over it smoothly.
            */}
            <section
                className="sticky top-0 left-0 w-full h-screen h-[100dvh] flex items-center justify-center bg-black text-white overflow-hidden z-0 py-16 md:py-24"
            >

                {/* Central Hero Content */}
                <div className="container relative z-20 max-w-4xl mx-auto text-center px-4">
                    {/* Main Headline - Animated Word by Word */}
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.08] mb-6">
                        <span className="inline-block">
                            <AnimatedWord range={[0.02, 0.11]} progress={scrollYProgress}>
                                Create
                            </AnimatedWord>{" "}
                            <AnimatedWord range={[0.09, 0.18]} progress={scrollYProgress}>
                                better,
                            </AnimatedWord>
                        </span>
                        <br className="hidden sm:inline" />{" "}
                        <span className="inline-block">
                            <AnimatedWord range={[0.16, 0.25]} progress={scrollYProgress}>
                                faster,
                            </AnimatedWord>{" "}
                            <AnimatedWord range={[0.23, 0.32]} progress={scrollYProgress}>
                                and
                            </AnimatedWord>{" "}
                            <AnimatedWord range={[0.30, 0.42]} progress={scrollYProgress}>
                                together
                            </AnimatedWord>
                        </span>
                    </h1>

                    {/* Description Subtitle - Animated Word by Word */}
                    <p className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto mb-10 leading-relaxed font-normal">
                        {DESCRIPTION_WORDS.map((word, i) => {
                            const start = 0.40 + (i / DESCRIPTION_WORDS.length) * 0.30;
                            const end = start + 0.07;
                            return (
                                <React.Fragment key={i}>
                                    <AnimatedWord
                                        range={[start, end]}
                                        progress={scrollYProgress}
                                        dimColor="rgba(255, 255, 255, 0.22)"
                                        activeColor="rgba(212, 212, 216, 0.95)"
                                    >
                                        {word}
                                    </AnimatedWord>
                                    {i < DESCRIPTION_WORDS.length - 1 && " "}
                                </React.Fragment>
                            );
                        })}
                    </p>

                    {/* CTA Buttons */}

                    <div className=" flex gap-4 justify-center">

                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex gap-1 items-center justify-center px-4 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-base tracking-wide transition-colors duration-300 text-center"
                        >
                            Get Started
                            <ChevronRight size={18} />
                        </Link>

                        <Link
                            href="/work"
                            className="w-full sm:w-auto inline-flex gap-1  items-center justify-center px-4 sm:px-8 py-3.5 rounded-xl sm:rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-base tracking-wide border border-zinc-800 transition-colors duration-300 text-center"
                        >
                            See Demo
                            <ChevronRight size={18} />
                        </Link>
                    </div>

                </div>
            </section>
        </div>
    );
}

