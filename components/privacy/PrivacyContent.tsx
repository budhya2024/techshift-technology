"use client";

import React from "react";

export default function PrivacyContent() {
  const lastUpdated = "September 30, 2026";

  const sections = [
    {
      id: "collection",
      title: "1. Information We Collect",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            At Techshift Technology, we respect your privacy and are committed to protecting the personal information you share with us. We collect information necessary to provide tailored digital solutions, build custom applications, and deliver exceptional services.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900 font-semibold">Personal Identifiers:</strong> Name, email address, phone number, company name, and job title provided when requesting a quote or contacting us.</li>
            <li><strong className="text-zinc-900 font-semibold">Technical & Usage Data:</strong> IP address, browser type, operating system, page views, and navigation metrics collected via standard web telemetry.</li>
            <li><strong className="text-zinc-900 font-semibold">Project Briefs & Specifications:</strong> Information provided during consultations, wireframing, or software development agreements.</li>
          </ul>
        </div>
      )
    },
    {
      id: "usage",
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            The information we collect is used strictly for legitimate business purposes to fulfill our contractual commitments and enhance your user experience:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li>To deliver, maintain, and improve our web development, mobile app, and AI software services.</li>
            <li>To respond directly to inquiry messages, support requests, or project consultations.</li>
            <li>To process billing, invoices, and legal project contracts securely.</li>
            <li>To monitor application performance, system stability, and prevent unauthorized security breaches.</li>
          </ul>
        </div>
      )
    },
    {
      id: "protection",
      title: "3. Data Protection & Security",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            We deploy robust administrative, technical, and physical security measures to safeguard your sensitive business data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="text-zinc-600">
            Our infrastructure uses SSL/TLS encryption for all data in transit, strict access control policies, and routine security assessments to ensure complete data integrity.
          </p>
        </div>
      )
    },
    {
      id: "cookies",
      title: "4. Cookies & Analytics",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Our website uses cookies and similar session tracking mechanisms to analyze website traffic, customize your browsing experience, and remember user preferences.
          </p>
          <p className="text-zinc-600">
            You can modify your browser settings to decline non-essential cookies at any time. Disabling cookies will not hinder your access to core content on our site.
          </p>
        </div>
      )
    },
    {
      id: "sharing",
      title: "5. Sharing & Disclosure",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            <strong className="text-zinc-900 font-semibold">We do not sell, rent, or trade your personal information</strong> to third-party marketers or advertisers under any circumstances.
          </p>
          <p className="text-zinc-600">
            Information may only be shared with trusted third-party service providers (such as cloud hosting infrastructure, payment processors, or email delivery systems) under strict confidentiality agreements, or when mandated by law enforcement and legal compliance.
          </p>
        </div>
      )
    },
    {
      id: "rights",
      title: "6. Your Data Rights",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Depending on your jurisdiction, you possess specific data protection rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900 font-semibold">Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-zinc-900 font-semibold">Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
            <li><strong className="text-zinc-900 font-semibold">Right to Erasure:</strong> Request permanent deletion of your data where permitted by contract laws.</li>
            <li><strong className="text-zinc-900 font-semibold">Opt-Out:</strong> Unsubscribe from non-essential promotional communications at any time.</li>
          </ul>
        </div>
      )
    },
    {
      id: "contact",
      title: "7. Contact Privacy Team",
      content: (
        <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us directly:
          </p>
          <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-xl space-y-3">
            <div className="text-zinc-800">
              <span className="text-zinc-500 text-sm block">Email:</span>
              <a href="mailto:techshifttechnology@gmail.com" className="font-medium text-zinc-900 hover:text-red-600 transition-colors">
                techshifttechnology@gmail.com
              </a>
            </div>
            <div className="text-zinc-800">
              <span className="text-zinc-500 text-sm block">Phone:</span>
              <a href="tel:+917797538010" className="font-medium text-zinc-900 hover:text-red-600 transition-colors">
                +91 7797538010
              </a>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-white text-zinc-900">
      <div className="container max-w-5xl">
        {/* Top Meta Header Card */}
        <div className="bg-white border border-zinc-200/90 p-6 md:p-8 rounded-2xl mb-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
              Privacy Policy Agreement
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-0.5">
              Your trust and data security are our top priorities.
            </p>
          </div>
          <div className="px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs md:text-sm text-zinc-600">
            Last Updated: <span className="text-zinc-900 font-semibold">{lastUpdated}</span>
          </div>
        </div>

        {/* Content Sections Grid */}
        <div className="space-y-8">
          {sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="bg-white border border-zinc-200/90 p-6 md:p-8 rounded-2xl shadow-sm hover:border-red-500/40 hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4 border-b border-zinc-100 pb-4">
                <h3 className="text-lg md:text-xl font-bold text-zinc-900">
                  {sec.title}
                </h3>
              </div>
              {sec.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
