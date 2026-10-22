"use client";

import React from "react";
import {
    SiStripe,
    SiShopify,
    SiSlack,
    SiSpotify,
    SiAirbnb,
    SiDropbox,
    SiUber,
    SiCoinbase,
    SiGithub,
    SiLinear,
} from "react-icons/si";
import { FaAmazon, FaMicrosoft, FaGoogle } from "react-icons/fa6";

interface Brand {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    hoverColor: string;
}

const BRANDS: Brand[] = [
    { name: "Stripe", icon: SiStripe, hoverColor: "hover:text-[#635BFF]" },
    { name: "Shopify", icon: SiShopify, hoverColor: "hover:text-[#96BF48]" },
    { name: "Amazon", icon: FaAmazon, hoverColor: "hover:text-[#FF9900]" },
    { name: "Slack", icon: SiSlack, hoverColor: "hover:text-[#4A154B]" },
    { name: "Microsoft", icon: FaMicrosoft, hoverColor: "hover:text-[#00A4EF]" },
    { name: "Spotify", icon: SiSpotify, hoverColor: "hover:text-[#1ED760]" },
    { name: "Airbnb", icon: SiAirbnb, hoverColor: "hover:text-[#FF5A5F]" },
    { name: "Google", icon: FaGoogle, hoverColor: "hover:text-[#4285F4]" },
    { name: "Uber", icon: SiUber, hoverColor: "hover:text-black" },
    { name: "Dropbox", icon: SiDropbox, hoverColor: "hover:text-[#0061FF]" },
    { name: "GitHub", icon: SiGithub, hoverColor: "hover:text-black" },
    { name: "Linear", icon: SiLinear, hoverColor: "hover:text-[#5E6AD2]" },
];

export default function LogoLoopSlider() {
    return (
        <section className="w-full bg-white text-zinc-900 py-8 md:py-16 relative overflow-hidden select-none">

            {/* Infinite Marquee Track Container with Edge Gradient Fade Masks */}
            <div className="relative w-full overflow-hidden">
                {/* Left Gradient Fade Mask */}
                <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 md:w-44 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />

                {/* Right Gradient Fade Mask */}
                <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 md:w-44 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

                {/* Continuous Infinite Looping Marquee */}
                <div className="flex w-max animate-marquee-left space-x-10 sm:space-x-16 items-center py-2">
                    {/* First Full Set */}
                    {BRANDS.map((brand, i) => {
                        const Icon = brand.icon;
                        return (
                            <div
                                key={`brand-1-${i}`}
                                className={`flex items-center gap-3 text-zinc-400 opacity-70 hover:opacity-100 ${brand.hoverColor} transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
                            >
                                <Icon className="w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-300" />
                                <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-700 group-hover:text-zinc-950 transition-colors duration-300">
                                    {brand.name}
                                </span>
                            </div>
                        );
                    })}

                    {/* Duplicate Set for Seamless Seamless Loop */}
                    {BRANDS.map((brand, i) => {
                        const Icon = brand.icon;
                        return (
                            <div
                                key={`brand-2-${i}`}
                                className={`flex items-center gap-3 text-zinc-400 opacity-70 hover:opacity-100 ${brand.hoverColor} transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
                            >
                                <Icon className="w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-300" />
                                <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-700 group-hover:text-zinc-950 transition-colors duration-300">
                                    {brand.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
