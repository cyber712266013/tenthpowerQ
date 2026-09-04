import { Helmet } from "react-helmet-async";
import HeroSection from "../components/sections/Hero";
import AboutSection from "../components/sections/About";
import ServicesSection from "../components/sections/Services";
import ProjectsSection from "../components/sections/Projects";
import GallerySection from "../components/sections/Gallery";
import WhyUsSection from "../components/sections/WhyUs";
import ContactSection from "../components/sections/Contact";

export default function CatalogPage() {
  return (
    <>
      <Helmet>
        <title>القوة العاشرة | الكتالوج الإلكتروني المؤسسي</title>
        <meta
          name="description"
          content="مؤسسة القوة العاشرة للمقاولات العامة — كتالوج مؤسسي شامل يضم خدماتنا وأعمالنا في البناء والتشطيبات والبنية التحتية. جدة، المملكة العربية السعودية."
        />
        <meta property="og:title" content="القوة العاشرة | الكتالوج الإلكتروني المؤسسي" />
        <meta property="og:description" content="مؤسسة القوة العاشرة للمقاولات العامة — خبرة في البناء والتشطيبات والبنية التحتية." />
        <meta property="og:image" content="/icons/app_logo_round.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <link rel="canonical" href="/" />
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <GallerySection />
      <WhyUsSection />
      <ContactSection />
    </>
  );
}
