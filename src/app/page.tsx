import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { seoFaqs } from "@/lib/data";

// FAQPage structured data — kept in sync with the visible <FAQ /> section below
// (Google requires the answer text to appear on the page). Lives on the home
// route only, where the FAQ is actually rendered.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: seoFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* Overlay & chrome components */}
      <LoadingScreen />
      <ScrollProgress />

      {/* Layout */}
      <Navbar />

      <main>
        <Hero />
        <About />
        {/* Freelance: what I offer, shown right after the intro */}
        <Services />
        <TechStack />
        <Projects />
        <Experience />
        {/* Freelance: social proof before the contact CTA */}
        <Testimonials />
        {/* SEO: real, crawlable Q&A backing the FAQPage structured data */}
        <FAQ />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
