"use client";

import React from "react";
import Image from "next/image";

const row1Testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "CEO at TechFlow",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    content: "Techshift completely transformed our digital presence. Their attention to detail and ability to execute complex technical requirements flawlessly is unmatched. We saw a 200% increase in user engagement within the first three months of launch.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "Founder, GrowthStack",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    content: "The team at Techshift isn't just a development agency; they are strategic partners. They helped us rethink our entire user journey and delivered a product that looks stunning and performs even better.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    content: "Working with them was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and the design is absolutely breathtaking.",
    rating: 5,
  },
  {
    id: 4,
    name: "Alexander Wright",
    role: "VP of Engineering",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    content: "The speed of execution combined with enterprise-grade security standards blew us away. Highly recommended for complex SaaS products and scalable microservices.",
    rating: 5,
  },
];

const row2Testimonials = [
  {
    id: 5,
    name: "Michael Chang",
    role: "CTO, NextGen Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    content: "We had a highly complex backend architecture requirement. Not only did they deliver a robust, scalable solution, but the code quality was pristine with complete documentation.",
    rating: 5,
  },
  {
    id: 6,
    name: "Jessica Walsh",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    content: "Their UI/UX team is phenomenal. They took our vague ideas and turned them into a beautiful, intuitive interface that our customers love.",
    rating: 5,
  },
  {
    id: 7,
    name: "Amanda Smith",
    role: "Co-Founder, RetailPulse",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    content: "Our mobile conversion rates jumped 45% immediately after launching the new React Native app created by Techshift. Exceptional craft and reliable support.",
    rating: 5,
  },
  {
    id: 8,
    name: "Robert Fox",
    role: "Operations Head",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    content: "Professional, responsive, and incredibly talented. They are our go-to technology partners for all digital initiatives.",
    rating: 4,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-7 md:py-14 bg-background text-foreground overflow-hidden">
      <div className="container sec-header">
        <div className="text-center">
          <h2 className="sec-title text-foreground">
            What Our Clients Say
          </h2>
          <p className="sec-desc mx-auto">
            Don&apos;t just take our word for it. Hear from the amazing companies and partners we&apos;ve worked with.
          </p>
        </div>
      </div>

      {/* 2-Row Infinite Marquee Container */}
      <div className="w-full overflow-hidden space-y-6">

        {/* Row 1: Left Auto Slider */}
        <div className="flex w-full overflow-hidden py-1">
          <div className="animate-marquee-left flex gap-6">
            {[...row1Testimonials, ...row1Testimonials].map((testimonial, idx) => (
              <div
                key={`r1-${idx}`}
                className="w-[340px] md:w-[400px] flex-shrink-0 bg-card border border-border/80 p-7 rounded relative  transition-colors duration-300 flex flex-col justify-between group "
              >


                <div>
                  <p className="text-foreground text-sm md:text-base leading-relaxed mb-6 ">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-red-500/30 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right Auto Slider */}
        <div className="flex w-full overflow-hidden py-1">
          <div className="animate-marquee-right flex gap-6">
            {[...row2Testimonials, ...row2Testimonials].map((testimonial, idx) => (
              <div
                key={`r2-${idx}`}
                className="w-[340px] md:w-[400px] flex-shrink-0 bg-card border border-border/80 p-7 rounded relative  transition-colors duration-300 flex flex-col justify-between group "
              >
                <div>
                  <p className="text-foreground text-sm md:text-base leading-relaxed mb-6 ">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-red-500/30 flex-shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-sm">{testimonial.name}</h4>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
