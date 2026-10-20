"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { getStoredProjects, Project } from "@/lib/portfolioStore";

export default function PortfolioGrid() {
    const [projectsList, setProjectsList] = useState<Project[]>([]);

    useEffect(() => {
        setProjectsList(getStoredProjects());

        const handleUpdate = () => {
            setProjectsList(getStoredProjects());
        };

        window.addEventListener("portfolio_updated", handleUpdate);
        return () => {
            window.removeEventListener("portfolio_updated", handleUpdate);
        };
    }, []);

    return (
        <section className="py-16 bg-background">
            <div className="container">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="sec-title">
                        Projects We Are Proud Of
                    </h2>
                    <p className="sec-desc mx-auto text-center">
                        A showcase of our best work across web development, mobile apps,
                        design, and digital marketing.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsList.map((project) => (
                        <div
                            key={project.id}
                            className="bg-card border border-border rounded-[4px] transition-all duration-300 group flex flex-col cursor-pointer overflow-hidden"
                        >
                            {/* Image */}
                            <div className="overflow-hidden aspect-[4/3] relative">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                {/* Category badge */}
                                <span className="inline-block bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 mb-3 w-fit rounded-[4px]">
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-base font-bold text-foreground mb-2">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 flex-1">
                                    {project.description}
                                </p>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-zinc-800 bg-black text-white text-xs px-2 py-0.5 rounded-[2px]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Live Demo Button */}
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 sm:py-3 rounded-[4px] transition-colors duration-300"
                                >
                                    <FiExternalLink className="w-3.5 h-3.5" />
                                    Live Demo
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
