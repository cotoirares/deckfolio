import React from "react";
import { cn } from "@/lib/utils";

interface SlideLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SlideLayout: React.FC<SlideLayoutProps> = ({ children, className }) => {
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden no-scrollbar">
      <div className={cn("w-full max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-24 min-h-full flex flex-col justify-center", className)}>
        {children}
      </div>
    </div>
  );
};

