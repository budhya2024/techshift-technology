import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
  description?: string;
  bgImage?: string;
}

export const PageHeader = ({
  title,
  breadcrumb,
  description,
  bgImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
}: PageHeaderProps) => {
  return (
    <section className="relative w-full pt-28 pb-16 flex items-center bg-card overflow-hidden min-h-[260px] md:min-h-[300px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Red Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black-900/95 via-black-800/90 to-black-900/80 mix-blend-multiply" />
      <div className="absolute inset-0 z-0 bg-[#5C0A0A]/60" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl text-white">
          <div className="flex items-center space-x-2 text-sm md:text-base font-medium mb-3 text-white">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>»</span>
            <span>{breadcrumb}</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          {/* Separator Line */}
          <div className="flex items-center w-full max-w-md mb-6">
            <div className="h-0.5 w-24 bg-white" />
            <div className="h-px flex-1 bg-white/30" />
          </div>

          {description && (
            <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
