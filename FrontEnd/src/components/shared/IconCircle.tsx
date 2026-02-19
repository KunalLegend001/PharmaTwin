import React from "react";

interface IconCircleProps {
  icon: React.ReactNode;
  bgColor?: string;
  size?: string;
}

const IconCircle: React.FC<IconCircleProps> = ({
  icon,
  bgColor = "bg-primary",
  size = "w-12 h-12",
}) => {
  return (
    <div className={`relative ${size} flex items-center justify-center`}>
      <div
        className={`absolute inset-0 rounded-full ${bgColor} opacity-30`}
      />
      <div className="relative z-10">{icon}</div>
    </div>
  );
};

export default IconCircle;
