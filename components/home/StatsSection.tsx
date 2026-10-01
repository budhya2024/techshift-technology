"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 5, suffix: "+", label: "Years in Business" },
    { value: 200, suffix: "+", label: "Projects Delivered" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 15, suffix: "+", label: "Expert Team Members" },
    { value: 10, suffix: "+", label: "Countries Served" },
];

function useCountUp(target: number, duration: number = 1800, start: boolean = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [target, duration, start]);

    return count;
}

function StatItem({
    value,
    suffix,
    label,
    animate,
    index,
}: {
    value: number;
    suffix: string;
    label: string;
    animate: boolean;
    index: number;
}) {
    const count = useCountUp(value, 1600 + index * 100, animate);

    return (
        <div
            className="flex flex-col items-start text-left group"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-red-500 leading-none tabular-nums transition-transform duration-300">
                {animate ? count : 0}
                <span>{suffix}</span>
            </span>
            <span className="mt-2 text-xs sm:text-sm md:text-base text-muted-foreground font-medium tracking-wide uppercase">
                {label}
            </span>
        </div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="stats" ref={sectionRef} className="py-8 md:py-14 bg-card/30">
            <div className="container">
                {/* Heading */}
                <div className="mb-8 md:mb-14">
                    <h2
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none select-none"
                        style={{
                            color: "transparent",
                            WebkitTextStroke: "2px #ef4444",
                        }}
                    >
                        Our Journey
                    </h2>

                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-6">
                    {stats.map((stat, index) => (
                        <StatItem
                            key={stat.label}
                            value={stat.value}
                            suffix={stat.suffix}
                            label={stat.label}
                            animate={animate}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
