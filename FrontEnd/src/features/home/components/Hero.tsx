import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-[#E8F7F5] to-white py-12 sm:py-20 px-6 overflow-hidden">
      {/* Background DNA Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80')",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E3B3B] leading-tight tracking-tight">
              AI-Powered Pharmacogenomic Prescription Safety
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Prevent adverse drug reactions using patient genetics before
              prescribing medication.
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
                className="px-8 py-3 border-2 border-[#1FAF9A] text-[#1FAF9A] font-semibold rounded-lg hover:bg-[#E8F7F5] transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1FAF9A] focus:ring-offset-2"
              >
                View Demo
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative order-first lg:order-last">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 animate-slide-in">
              <div className="aspect-square bg-gradient-to-br from-[#E8F7F5] to-[#1FAF9A]/10 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* DNA Helix SVG */}
                <svg
                  className="w-48 h-48 sm:w-64 sm:h-64 text-[#1FAF9A] opacity-20 animate-pulse-slow"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2L12 22M8 6C8 6 10 8 12 8C14 8 16 6 16 6M8 12C8 12 10 14 12 14C14 14 16 12 16 12M8 18C8 18 10 20 12 20C14 20 16 18 16 18" />
                  <circle cx="8" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="8" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="8" cy="18" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="18" r="1.5" fill="currentColor" />
                </svg>
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse delay-75"></div>
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
