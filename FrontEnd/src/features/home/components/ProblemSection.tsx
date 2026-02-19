const ProblemSection = () => {
  const problems = [
    {
      title: "Same Drug ≠ Same Response",
      description:
        "Patients metabolize drugs differently due to genetic variation",
      icon: "⚠️",
    },
    {
      title: "Hidden Genetic Risks",
      description: "Clinicians cannot manually interpret genome data",
      icon: "🧬",
    },
    {
      title: "Preventable Adverse Events",
      description: "Incorrect prescriptions cause toxicity or treatment failure",
      icon: "🚨",
    },
  ];

  return (
    <section className="py-12 sm:py-20 px-6 bg-white relative overflow-hidden">
      {/* Background Clinical Image */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80')",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            The Challenge
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Traditional prescribing ignores genetic factors that determine drug
            response
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up focus-within:ring-2 focus-within:ring-[#1FAF9A]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl mb-4" aria-hidden="true">
                {problem.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0E3B3B] mb-3">
                {problem.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
