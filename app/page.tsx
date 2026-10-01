import ServiceSection from "@/components/home/ServiceSection";
import WorkSection from "@/components/home/WorksSection";
import FaqSection from "@/components/home/FaqSection";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Hader";
import Image from "next/image";
import CtaSection from "@/components/home/CtaSection";
import HeroSection from "@/components/home/HeroSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import TechnologySection from "@/components/home/TechnologySection";
import StatsSection from "@/components/home/StatsSection";


export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServiceSection />
      <TechnologySection />
      <WorkSection />
      <StatsSection />
      <TestimonialSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}
