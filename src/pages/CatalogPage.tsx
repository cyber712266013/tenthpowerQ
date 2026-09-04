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
        <title>مؤسسة القوة العاشرة للمقاولات والتجارة العامة</title>
        <meta
          name="description"
          content="مؤسسة القوة العاشرة للمقاولات والتجارة العامة — كتالوج مؤسسي شامل يضم خدماتنا وأعمالنا في الزجاج السكريت، الواجهات المعمارية، وقطاعات الألمنيوم. الرياض، المملكة العربية السعودية."
        />
        <meta property="og:title" content="مؤسسة القوة العاشرة للمقاولات والتجارة العامة" />
        <meta
          property="og:description"
          content="إبداع الزجاج والألمنيوم ودقة المقاولات العامة. تصفح الكتالوج الإلكتروني وسابقة الأعمال."
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_SA" />
        <link rel="canonical" href="/" />
      </Helmet>

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyUsSection />
      <GallerySection />
      <ContactSection />
    </>
  );
}
