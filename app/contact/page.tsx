import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import Header from "@/components/shared/Hader";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Contact Us | Techshift Technology",
  description:
    "Get in touch with Techshift Technology. Our team is ready to answer your questions, discuss your project, and help you grow your business digitally.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <PageHeader
        title="Contact Us"
        breadcrumb="Contact"
        description="Get in touch with us today. Our team is ready to answer your questions and discuss how we can help you."
      />
      <ContactForm />
      <Footer />
    </main>
  );
}
