import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import loadingLogo from "@/assets/loading_logo.webp";
import { WhatsAppBubble } from "./components/WhatsAppBubble";
import { GlobalInteractiveBackground } from "./components/effects/GlobalInteractiveBackground";

const Index = lazy(() => import("./pages/Index"));
const SemiconductorServices = lazy(() => import("./pages/SemiconductorServices"));
const TechnologyServices = lazy(() => import("./pages/TechnologyServices"));
const SystemsSolutions = lazy(() => import("./pages/SystemsSolutions"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Blogs = lazy(() => import("./pages/Blogs"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimalist fallback loading state
const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-background/30 backdrop-blur-xs z-[999]">
    <div className="flex flex-col items-center gap-2">
      <div className="w-6 h-6 rounded-full border-2 border-primary/10 border-t-primary animate-spin" />
      <span className="text-xs font-medium text-muted-foreground animate-pulse">Loading...</span>
    </div>
  </div>
);

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
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 144 144">
                <rect
                  x="4"
                  y="4"
                  width="136"
                  height="136"
                  fill="none"
                  stroke="#545454"
                  strokeWidth="4"
                  className="opacity-10"
                />
                <motion.rect
                  x="4"
                  y="4"
                  width="136"
                  height="136"
                  fill="none"
                  stroke="#545454"
                  strokeWidth="4"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </svg>
              <img
                src={loadingLogo}
                alt="Loading"
                className="w-[94.4%] h-[94.4%] object-contain relative z-10"
                loading="lazy"
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
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
          <WhatsAppBubble />
        </PageTransitionWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
