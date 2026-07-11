import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { portfolioSlides } from "@/data/portfolio-slides";

export default function Portfolio() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = portfolioSlides.length;
  const currentSlide = portfolioSlides[currentIdx];

  // Continuous Auto-play timer (pauses on hover/hold)
  useEffect(() => {
    if (!isPaused) {
      playTimerRef.current = setInterval(() => {
        setCurrentIdx((prev) => (prev + 1) % totalSlides);
      }, 4000); // 4 seconds per slide
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPaused, totalSlides]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSlides]);

  const nextSlide = () => setCurrentIdx((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 pb-16">
        {/* Main Presentation Showcase View */}
        <section className="container mx-auto px-4 mt-2">
          <div className="max-w-5xl mx-auto">
            <div 
              className="relative flex flex-col justify-between group w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onMouseDown={() => setIsPaused(true)}
              onMouseUp={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* Hover status indicator */}
              <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 pointer-events-none ${
                isPaused ? "bg-primary/20 text-primary backdrop-blur-md opacity-100" : "opacity-0"
              }`}>
                Paused on Hover
              </div>

              {/* Slide PNG Image Canvas Display with stack animation */}
              <div className="flex-1 flex items-center justify-center relative z-10 min-h-[500px] sm:min-h-[720px] overflow-hidden py-4">
                
                {/* Floating Side Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/95 dark:bg-black/60 hover:bg-white dark:hover:bg-black/85 text-foreground dark:text-white backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg border border-border/40 hover:scale-105 active:scale-95 animate-fade-in"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/95 dark:bg-black/60 hover:bg-white dark:hover:bg-black/85 text-foreground dark:text-white backdrop-blur-md transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg border border-border/40 hover:scale-105 active:scale-95 animate-fade-in"
                  aria-label="Next slide"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="relative w-full max-w-7xl h-[65vh] sm:h-[80vh] flex items-center justify-center">
                  <AnimatePresence>
                    {[2, 1, 0].map((offset) => {
                      const idx = (currentIdx + offset) % totalSlides;
                      const slide = portfolioSlides[idx];
                      if (!slide) return null;
                      const isTop = offset === 0;

                      return (
                        <motion.div
                          key={slide.id}
                          style={{
                            position: "absolute",
                            zIndex: 10 - offset,
                            width: "100%",
                            height: "100%",
                          }}
                          initial={isTop ? { x: 300, opacity: 0, rotate: 10, scale: 0.95 } : false}
                          animate={{
                            x: 0,
                            scale: 1 - offset * 0.04,
                            y: offset * 12,
                            opacity: offset === 2 ? 0.35 : 1 - offset * 0.3,
                            rotate: isTop ? 0 : offset === 1 ? -1.5 : 1.5,
                            pointerEvents: isTop ? "auto" : "none",
                          }}
                          exit={{
                            x: -400,
                            opacity: 0,
                            rotate: -12,
                            scale: 0.9,
                            transition: { duration: 0.35, ease: "easeInOut" }
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                          }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={`/slides/Slide${slide.id}.PNG`}
                            alt={slide.title}
                            className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl bg-white dark:bg-card border border-border/10"
                            onError={(e) => {
                              // Fallback if image path case varies
                              const target = e.target as HTMLImageElement;
                              if (!target.src.endsWith(".png")) {
                                target.src = `/slides/Slide${slide.id}.png`;
                              }
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Footer Controls Navigation Bar */}
              <div className="p-4 md:p-6 bg-card border border-border/85 rounded-3xl shadow-xl flex items-center justify-between gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="px-4 py-2.5 rounded-xl bg-muted/80 border border-border/80 text-foreground font-semibold text-xs sm:text-sm hover:border-primary flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                {/* Progress Indicators & Count */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <span className="text-xs font-bold text-foreground/80">
                    Slide <span className="text-primary font-extrabold">{currentIdx + 1}</span> of {totalSlides}
                  </span>
                  <div className="hidden md:flex items-center gap-1.5 overflow-x-auto max-w-xs px-2 py-1">
                    {portfolioSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIdx(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentIdx ? "w-6 bg-primary" : "w-2 bg-border hover:bg-foreground/40"
                        }`}
                        title={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary-hover flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="container mx-auto px-4 mt-16">
          <div className="max-w-5xl mx-auto rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 flex-1">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                Partner with SenaniTech for Your Next Hardware Innovation
              </h2>
              <p className="text-sm md:text-base text-foreground/80 max-w-2xl">
                Our engineering team is ready to deliver customized PCB design, ATE board engineering, and turnkey EMS solutions.
              </p>
            </div>
            <Link to="/contact" className="relative z-10 flex-shrink-0 w-full md:w-auto">
              <Button variant="hero" size="lg" className="w-full md:w-auto px-8 py-6 text-base gap-3 rounded-xl">
                Get in Touch <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
