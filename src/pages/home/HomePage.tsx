import HeroSection from "@/components/modules/home/HeroSection";
import Featured from "@/components/modules/home/Featured";
import FinancialSafety from "@/components/modules/home/FinancialSafety";
import CardToLife from "@/components/modules/home/CardToLife";

export default function HomePage() {
  return (
    <div>
   <HeroSection/>
   <Featured/>
   <CardToLife/>
  <FinancialSafety/>
    </div>
  )
}