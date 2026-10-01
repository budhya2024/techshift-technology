import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import Header from "@/components/shared/Hader";
import PortfolioGrid from "@/components/about/PortfolioGrid";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Portfolio | Techshift Technology",
  description:
    "Explore our portfolio of successful projects — web development, mobile apps, UI/UX design, and digital marketing campaigns that delivered real results.",
};

export default function PortfolioPage() {
  return (
    <main>
      <Header />
      <PageHeader
        title="Our Portfolio"
        breadcrumb="Portfolio"
        description="Explore our successful projects and see how we've helped businesses transform their ideas into reality."
      />
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
