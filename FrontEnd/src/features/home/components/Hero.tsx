import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-[#E8F7F5] to-white py-12 sm:py-20 px-6 overflow-hidden">
      {/* Pharmacy Background Image with 70% Opacity */}
      <div
        className="absolute inset-0 opacity-70 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576602976047-174e57a47881?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-[#E8F7F5]/50 to-white/60"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="text-xs font-semibold text-[#1FAF9A] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                AI Clinical Decision Support
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E3B3B] leading-tight tracking-tight">
              PharmaTwin: AI-Powered Pharmacogenomic Prescription Safety
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed bg-white/70 backdrop-blur-sm p-4 rounded-lg">
              PharmaTwin analyzes patient pharmacogenomic variants and predicts
              medication response before therapy begins. The system translates
              raw sequencing data into actionable prescribing guidance aligned
              with established clinical guidelines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate("/analysis")}
                aria-label="Upload patient genome data"
                className="px-8 py-3 bg-[#1FAF9A] text-white font-semibold rounded-lg hover:bg-[#188f7d] transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1FAF9A] focus:ring-offset-2"
              >
                Upload Genome
              </button>
              <button
                onClick={() => navigate("/demo")}
                aria-label="View demonstration"
                className="px-8 py-3 border-2 border-[#1FAF9A] bg-white/80 backdrop-blur-sm text-[#1FAF9A] font-semibold rounded-lg hover:bg-[#E8F7F5] transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1FAF9A] focus:ring-offset-2"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Right Side - PharmaTwin Branding Card */}
          <div className="relative order-first lg:order-last animate-slide-in">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#1FAF9A]/20">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <img src={logo} alt="PharmaTwin Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-[#0E3B3B] mb-4">
                  PharmaTwin
                </h2>
                <p className="text-sm text-[#1FAF9A] font-semibold uppercase tracking-wide mb-6">
                  AI Clinical Decision Support
                </p>
                <div className="h-1 w-32 bg-gradient-to-r from-[#1FAF9A] to-[#188f7d] mx-auto rounded-full mb-6"></div>
                
                {/* Features */}
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E8F7F5] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">🧬</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0E3B3B]">
                        Precision Medicine
                      </p>
                      <p className="text-xs text-gray-600">
                        Genetic-guided prescribing
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E8F7F5] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">⚡</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0E3B3B]">
                        Instant Analysis
                      </p>
                      <p className="text-xs text-gray-600">
                        Real-time risk assessment
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#E8F7F5] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-lg">🎯</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0E3B3B]">
                        Clinical Guidelines
                      </p>
                      <p className="text-xs text-gray-600">
                        CPIC & FDA aligned
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg lg:hidden z-50 animate-slide-up">
        <button
          onClick={() => navigate("/analysis")}
          aria-label="Upload genome - mobile action"
          className="w-full px-6 py-3 bg-[#1FAF9A] text-white font-semibold rounded-lg hover:bg-[#188f7d] transition-all shadow-md active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1FAF9A]"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
