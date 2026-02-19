import { motion, AnimatePresence } from "framer-motion";
import { X, Home, Shield, MapPin, MessageCircle, Clock } from "lucide-react";
import { slideFromLeft } from "@/features/animations/slideVariants";
import Logo from "@/components/shared/Logo";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: "Home", href: "#home" },
    { icon: Shield, label: "Analysis", href: "#analysis" },
    { icon: MapPin, label: "Nearby pharmacy", href: "#pharmacy" },
    { icon: MessageCircle, label: "Support", href: "#support" },
    { icon: Clock, label: "History", href: "#history" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="text-2xl font-bold text-[#0F2D52]">
                  PharmaTwin
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="text-xl text-gray-600" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-6">
              <nav className="space-y-1">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      onClick={onClose}
                      className="flex items-center gap-4 px-4 py-4 rounded-lg hover:bg-gray-50 text-gray-700 hover:text-[#0F2D52] transition-all group"
                    >
                      <Icon className="text-2xl text-gray-600 group-hover:text-[#0F2D52] transition-colors" size={24} />
                      <span className="font-medium text-base">{item.label}</span>
                    </motion.a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Buttons */}
            <div className="p-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all">
                  Signup
                </button>
                <button className="px-6 py-3 bg-[#0F2D52] text-white font-semibold rounded-lg hover:bg-[#1a4570] transition-all">
                  Login
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
