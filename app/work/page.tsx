import { PageHeader } from "@/components/shared/PageHeader";
import Header from "@/components/shared/Hader";
import Footer from "@/components/shared/Footer";

export default function WorkPage() {
  return (
    <main>
      <Header />
      <PageHeader
        title="Our Work"
        breadcrumb="Work"
        description="A selection of our finest projects."
      />
      <section className="container py-20 min-h-[40vh]">
        <p className="text-muted-foreground text-center">Work content coming soon...</p>
      </section>
      <Footer />
    </main>
  );
}
