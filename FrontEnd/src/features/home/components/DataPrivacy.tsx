const DataPrivacy = () => {
  const features = [
    {
      icon: "🔒",
      title: "No Patient Storage",
      description: "Genomic data is never permanently stored on our servers",
    },
    {
      icon: "⚡",
      title: "Temporary Processing",
      description: "Files are processed in memory and deleted after analysis",
    },
    {
      icon: "🔬",
      title: "Research-Only Prototype",
      description: "This system is for research and educational purposes only",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white relative overflow-hidden">
      {/* Background Security/Technology Image */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            Data Privacy & Safety
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your data security is our priority
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#E8F7F5] to-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0E3B3B] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-gray-300">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800 text-center">
                <span className="font-semibold">Important:</span> This is a
                research prototype. Do not use for actual clinical decisions
                without validation by qualified healthcare professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataPrivacy;
