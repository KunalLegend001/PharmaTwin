const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload VCF",
      description: "Submit patient genomic data in standard VCF format",
    },
    {
      number: "02",
      title: "Detect Pharmacogenes",
      description: "AI identifies relevant genetic variants affecting drug metabolism",
    },
    {
      number: "03",
      title: "Predict Drug Risk",
      description: "System calculates risk levels for prescribed medications",
    },
    {
      number: "04",
      title: "Recommend Therapy",
      description: "Receive evidence-based dosing and alternative suggestions",
    },
  ];

  return (
    <section className="py-12 sm:py-20 px-6 bg-[#E8F7F5] relative overflow-hidden">
      {/* Background Lab Image */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80')",
          filter: "grayscale(100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Clinical-grade pharmacogenomic analysis in four steps
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full focus-within:ring-2 focus-within:ring-[#1FAF9A]">
                <div className="w-12 h-12 bg-[#1FAF9A] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 animate-pulse-slow">
                  {step.number}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0E3B3B] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#1FAF9A] opacity-30 animate-progress"
                  aria-hidden="true"
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
