"use client";

import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  FileText, 
  UserCheck, 
  Globe, 
  Database, 
  Mail, 
  Phone 
} from "lucide-react";

export default function PrivacyContent() {
  const lastUpdated = "September 30, 2026";

  const sections = [
    {
      id: "collection",
      icon: Database,
      title: "1. Information We Collect",
      content: (
        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            At Techshift Technology, we respect your privacy and are committed to protecting the personal information you share with us. We collect information necessary to provide tailored digital solutions, build custom applications, and deliver exceptional services.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong className="text-white">Personal Identifiers:</strong> Name, email address, phone number, company name, and job title provided when requesting a quote or contacting us.</li>
            <li><strong className="text-white">Technical & Usage Data:</strong> IP address, browser type, operating system, page views, and navigation metrics collected via standard web telemetry.</li>
            <li><strong className="text-white">Project Briefs & Specifications:</strong> Information provided during consultations, wireframing, or software development agreements.</li>
          </ul>
        </div>
      )
    },
    {
      id: "usage",
      icon: Eye,
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            The information we collect is used strictly for legitimate business purposes to fulfill our contractual commitments and enhance your user experience:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
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
      icon: Lock,
      title: "3. Data Protection & Security",
      content: (
        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            We deploy robust administrative, technical, and physical security measures to safeguard your sensitive business data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="text-gray-400">
            Our infrastructure uses SSL/TLS encryption for all data in transit, strict access control policies, and routine security assessments to ensure complete data integrity.
          </p>
        </div>
      )
    },
    {
      id: "cookies",
      icon: Globe,
      title: "4. Cookies & Analytics",
      content: (
        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            Our website uses cookies and similar session tracking mechanisms to analyze website traffic, customize your browsing experience, and remember user preferences.
          </p>
          <p className="text-gray-400">
            You can modify your browser settings to decline non-essential cookies at any time. Disabling cookies will not hinder your access to core content on our site.
          </p>
        </div>
      )
    },
    {
      id: "sharing",
      icon: ShieldCheck,
      title: "5. Sharing & Disclosure",
      content: (
        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong className="text-white">We do not sell, rent, or trade your personal information</strong> to third-party marketers or advertisers under any circumstances.
          </p>
          <p className="text-gray-400">
            Information may only be shared with trusted third-party service providers (such as cloud hosting infrastructure, payment processors, or email delivery systems) under strict confidentiality agreements, or when mandated by law enforcement and legal compliance.
          </p>
        </div>
      )
    },
    {
      id: "rights",
      icon: UserCheck,
      title: "6. Your Data Rights",
      content: (
        <div className="space-y-3 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            Depending on your jurisdiction, you possess specific data protection rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-400">
            <li><strong className="text-white">Right of Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
            <li><strong className="text-white">Right to Erasure:</strong> Request permanent deletion of your data where permitted by contract laws.</li>
            <li><strong className="text-white">Opt-Out:</strong> Unsubscribe from non-essential promotional communications at any time.</li>
          </ul>
        </div>
      )
    },
    {
      id: "contact",
      icon: Mail,
      title: "7. Contact Privacy Team",
      content: (
        <div className="space-y-4 text-gray-300 leading-relaxed text-sm md:text-base">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us directly:
          </p>
          <div className="bg-[#0f1722] border border-gray-800/80 p-5 rounded-lg space-y-3">
            <div className="flex items-center space-x-3 text-white">
              <Mail className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>techshifttechnology@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Phone className="w-5 h-5 text-red-500 flex-shrink-0" />
              <span>+91 7797538010</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-[#070b10] text-white">
      <div className="container max-w-5xl">
        {/* Top Meta Header Card */}
        <div className="bg-[#0d131c] border border-gray-800/80 p-6 md:p-8 rounded-lg mb-10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded bg-red-600/10 border border-red-600/30 flex items-center justify-center text-red-500">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Privacy Policy Agreement
              </h2>
              <p className="text-gray-400 text-xs md:text-sm">
                Your trust and data security are our top priorities.
              </p>
            </div>
          </div>
          <div className="px-4 py-2 bg-[#060a0f] border border-gray-800 rounded text-xs md:text-sm text-gray-300">
            Last Updated: <span className="text-white font-semibold">{lastUpdated}</span>
          </div>
        </div>

        {/* Content Sections Grid */}
        <div className="space-y-8">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                id={sec.id}
                className="bg-[#0c1118] border border-gray-800/80 p-6 md:p-8 rounded-lg shadow-lg hover:border-red-600/30 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3 mb-4 border-b border-gray-800/60 pb-3">
                  <Icon className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {sec.title}
                  </h3>
                </div>
                {sec.content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
