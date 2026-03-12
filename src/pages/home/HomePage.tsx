
import MyBestSellers from "@/components/modules/home/MyBestSellers";
import FinancialSafety from "@/components/modules/home/FinancialSafety";
import HeroSection from "@/components/modules/home/heroSection/HeroSection";
import FeaturedSection from "@/components/modules/home/FeaturedSection/Featured";
import CardLIfecycle from "@/components/modules/home/HowItWorks/CardLIfecycle";


export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <CardLIfecycle />
      <MyBestSellers />
      <FinancialSafety />
    </div>
  );
}