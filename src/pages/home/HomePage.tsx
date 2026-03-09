
import CardToLife from "@/components/modules/home/CardToLife";
import MyBestSellers from "@/components/modules/home/MyBestSellers";
import FinancialSafety from "@/components/modules/home/FinancialSafety";
import HeroSection from "@/components/modules/home/heroSection/HeroSection";
import FeaturedSection from "@/components/modules/home/FeaturedSection/Featured";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <CardToLife />
      <MyBestSellers />
      <FinancialSafety />
    </div>
  );
}