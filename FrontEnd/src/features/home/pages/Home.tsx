import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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
import BackgroundGradient from "@/components/shared/GradientBg";
import Header from "@/components/shared/Header";
import { Separator } from "@/components/ui/separator";


const zoomVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 18,
    },
  },
};

interface AnimatedSectionProps {
  children: ReactNode;
}

const AnimatedSection = ({ children }: AnimatedSectionProps) => (
  <motion.div
    variants={zoomVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <>
    <Header title="Home" />
    <Separator />
    <div className="min-h-screen bg-white space-y-20">
      
      <BackgroundGradient/>
      <AnimatedSection><Hero /></AnimatedSection>
      <AnimatedSection><ProblemSection /></AnimatedSection>
      <AnimatedSection><WhyPharmacogenomics /></AnimatedSection>
      <AnimatedSection><HowItWorks /></AnimatedSection>
      <AnimatedSection><SupportedDrugs /></AnimatedSection>
      <AnimatedSection><ClinicalWorkflow /></AnimatedSection>
      <AnimatedSection><DataPrivacy /></AnimatedSection>
      <AnimatedSection><WhoCanUse /></AnimatedSection>
      <AnimatedSection><ClinicalTrust /></AnimatedSection>
      <AnimatedSection><HomeFooter /></AnimatedSection>
    </div>
    </>
  );
};

export default Home;
