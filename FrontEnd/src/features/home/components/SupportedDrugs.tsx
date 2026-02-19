import { useState } from "react";

interface DrugInfo {
  name: string;
  gene: string;
  category: string;
  risk: string;
  consequence: string;
  recommendation: string;
}

const SupportedDrugs = () => {
  const [hoveredDrug, setHoveredDrug] = useState<string | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);

  const drugs: DrugInfo[] = [
    {
      name: "Codeine",
      gene: "CYP2D6",
      category: "Analgesic",
      risk: "Toxicity in ultra-rapid metabolizers",
      consequence: "Respiratory depression",
      recommendation: "Avoid or use non-opioid alternative",
    },
    {
      name: "Warfarin",
      gene: "CYP2C9, VKORC1",
      category: "Anticoagulant",
      risk: "Bleeding",
      consequence: "Excess anticoagulation",
      recommendation: "Dose reduction required",
    },
    {
      name: "Clopidogrel",
      gene: "CYP2C19",
      category: "Antiplatelet",
      risk: "Ineffective therapy",
      consequence: "Stent thrombosis",
      recommendation: "Use alternative antiplatelet",
    },
    {
      name: "Simvastatin",
      gene: "SLCO1B1",
      category: "Statin",
      risk: "Myopathy",
      consequence: "Muscle toxicity",
      recommendation: "Lower dose or alternate statin",
    },
    {
      name: "Azathioprine",
      gene: "TPMT, NUDT15",
      category: "Immunosuppressant",
      risk: "Severe myelosuppression",
      consequence: "Bone marrow toxicity",
      recommendation: "Drastic dose reduction",
    },
    {
      name: "Fluorouracil",
      gene: "DPYD",
      category: "Chemotherapy",
      risk: "Life-threatening toxicity",
      consequence: "Chemotherapy toxicity",
      recommendation: "Avoid or reduce dose",
    },
  ];

  const isActive = (drugName: string) =>
    hoveredDrug === drugName || selectedDrug === drugName;

  const handleCardClick = (drugName: string) => {
    setSelectedDrug(selectedDrug === drugName ? null : drugName);
  };

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background Pharmacy/Pills Image */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            Supported Medications
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Evidence-based pharmacogenomic guidance for high-risk drugs
          </p>
        </div>

        {/* Desktop & Tablet Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drugs.map((drug, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${drug.name}`}
              className={`relative bg-white border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1FAF9A] focus:ring-offset-2 ${
                isActive(drug.name)
                  ? "border-[#1FAF9A] shadow-xl -translate-y-2 bg-gradient-to-br from-white to-[#E8F7F5]"
                  : "border-gray-200 hover:border-[#1FAF9A] hover:shadow-lg hover:-translate-y-1"
              }`}
              onMouseEnter={() => setHoveredDrug(drug.name)}
              onMouseLeave={() => setHoveredDrug(null)}
              onClick={() => handleCardClick(drug.name)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCardClick(drug.name);
                }
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-[#0E3B3B]">
                  {drug.name}
                </h3>
                <span className="text-xs bg-[#E8F7F5] text-[#1FAF9A] px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                  {drug.category}
                </span>
              </div>

              {/* Expanded Info Panel */}
              <div
                className={`transition-all duration-300 ease-in-out ${
                  isActive(drug.name)
                    ? "opacity-100 max-h-96"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Gene
                    </p>
                    <p className="text-sm text-[#0E3B3B] font-medium">
                      {drug.gene}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Risk if Untreated
                    </p>
                    <p className="text-sm text-[#E74C3C] font-medium">
                      {drug.risk}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Clinical Consequence
                    </p>
                    <p className="text-sm text-gray-700">{drug.consequence}</p>
                  </div>

                  <div className="bg-[#E8F7F5] rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-[#1FAF9A] uppercase tracking-wide mb-1">
                      CPIC Recommendation
                    </p>
                    <p className="text-sm text-[#0E3B3B] font-medium">
                      {drug.recommendation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Collapsed State Hint */}
              {!isActive(drug.name) && (
                <p className="text-xs text-gray-400 mt-2">
                  Click to view details
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6">
          <div className="flex gap-4 pb-4">
            {drugs.map((drug, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${drug.name}`}
                className="flex-shrink-0 w-[85vw] bg-white border-2 border-gray-200 rounded-xl p-6 snap-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#1FAF9A]"
                onClick={() => handleCardClick(drug.name)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(drug.name);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#0E3B3B]">
                    {drug.name}
                  </h3>
                  <span className="text-xs bg-[#E8F7F5] text-[#1FAF9A] px-2 py-1 rounded-full font-semibold">
                    {drug.category}
                  </span>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Gene
                    </p>
                    <p className="text-sm text-[#0E3B3B] font-medium">
                      {drug.gene}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Risk if Untreated
                    </p>
                    <p className="text-sm text-[#E74C3C] font-medium">
                      {drug.risk}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Clinical Consequence
                    </p>
                    <p className="text-sm text-gray-700">{drug.consequence}</p>
                  </div>

                  <div className="bg-[#E8F7F5] rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold text-[#1FAF9A] uppercase tracking-wide mb-1">
                      CPIC Recommendation
                    </p>
                    <p className="text-sm text-[#0E3B3B] font-medium">
                      {drug.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-8 sm:hidden">
          Swipe to explore more medications →
        </p>
      </div>
    </section>
  );
};

export default SupportedDrugs;
