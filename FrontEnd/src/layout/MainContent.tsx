import type { ReactElement } from "react";

const MainContent = ({ children }: { children: ReactElement }) => {
  return (
    <div className="h-screen overflow-y-auto px-2 w-full ">
      {children}
    </div>
  );
};

export default MainContent;