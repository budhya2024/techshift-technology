"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import Header from "@/components/shared/Hader";
import Footer from "@/components/shared/Footer";
import CareerFormSection from "@/components/careers/CareerFormSection";
import { FiArrowRight } from "react-icons/fi";

const jobs = [
  {
    title: "Senior Frontend Developer",
    type: "Full-Time",
    location: "Remote / Hybrid",
    department: "Engineering",
    description: "We are looking for an experienced Frontend Developer with deep knowledge of React, Next.js, and modern CSS frameworks to lead our frontend architecture.",
  },
  {
    title: "Full Stack Engineer",
    type: "Full-Time",
    location: "Remote",
    department: "Engineering",
    description: "Join our core product team to build scalable and performant full-stack applications using Node.js, React, and PostgreSQL.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-Time",
    location: "On-site / Hybrid",
    department: "Design",
    description: "Help us create stunning, premium user experiences. You'll be working closely with developers to translate ideas into beautiful digital products.",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Contract",
    location: "Remote",
    department: "Marketing",
    description: "Drive growth and engagement through data-driven SEO, social media strategies, and paid ad campaigns.",
  }
];

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | undefined>(undefined);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsModalOpen(true);
  };

  return (
    <main>
      <Header />
      <PageHeader
        title="Join Our Team"
        breadcrumb="Careers"
        description="Looking for an exciting career opportunity? Join our growing team of professionals and make an impact."
      />

      {/* Open Positions Section */}
      <section className="py-20 bg-card border-t border-border">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2 inline-block">
              OPEN ROLES
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4">
              Explore Opportunities
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              We are always on the lookout for talented individuals. Find a role that fits your passion and expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-background border border-border p-6 md:p-8 rounded-2xl hover:border-red-500/40 transition-all duration-300 group flex flex-col justify-between items-start gap-6 shadow-sm hover:shadow-md"
              >
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-muted-foreground text-xs font-semibold">
                      {job.type} • {job.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-red-500 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>

                {/* Apply Now Button: auto-width (not full width) with 700ms center circular expanding fill animation */}
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => handleApplyClick(job.title)}
                    className="relative inline-flex items-center justify-center gap-2 bg-transparent border border-zinc-800 hover:border-red-500 text-foreground text-sm font-bold px-6 py-3 rounded-xl overflow-hidden group/btn transition-all duration-700 ease-out text-center cursor-pointer"
                  >
                    {/* Center Circular Expanding Fill Animation */}
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-red-500 group-hover/btn:w-[380%] group-hover/btn:h-[380%] transition-all duration-700 ease-in-out z-0 pointer-events-none" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-300">
                      Apply Now <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standalone Career Form Section */}
      <CareerFormSection selectedJobTitle={selectedJob} />

      {/* Popup Modal for direct "Apply Now" button click */}
      {isModalOpen && (
        <CareerFormSection
          isModal={true}
          isOpen={isModalOpen}
          selectedJobTitle={selectedJob}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <Footer />
    </main>
  );
}
