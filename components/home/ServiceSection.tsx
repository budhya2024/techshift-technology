"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

interface Service {
  title: string;
  description: string;
  link: string;
  bgImage: string;
}

const DEFAULT_SERVICES: Service[] = [
  {
    title: "Shopify Development",
    description: "Custom Shopify e-commerce storefronts, custom theme building, app integrations, and checkout conversion optimization.",
    link: "/services/shopify-development",
    bgImage: "https://images.unsplash.com/photo-1556742049-0a67cf6004b1?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android built with React Native and Flutter.",
    link: "/services/mobile-apps",
    bgImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Website Development",
    description: "Modern, high-performance, and responsive web applications built with Next.js, React, and cutting-edge frontend architectures.",
    link: "/services/web-development",
    bgImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Digital Marketing",
    description: "Strategic SEO optimization, targeted Google & Meta ad campaigns, social media marketing, and brand growth strategies.",
    link: "/services/digital-marketing",
    bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "AI Solutions",
    description: "Smart AI integration, custom LLM chatbots, automated workflow intelligence, and predictive business data analytics.",
    link: "/services/ai-solutions",
    bgImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Cloud & DevOps",
    description: "Scalable cloud infrastructure, automated CI/CD deployment pipelines, containerization, and server security setups.",
    link: "/services/cloud",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  }
];

interface ServiceSectionProps {
  services?: Service[];
  servicesRef?: React.RefObject<HTMLElement | null>;
}

export default function ServiceSection({
  services = DEFAULT_SERVICES,
  servicesRef,
}: ServiceSectionProps) {
  const router = useRouter();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section
      ref={servicesRef}
      id="services"
      className="py-7 md:py-14  relative overflow-hidden"
    >
      <div className="container">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between sec-header gap-6">
          <div>
            <h2 className="sec-title">
              What We Offer
            </h2>
            <p className="sec-desc">
              Complete digital solutions engineered for modern business growth.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              ref={prevRef}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-full bg-[#0d131c] hover:bg-red-600 border border-gray-800 hover:border-red-600 flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer text-white"
            >
              <ChevronLeft className="w-6 h-6  transition-transform" />
            </button>
            <button
              ref={nextRef}
              aria-label="Next Slide"
              className="w-12 h-12 rounded-full bg-[#0d131c] hover:bg-red-600 border border-gray-800 hover:border-red-600 flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer text-white"
            >
              <ChevronRight className="w-6 h-6 transition-transform" />
            </button>
          </div>
        </div>

        {/* Swiper Slider */}
        <div className="w-full relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            spaceBetween={28}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 24 },
              768: { slidesPerView: 1.8, spaceBetween: 28 },
              1024: { slidesPerView: 2.5, spaceBetween: 32 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean" && swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            className="w-full py-2"
          >
            {services.map((service, index) => (
              <SwiperSlide key={index} className="h-auto">
                {({ isActive }) => (
                  <div
                    onClick={() => router.push(service.link)}
                    className={`group relative rounded-lg overflow-hidden border transition-all duration-500 flex flex-col justify-end h-[380px] p-8 shadow-xl cursor-pointer ${isActive ? "border-gray-800/80 bg-[#0d131c]" : "border-gray-800/80 bg-[#0c1118] "
                      }`}
                  >
                    {/* Background Image with Gradient Overlay */}
                    <div className="absolute inset-0 w-full h-full z-0">
                      <Image
                        src={service.bgImage}
                        alt={service.title}
                        fill
                        className={`object-cover object-center transform transition-transform duration-700 ${isActive ? "opacity-50 scale-105" : "opacity-35 group-hover:opacity-50 group-hover:scale-105"
                          }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060a0f] via-[#060a0f]/85 to-transparent" />
                    </div>

                    {/* Bottom Positioned Content Wrapper */}
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-lg md:text-2xl text-white font-bold transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Revealed Description & Button: Automatically shown for active slide, hover for others */}
                      <div
                        className={`grid transition-all duration-500 ease-out ${isActive
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100"
                          }`}
                      >
                        <div className="overflow-hidden space-y-4 pt-3">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {service.description}
                          </p>

                          <div className="pt-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(service.link);
                              }}
                              className="relative inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white text-sm font-bold rounded-xl overflow-hidden group/btn shadow-md transition-all duration-700 ease-out cursor-pointer"
                            >
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-700 group-hover/btn:w-[380%] group-hover/btn:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                              <span className="relative z-10 flex items-center gap-2">
                                <span>Explore Service</span>
                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
