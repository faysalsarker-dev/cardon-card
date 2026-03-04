import HeroSection from "@/components/modules/home/HeroSection";
import Featured from "@/components/modules/home/Featured";
import CardToLife from "@/components/modules/home/CardToLife";
import MyBestSellers from "@/components/modules/home/MyBestSellers";
import FinancialSafety from "@/components/modules/home/FinancialSafety";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <Featured />
      <CardToLife />
      <MyBestSellers />
      <FinancialSafety />
    </div>
  );
}