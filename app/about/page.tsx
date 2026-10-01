import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import Header from "@/components/shared/Hader";
import AboutContent from "@/components/about/AboutContent";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "About Us | Techshift Technology",
  description:
    "Learn about Techshift Technology — our mission, vision, core values, and the expert team behind your digital transformation. We build bold digital products that drive real results.",
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <PageHeader
        title="About Techshift Technology"
        breadcrumb="About Us"
        description="We are a next-generation digital solutions company dedicated to empowering businesses with bold, cutting-edge technology."
      />
      <AboutContent />
      <Footer />
    </main>
  );
}
