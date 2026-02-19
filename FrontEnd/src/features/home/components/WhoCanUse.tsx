const WhoCanUse = () => {
  const users = [
    {
      icon: "👨‍⚕️",
      title: "Clinicians",
      description:
        "Physicians and pharmacists seeking pharmacogenomic decision support",
      color: "from-[#1FAF9A]/10 to-[#1FAF9A]/5",
    },
    {
      icon: "🔬",
      title: "Researchers",
      description:
        "Scientists studying drug-gene interactions and precision medicine",
      color: "from-blue-50 to-blue-25",
    },
    {
      icon: "🏥",
      title: "Hospitals",
      description:
        "Healthcare institutions implementing pharmacogenomic programs",
      color: "from-purple-50 to-purple-25",
    },
    {
      icon: "🎓",
      title: "Students",
      description:
        "Medical and pharmacy students learning pharmacogenomics principles",
      color: "from-orange-50 to-orange-25",
    },
  ];

  return (
    <section className="py-20 px-6 bg-[#E8F7F5] relative overflow-hidden">
      {/* Background Medical Team Image */}
      <div
        className="absolute inset-0 opacity-[0.08] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80')",
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0E3B3B] mb-4">
            Who Can Use PharmaTwin
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Designed for healthcare professionals, researchers, and educators
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${user.color} rounded-full flex items-center justify-center text-3xl mb-4`}
                aria-hidden="true"
              >
                {user.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0E3B3B] mb-2">
                {user.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {user.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoCanUse;
