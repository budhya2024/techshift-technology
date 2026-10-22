"use client";

import React from "react";

export default function TermsContent() {
  const lastUpdated = "September 30, 2026";

  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            By accessing or using the services provided by <strong className="text-zinc-900 font-semibold">Techshift Technology</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), including our website, web applications, mobile software, and consultancy services, you agree to be bound by these Terms & Conditions.
          </p>
          <p>
            If you are entering into this agreement on behalf of a company, organization, or other legal entity, you represent and warrant that you have full legal authority to bind such entity to these Terms. If you do not agree to all terms outlined herein, you must immediately discontinue use of our services.
          </p>
        </div>
      )
    },
    {
      id: "services",
      title: "2. Scope of Services & Deliverables",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Techshift Technology provides tailored digital engineering and consultancy services, including but not limited to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900 font-semibold">Web Application Development:</strong> High-performance modern web platforms, SPAs, and full-stack architectures.</li>
            <li><strong className="text-zinc-900 font-semibold">Mobile App Development:</strong> Native and cross-platform iOS and Android applications.</li>
            <li><strong className="text-zinc-900 font-semibold">UI/UX Experience Design:</strong> User journey mapping, interactive prototyping, and responsive design systems.</li>
            <li><strong className="text-zinc-900 font-semibold">Custom Enterprise Software & AI:</strong> Bespoke workflow automation, custom APIs, and AI integrations.</li>
            <li><strong className="text-zinc-900 font-semibold">Digital Strategy & Consulting:</strong> Technical architecture advisory and performance optimization.</li>
          </ul>
          <p>
            Detailed project scopes, timelines, milestone schedules, and acceptance criteria are formalized in individual Statements of Work (SOW) or project proposals agreed upon with each client.
          </p>
        </div>
      )
    },
    {
      id: "intellectual-property",
      title: "3. Intellectual Property Rights",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            We take pride in building original, high-grade solutions while respecting our clients&apos; proprietary assets:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900 font-semibold">Client Ownership:</strong> Upon full and final settlement of all agreed project fees and invoices, all rights, title, and ownership in custom source code, assets, and design deliverables created exclusively for the client shall transfer to the client.</li>
            <li><strong className="text-zinc-900 font-semibold">Pre-existing Frameworks & Tools:</strong> Techshift Technology retains ownership of any pre-existing proprietary tools, modular libraries, starter kits, or open-source software utilized in the build, granting the client a non-exclusive, perpetual, royalty-free license to use such components as integrated in the delivered work.</li>
            <li><strong className="text-zinc-900 font-semibold">Portfolio Showcase:</strong> Unless explicitly restricted via a signed Non-Disclosure Agreement (NDA), Techshift Technology reserves the right to showcase completed non-confidential project deliverables, client logos, and case studies in our digital portfolio.</li>
          </ul>
        </div>
      )
    },
    {
      id: "client-obligations",
      title: "4. Client Obligations & Content",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Timely and successful project completion relies on mutual collaboration. Clients agree to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li>Provide timely access to relevant assets, brand guidelines, content, accounts, and third-party APIs required for development.</li>
            <li>Designate a primary point of contact authorized to make decisions and provide feedback during review cycles.</li>
            <li>Ensure that all materials, media, fonts, and assets provided to Techshift Technology do not infringe upon any third-party copyrights or trademarks.</li>
          </ul>
        </div>
      )
    },
    {
      id: "payment-terms",
      title: "5. Payment Terms & Invoicing",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Unless specified otherwise in your signed project contract or Statement of Work:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-600">
            <li><strong className="text-zinc-900 font-semibold">Deposit & Milestones:</strong> Projects typically require an upfront commitment deposit before work begins, with remaining balances tied to verifiable milestone stages.</li>
            <li><strong className="text-zinc-900 font-semibold">Payment Window:</strong> Invoices are due within fourteen (14) calendar days from the invoice issuance date.</li>
            <li><strong className="text-zinc-900 font-semibold">Late Payments:</strong> Unpaid balances past the due date may incur interest at 1.5% per month or the legal maximum, and we reserve the right to temporarily pause active development until outstanding dues are settled.</li>
          </ul>
        </div>
      )
    },
    {
      id: "scope-changes",
      title: "6. Revisions & Scope Changes",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            We accommodate iterative refinement while maintaining strict project timelines:
          </p>
          <p>
            Standard projects include specified rounds of revision outlined in the initial proposal. Any feature requests, architectural alterations, or third-party service pivots falling outside the mutually approved scope will be treated as a Change Request, subject to separate estimation and schedule adjustment.
          </p>
        </div>
      )
    },
    {
      id: "confidentiality",
      title: "7. Confidentiality & Non-Disclosure",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Both parties agree to treat all non-public technical specifications, source code, business logic, customer data, and commercial discussions as strictly confidential.
          </p>
          <p>
            Neither party will disclose confidential information to any third party without prior written consent, except where required by applicable legal statutes or regulatory mandates.
          </p>
        </div>
      )
    },
    {
      id: "warranties-liability",
      title: "8. Warranties & Limitation of Liability",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            <strong className="text-zinc-900 font-semibold">Post-Launch Support Warranty:</strong> We provide a thirty (30) day warranty period following final project deployment to resolve any reproducible software bugs or defects resulting directly from our code, free of charge.
          </p>
          <p>
            <strong className="text-zinc-900 font-semibold">Liability Cap:</strong> To the maximum extent permitted by law, Techshift Technology shall not be liable for any indirect, incidental, punitive, or consequential damages (including loss of profits, data, or business interruption). Our total aggregate liability under any claim arising out of our engagement shall not exceed the actual fees paid by the client to Techshift Technology for the specific deliverable giving rise to liability.
          </p>
        </div>
      )
    },
    {
      id: "termination",
      title: "9. Termination of Services",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            Either party may terminate an ongoing engagement upon providing fourteen (14) days written notice if the other party commits a material breach and fails to remedy it within that period.
          </p>
          <p>
            In the event of termination, the client will compensate Techshift Technology for all work completed, hours logged, and non-cancelable expenses incurred up to the effective termination date. All completed deliverables paid for will be handed over to the client.
          </p>
        </div>
      )
    },
    {
      id: "governing-law",
      title: "10. Governing Law & Dispute Resolution",
      content: (
        <div className="space-y-3 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
          </p>
          <p>
            Any dispute arising out of or relating to these terms shall first be addressed through good-faith amicable negotiation between executive representatives before pursuing formal arbitration or court jurisdiction in Kolkata, India.
          </p>
        </div>
      )
    },
    {
      id: "contact",
      title: "11. Contact & Legal Inquiries",
      content: (
        <div className="space-y-4 text-zinc-600 leading-relaxed text-sm md:text-base">
          <p>
            If you have questions, feedback, or require clarification regarding these Terms & Conditions, please reach out to our legal and operations team:
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
              Terms & Conditions Agreement
            </h2>
            <p className="text-zinc-500 text-xs md:text-sm mt-0.5">
              Clear guidelines, commitments, and policies governing our technology partnerships.
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
