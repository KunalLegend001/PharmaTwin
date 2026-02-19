import Logo from "@/components/shared/Logo";

const HomeFooter = () => {
  const links = [
    { name: "About", href: "/about" },
    { name: "Documentation", href: "/docs" },
    { name: "Clinical Disclaimer", href: "/disclaimer" },
  ];

  return (
    <footer className="bg-[#0E3B3B] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Logo />
              <span className="text-xl font-bold">PharmaTwin</span>
            </div>
            <p className="text-gray-300 text-sm">
              AI-Powered Pharmacogenomic Prescription Safety
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-wrap gap-6 md:justify-end items-start">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-300 hover:text-[#1FAF9A] transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            This system provides decision support and does not replace clinical
            judgment.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            © {new Date().getFullYear()} PharmaTwin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
