"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toaster";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange
    >
      <TooltipProvider delayDuration={200}>
        {children}
        <Toaster />
      </TooltipProvider>
    </ThemeProvider>
  );
};
