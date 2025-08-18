import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";
import TabletMobileView from "@/components/TabletMobileView";
import WhySection from "@/components/WhySection";
import PricingSection from "@/components/PricingSection";
import Testimonials from "@/components/Testimonials";
import OurSocialsSection from "@/components/OurSocialsSection";
import VideoLib from "@/components/VideoLib";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TabletMobileView />
      <AnimatedSection />
      <WhySection />
      <PricingSection />
      <Testimonials />
      <OurSocialsSection />
      <VideoLib />
      <ContactSection />
    </>
  );
}
