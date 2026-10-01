import { PageHeader } from "@/components/shared/PageHeader";
import Header from "@/components/shared/Hader";

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <PageHeader 
        title="Our Services"
        breadcrumb="Services"
        description="Discover the wide range of services we offer to help you achieve your goals and drive your business forward."
      />
      
      <section className="container py-16">
        <p>Services content coming soon...</p>
      </section>
    </main>
  );
}
