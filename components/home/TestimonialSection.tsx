"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getPublishedReviews, fetchReviews, Review } from "@/lib/reviewStore";

export default function TestimonialSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);

  useEffect(() => {
    // 1. Initial cached state (strictly published only)
    setReviewsList(getPublishedReviews());

    // 2. Fetch live published reviews from the database
    fetchReviews("Published").then((res) => {
      if (Array.isArray(res)) {
        setReviewsList(res.filter((r) => r.status === "Published"));
      }
    });

    // 3. Listen to store updates (e.g. status changes in admin)
    const handleUpdate = () => {
      setReviewsList(getPublishedReviews());
      fetchReviews("Published").then((res) => {
        if (Array.isArray(res)) {
          setReviewsList(res.filter((r) => r.status === "Published"));
        }
      });
    };

    window.addEventListener("reviews_updated", handleUpdate);
    return () => window.removeEventListener("reviews_updated", handleUpdate);
  }, []);

  const activeReviews = reviewsList.filter((r) => r.status === "Published");
  const half = Math.ceil(activeReviews.length / 2);
  const row1 = activeReviews.slice(0, half);
  const row2 = activeReviews.length > 1 ? activeReviews.slice(half) : activeReviews;

  const repeatRow = (list: Review[]) => {
    if (list.length === 0) return [];
    let repeated = [...list];
    while (repeated.length < 6) {
      repeated = [...repeated, ...list];
    }
    return repeated;
  };

  const row1Items = repeatRow(row1);
  const row2Items = repeatRow(row2);

  return (
    <section className="py-7 md:py-14 bg-background text-foreground overflow-hidden">
      <div className="container sec-header">
        <div className="text-center">
          <h2 className="sec-title text-foreground">
            Happy Client Feedback
          </h2>
          <p className="sec-desc mx-auto">
            Don&apos;t just take our word for it. Hear from the amazing companies and partners we&apos;ve worked with.
          </p>
        </div>
      </div>

      {activeReviews.length === 0 ? (
        <div className="container text-center py-6 text-muted-foreground">
          <p className="text-sm">Client reviews and testimonials will appear here once published.</p>
        </div>
      ) : (
        /* 2-Row Infinite Marquee Container */
        <div className="w-full overflow-hidden space-y-6">

          {/* Row 1: Left Auto Slider */}
          <div className="flex w-full overflow-hidden py-1">
            <div className="animate-marquee-left flex gap-6">
              {row1Items.map((testimonial, idx) => (
                <div
                  key={`r1-${testimonial.id}-${idx}`}
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
                        src={testimonial.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"}
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
              {row2Items.map((testimonial, idx) => (
                <div
                  key={`r2-${testimonial.id}-${idx}`}
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
                        src={testimonial.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"}
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
      )}
    </section>
  );
}
