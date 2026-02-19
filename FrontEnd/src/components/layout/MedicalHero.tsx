import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeInUp, fadeInDown } from "@/features/animations/fadeVariants";
import { slideInLeft, slideInRight } from "@/features/animations/slideVariants";
import { scaleIn } from "@/features/animations/staggerVariants";

const MedicalHero = () => {
  return (
    <section className="relative min-h-screen pt-12 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#F8FAFC] to-white">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 lg:w-96 lg:h-96 bg-[#0F2D52] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 lg:w-64 lg:h-64 bg-[#2EC4B6] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6 z-10 order-2 lg:order-1"
          >
            <motion.div
              variants={fadeInDown}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#2EC4B6]/10 text-[#2EC4B6] rounded-full text-xs sm:text-sm font-semibold">
                Welcome to PharmaTwin
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F2D52] leading-tight"
            >
              Best Medical & Healthcare Service{" "}
              <span className="text-[#2EC4B6]">For Your Family</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed"
            >
              PharmaTwin provides AI-powered pharmacogenomic analysis to ensure
              safer medication prescriptions. Our advanced clinical decision
              support system helps healthcare professionals deliver personalized
              treatment based on patient genetics.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(46, 196, 182, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#2EC4B6] text-white font-semibold rounded-full hover:bg-[#26a89c] transition-all shadow-lg text-sm sm:text-base"
              >
                Contact Us
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#0F2D52] text-[#0F2D52] font-semibold rounded-full hover:bg-[#0F2D52] hover:text-white transition-all text-sm sm:text-base"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8"
            >
              {[
                { number: "500+", label: "Patients" },
                { number: "50+", label: "Doctors" },
                { number: "99%", label: "Success Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-[#0F2D52]">
                    {stat.number}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative order-1 lg:order-2"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80"
                  alt="Professional doctor smiling"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D52]/20 to-transparent"></div>
              </div>

              {/* Floating Play Button Card */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                    <Play className="text-2xl sm:text-3xl text-[#2EC4B6] ml-1" fill="#2EC4B6" />
                  </div>
                  {/* Pulse Animation */}
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-white rounded-full"
                  ></motion.div>
                </div>
              </motion.div>

              {/* Floating Info Cards - Hidden on mobile */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="hidden md:block absolute top-10 -left-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 max-w-[180px] sm:max-w-[200px]"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2EC4B6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">💊</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F2D52]">
                      Safe Prescriptions
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">AI-Powered</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="hidden md:block absolute bottom-10 -right-6 bg-white rounded-2xl shadow-xl p-3 sm:p-4 max-w-[180px] sm:max-w-[200px]"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0F2D52]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl sm:text-2xl">🧬</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F2D52]">
                      Genetic Analysis
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Personalized</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#2EC4B6]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 sm:w-64 sm:h-64 bg-[#0F2D52]/5 rounded-full blur-3xl pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MedicalHero;
