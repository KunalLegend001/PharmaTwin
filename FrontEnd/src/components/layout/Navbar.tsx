import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Phone, Mail } from "lucide-react";
import Logo from "@/components/shared/Logo";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "About", "Services", "Appointment", "Pages", "Blog", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <Menu className="text-2xl text-[#0F2D52]" />
            </button>
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-xl font-bold text-[#0F2D52]">
                PharmaTwin
              </span>
            </div>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-gray-700 hover:text-[#2EC4B6] font-medium transition-colors relative group"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2EC4B6] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Right: Contact Info + Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="text-[#2EC4B6]" size={18} />
                <span className="hidden xl:inline">info@pharmatwin.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="text-[#2EC4B6]" size={18} />
                <span className="hidden xl:inline">+1 (555) 123-4567</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:block px-6 py-2.5 bg-[#2EC4B6] text-white font-semibold rounded-full hover:bg-[#26a89c] transition-colors shadow-md hover:shadow-lg"
            >
              Make Appointment
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
