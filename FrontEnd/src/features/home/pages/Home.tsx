import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import WhyPharmacogenomics from "../components/WhyPharmacogenomics";
import HowItWorks from "../components/HowItWorks";
import SupportedDrugs from "../components/SupportedDrugs";
import ClinicalWorkflow from "../components/ClinicalWorkflow";
import DataPrivacy from "../components/DataPrivacy";
import WhoCanUse from "../components/WhoCanUse";
import ClinicalTrust from "../components/ClinicalTrust";
import HomeFooter from "../components/HomeFooter";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProblemSection />
      <WhyPharmacogenomics />
      <HowItWorks />
      <SupportedDrugs />
      <ClinicalWorkflow />
      <DataPrivacy />
      <WhoCanUse />
      <ClinicalTrust />
      <HomeFooter />
    </div>
  );
};

export default Home;
