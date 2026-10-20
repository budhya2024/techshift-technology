import type { Metadata } from "next";
import Header from "@/components/shared/Hader";
import { PageHeader } from "@/components/shared/PageHeader";
import TermsContent from "@/components/terms/TermsContent";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions | Techshift Technology",
  description:
    "Review the Terms & Conditions of Techshift Technology. Understand our service scopes, intellectual property rights, payment terms, and project policies.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <PageHeader
        title="Terms & Conditions"
        breadcrumb="Terms & Conditions"
        description="Clear guidelines, service commitments, and policies governing our technology and software partnerships."
      />
      <TermsContent />
      <Footer />
    </main>
  );
}
