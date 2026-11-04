import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("ERROR: DATABASE_URL is not set.");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function run() {
  console.log("Creating database tables on Neon Lakebase Postgres...");

  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      link TEXT NOT NULL,
      bg_image TEXT NOT NULL,
      badge TEXT,
      category TEXT,
      order_index INT DEFAULT 0
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      company TEXT,
      image TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INT NOT NULL DEFAULT 5,
      date TEXT,
      status TEXT NOT NULL DEFAULT 'Published'
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_categories (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_projects (
      id SERIAL PRIMARY KEY,
      category TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      tags JSONB NOT NULL DEFAULT '[]',
      live_url TEXT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_leads (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'New'
    );
  `;

  console.log("Tables created successfully. Checking existing records...");

  const existingServices = await sql`SELECT count(*) FROM services`;
  if (parseInt(existingServices[0].count) === 0) {
    console.log("Seeding services...");
    const services = [
      {
        title: "Shopify Development",
        description: "Custom Shopify e-commerce storefronts, custom theme building, app integrations, and checkout conversion optimization.",
        link: "/contact",
        bg_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80",
        badge: "E-Commerce",
        category: "Development",
        order_index: 1
      },
      {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android built with React Native and Flutter.",
        link: "/contact",
        bg_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80",
        badge: "iOS / Android",
        category: "Mobile",
        order_index: 2
      },
      {
        title: "Website Development",
        description: "Modern, high-performance, and responsive web applications built with Next.js, React, and cutting-edge frontend architectures.",
        link: "/contact",
        bg_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
        badge: "Next.js / React",
        category: "Development",
        order_index: 3
      },
      {
        title: "Digital Marketing",
        description: "Strategic SEO optimization, targeted Google & Meta ad campaigns, social media marketing, and brand growth strategies.",
        link: "/contact",
        bg_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
        badge: "Growth & SEO",
        category: "Marketing",
        order_index: 4
      },
      {
        title: "AI Solutions",
        description: "Smart AI integration, custom LLM chatbots, automated workflow intelligence, and predictive business data analytics.",
        link: "/contact",
        bg_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        badge: "Machine Learning",
        category: "AI & Data",
        order_index: 5
      },
      {
        title: "Cloud & DevOps",
        description: "Scalable cloud infrastructure, automated CI/CD deployment pipelines, containerization, and server security setups.",
        link: "/contact",
        bg_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
        badge: "Infrastructure",
        category: "Cloud",
        order_index: 6
      }
    ];

    for (const s of services) {
      await sql`
        INSERT INTO services (title, description, link, bg_image, badge, category, order_index)
        VALUES (${s.title}, ${s.description}, ${s.link}, ${s.bg_image}, ${s.badge}, ${s.category}, ${s.order_index})
      `;
    }
  }

  const existingReviews = await sql`SELECT count(*) FROM reviews`;
  if (parseInt(existingReviews[0].count) === 0) {
    console.log("Seeding reviews...");
    const reviews = [
      {
        name: "Sarah Jenkins",
        role: "CEO at TechFlow",
        company: "TechFlow Inc.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        content: "Techshift completely transformed our digital presence. Their attention to detail and ability to execute complex technical requirements flawlessly is unmatched. We saw a 200% increase in user engagement within the first three months of launch.",
        rating: 5,
        date: "Oct 12, 2026",
        status: "Published",
      },
      {
        name: "David Chen",
        role: "Founder, GrowthStack",
        company: "GrowthStack",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        content: "The team at Techshift isn't just a development agency; they are strategic partners. They helped us rethink our entire user journey and delivered a product that looks stunning and performs even better.",
        rating: 5,
        date: "Sep 28, 2026",
        status: "Published",
      },
      {
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "VentureScale",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
        content: "Working with them was an absolute pleasure. They delivered our e-commerce platform ahead of schedule and the design is absolutely breathtaking.",
        rating: 5,
        date: "Aug 19, 2026",
        status: "Pending",
      },
      {
        name: "Alexander Wright",
        role: "VP of Engineering",
        company: "CyberCore Dynamics",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        content: "The speed of execution combined with enterprise-grade security standards blew us away. Highly recommended for complex SaaS products and scalable microservices.",
        rating: 5,
        date: "Jul 10, 2026",
        status: "Published",
      },
      {
        name: "Michael Chang",
        role: "Product Lead",
        company: "Nexus Labs",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        content: "Outstanding quality and incredible domain knowledge across Next.js and cloud architectures. They helped us launch our mobile app without any friction.",
        rating: 5,
        date: "Jun 22, 2026",
        status: "Published",
      }
    ];

    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (name, role, company, image, content, rating, date, status)
        VALUES (${r.name}, ${r.role}, ${r.company}, ${r.image}, ${r.content}, ${r.rating}, ${r.date}, ${r.status})
      `;
    }
  }

  const existingCategories = await sql`SELECT count(*) FROM portfolio_categories`;
  if (parseInt(existingCategories[0].count) === 0) {
    console.log("Seeding portfolio categories...");
    const categories = ["Development", "Mobile", "Design", "Marketing"];
    for (const cat of categories) {
      await sql`INSERT INTO portfolio_categories (name) VALUES (${cat}) ON CONFLICT DO NOTHING`;
    }
  }

  const existingProjects = await sql`SELECT count(*) FROM portfolio_projects`;
  if (parseInt(existingProjects[0].count) === 0) {
    console.log("Seeding portfolio projects...");
    const projects = [
      {
        category: "Development",
        title: "E-commerce Platform",
        description: "Modern e-commerce platform with advanced filtering, payment integration, and admin dashboard.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=80",
        tags: ["React", "Node.js", "Stripe", "MongoDB"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Mobile",
        title: "Mobile Banking App",
        description: "Secure mobile banking application with biometric authentication and real-time transactions.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
        tags: ["React Native", "Firebase", "Plaid API"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Design",
        title: "Brand Identity Design",
        description: "Complete brand identity package including logo, color palette, and brand guidelines.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
        tags: ["Figma", "Adobe Creative Suite"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Development",
        title: "Hospital Management System",
        description: "Comprehensive hospital management system with patient records, appointments, and billing.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
        tags: ["Next.js", "PostgreSQL", "Tailwind CSS"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Marketing",
        title: "Digital Marketing Campaign",
        description: "Full-scale digital marketing campaign with SEO, social media, and Google Ads management.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
        tags: ["Google Ads", "SEO", "Meta Ads"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Mobile",
        title: "Food Delivery App",
        description: "On-demand food delivery app with real-time tracking, push notifications, and payment gateway.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
        tags: ["Flutter", "Firebase", "Stripe"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Development",
        title: "Real Estate Portal",
        description: "Property listing and management portal with advanced search, filters, and agent dashboard.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop&q=80",
        tags: ["React", "Node.js", "MongoDB", "Maps API"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Design",
        title: "SaaS Dashboard UI",
        description: "Clean and modern SaaS dashboard UI design with analytics, charts, and data visualization.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
        tags: ["Figma", "Prototyping", "UI/UX"],
        live_url: "https://techshifttechnology.com",
      },
      {
        category: "Marketing",
        title: "Social Media Strategy",
        description: "Complete social media strategy and content calendar resulting in 300% engagement growth.",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80",
        tags: ["Instagram", "LinkedIn", "Content Creation"],
        live_url: "https://techshifttechnology.com",
      }
    ];

    for (const p of projects) {
      await sql`
        INSERT INTO portfolio_projects (category, title, description, image, tags, live_url)
        VALUES (${p.category}, ${p.title}, ${p.description}, ${p.image}, ${JSON.stringify(p.tags)}, ${p.live_url})
      `;
    }
  }

  const existingContacts = await sql`SELECT count(*) FROM contact_leads`;
  if (parseInt(existingContacts[0].count) === 0) {
    console.log("Seeding contact leads...");
    const contacts = [
      {
        type: "contact",
        name: "Marcus Vance",
        email: "marcus.vance@solarispay.io",
        phone: "+1 (415) 890-2341",
        company: "SolarisPay FinTech",
        message: "We need a complete web and mobile dashboard architecture with multi-currency crypto-to-fiat conversion, biometric auth, and PCI-DSS compliance. Looking to begin next month.",
        created_at: "2026-10-19 14:32",
        status: "New",
      },
      {
        type: "contact",
        name: "Elena Rostova",
        email: "elena@luminahealth.com",
        phone: "+44 20 7946 0912",
        company: "Lumina Health UK",
        message: "Interested in rebuilding our patient scheduling portal using Next.js and secure HL7/FHIR API integrations. Could we arrange an introductory discovery call?",
        created_at: "2026-10-18 10:15",
        status: "In Progress",
      },
      {
        type: "faq",
        name: "Rohan Mukherjee",
        email: "rohan.m@zenithlogistics.in",
        phone: "+91 98301 22441",
        company: "Zenith Logistics",
        message: "What is your typical turnaround timeline for an MVP mobile application with fleet GPS tracking?",
        created_at: "2026-10-17 18:40",
        status: "Resolved",
      },
      {
        type: "contact",
        name: "Liam O'Connor",
        email: "liam@dublinretail.ie",
        phone: "+353 1 496 0123",
        company: "Dublin Retail Group",
        message: "Looking for an expert Shopify Plus agency to migrate from Magento with 25,000 SKUs and custom ERP inventory integration.",
        created_at: "2026-10-16 09:20",
        status: "Resolved",
      }
    ];

    for (const c of contacts) {
      await sql`
        INSERT INTO contact_leads (type, name, email, phone, company, message, created_at, status)
        VALUES (${c.type}, ${c.name}, ${c.email}, ${c.phone}, ${c.company}, ${c.message}, ${c.created_at}, ${c.status})
      `;
    }
  }

  console.log("Migration and seeding complete!");
}

run().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
