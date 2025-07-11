
// src/components/Index.tsx
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
// Assuming TestimonialsSection is also a static component
import TestimonialsSection from "@/components/TestimonialsSection";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProductsSection />
      <TestimonialsSection />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
