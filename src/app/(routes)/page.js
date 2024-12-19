import Hero from "@/components/Hero";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import SpecialOffer from "@/components/SpecialOffer";
import Faq from '@/components/Faq';
import WeekOffer from "@/components/WeekOffer";
import Chefs from "@/components/Chefs";


export default function Home() {
  return (
    <div className="bg-light-background dark:bg-dark-background px-4 md:px-12">
    
      <Hero />
      <BestSellers />
      <WhyUs />
      <SpecialOffer />
      <Faq />
      <WeekOffer />
      <Chefs />
      
    </div>
  )
}
