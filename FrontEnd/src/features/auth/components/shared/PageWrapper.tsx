import type { JSX } from "react";
import Image from "./Image";
import Title from "./Title";

interface PageWrapperProps {
  form: JSX.Element;
}

const PageWrapper = ({ form }: PageWrapperProps) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col gap-4 p-6 md:p-10 col-span-2">
        <div className="flex gap-2 justify-start">
          <Title />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{form}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image />
      </div>
    </div>
  );
};

export default PageWrapper;
