import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiShopify,
  SiFlutter,
  SiNodedotjs,
  SiNestjs,
  SiVuedotjs,
  SiCloudflare,
  SiOpenai,
  SiTailwindcss,
  SiDocker,
  SiDotnet
} from "react-icons/si";

const technologies = [
  { name: "Shopify", icon: SiShopify, color: "text-[#96BF48]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "React.js", icon: SiReact, color: "text-[#61DAFB]" },
  { name: ".NET", icon: SiDotnet, color: "text-[#512BD4]" },
  { name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "NestJS", icon: SiNestjs, color: "text-[#E0234E]" },
  { name: "Vue.js", icon: SiVuedotjs, color: "text-[#4FC08D]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "OpenAI", icon: SiOpenai, color: "text-white" },
  { name: "Cloudflare", icon: SiCloudflare, color: "text-[#F38020]" },
  { name: "Docker", icon: SiDocker, color: "text-[#2496ED]" },
];

export default function TechnologySection() {
  return (
    <section className="py-7 md:py-14 bg-[#0a0f16]">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="text-center sec-header">
          <h2 className="sec-title text-white">
            Technology we use
          </h2>
          <p className="sec-desc text-white mx-auto">
            We select technologies based on scalability, reliability, and long-term maintainability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="relative aspect-square flex items-center justify-center group"
              >
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-700 transition-colors duration-300 group-hover:border-red-500"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-700 transition-colors duration-300 group-hover:border-red-500"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-700 transition-colors duration-300 group-hover:border-red-500"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-700 transition-colors duration-300 group-hover:border-red-500"></div>

                {/* Icon Wrapper */}
                <div className="w-16 h-16 md:h-20 md:w-20 rounded-full bg-[#05080b] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <Icon className={`w-10 h-10 md:w-12 md:h-12 ${tech.color}`} title={tech.name} />
                </div>

                {/* Optional glow effect on hover */}
                <div className="absolute inset-0 bg-red-500/5 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
