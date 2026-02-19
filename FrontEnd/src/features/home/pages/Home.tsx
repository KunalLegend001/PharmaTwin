import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import HowItWorks from "../components/HowItWorks";
import SupportedDrugs from "../components/SupportedDrugs";
import ClinicalTrust from "../components/ClinicalTrust";
import HomeFooter from "../components/HomeFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <SupportedDrugs />
      <ClinicalTrust />
      <HomeFooter />
    </div>
  );
};

export default Home;
