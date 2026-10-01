import type { Metadata } from "next";
import Header from "@/components/shared/Hader";
import { PageHeader } from "@/components/shared/PageHeader";
import PrivacyContent from "@/components/privacy/PrivacyContent";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Techshift Technology",
  description:
    "Read the Privacy Policy of Techshift Technology. Learn how we collect, protect, and use your personal information and project data securely.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <PageHeader
        title="Privacy Policy"
        breadcrumb="Privacy Policy"
        description="Transparent data practices, privacy commitment, and security guidelines for our clients and visitors."
      />
      <PrivacyContent />
      <Footer />
    </main>
  );
}
