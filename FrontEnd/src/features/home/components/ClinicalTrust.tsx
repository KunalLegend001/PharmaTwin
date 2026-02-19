const ClinicalTrust = () => {
  const badges = [
    { name: "CPIC", description: "Clinical Pharmacogenetics Implementation Consortium" },
    { name: "PharmGKB", description: "Pharmacogenomics Knowledge Base" },
    { name: "FDA Biomarker", description: "FDA Table of Pharmacogenomic Biomarkers" },
    { name: "HL7 FHIR", description: "Health Level 7 FHIR Compatible" },
  ];

  return (
    <section className="py-20 px-6 bg-[#E8F7F5] relative overflow-hidden">
      {/* Background Clinical Standards Image */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-10 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#0E3B3B] mb-4">
              Clinical Trust & Standards
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Based on established clinical pharmacogenomics guidelines from
              leading medical authorities
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="text-center p-4 bg-[#E8F7F5] rounded-lg hover:bg-[#1FAF9A]/10 transition-colors"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <span className="text-[#1FAF9A] font-bold text-sm">
                    {badge.name.split(" ")[0]}
                  </span>
                </div>
                <h3 className="font-bold text-[#0E3B3B] text-sm mb-1">
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500 italic">
              "This system provides decision support and does not replace
              clinical judgment."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalTrust;
