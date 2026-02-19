const ClinicalWorkflow = () => {
  const steps = [
    {
      number: "1",
      title: "Doctor Orders Test",
      description: "Clinician identifies patient requiring pharmacogenomic guidance",
    },
    {
      number: "2",
      title: "Upload Genome",
      description: "VCF file from sequencing lab uploaded to PharmaTwin",
    },
    {
      number: "3",
      title: "Evaluate Therapy",
      description: "AI analyzes variants and generates risk predictions",
    },
    {
      number: "4",
      title: "Safer Prescription",
      description: "Evidence-based recommendations guide medication selection",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#E8F7F5] relative overflow-hidden">
      {/* Background Hospital Workflow Image */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            Clinical Workflow Integration
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Seamlessly integrate pharmacogenomic analysis into existing clinical
            practice
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div
            className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-[#1FAF9A] opacity-20"
            aria-hidden="true"
          ></div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-white border-4 border-[#1FAF9A] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-3xl font-bold text-[#1FAF9A]">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#0E3B3B] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalWorkflow;
