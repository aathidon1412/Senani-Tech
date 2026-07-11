import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import loadingLogo from "@/assets/loading_logo.png";
import Index from "./pages/Index";
import SemiconductorServices from "./pages/SemiconductorServices";
import TechnologyServices from "./pages/TechnologyServices";
import SystemsSolutions from "./pages/SystemsSolutions";
import Portfolio from "./pages/Portfolio";
import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { WhatsAppBubble } from "./components/WhatsAppBubble";
import { GlobalInteractiveBackground } from "./components/effects/GlobalInteractiveBackground";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative w-28 h-28 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-[#545454]/10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-4 border-t-[#545454] border-r-transparent border-b-transparent border-l-transparent"
              />
              <img
                src={loadingLogo}
                alt="Loading"
                className="w-16 h-16 object-contain relative z-10"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTransitionWrapper>
          <GlobalInteractiveBackground />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/semiconductor-services" element={<SemiconductorServices />} />
            <Route path="/technology-services" element={<TechnologyServices />} />
            <Route path="/systems-solutions" element={<SystemsSolutions />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppBubble />
        </PageTransitionWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
