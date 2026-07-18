import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Sparkles, ArrowLeft } from "lucide-react";

export default function Blogs() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-highlight/10 blur-[130px]" />
        <div className="absolute inset-0 circuit-pattern opacity-[0.03]" />
      </div>

      <main className="flex-1 flex items-center justify-center pt-32 pb-20 relative z-10 px-4">
        <div className="max-w-xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex p-4 rounded-3xl bg-secondary/30 backdrop-blur-md border border-border/40 shadow-2xl mb-8 relative"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-highlight/30 flex items-center justify-center">
              <BookOpen size={32} className="text-highlight" />
            </div>
            <motion.div 
              className="absolute -top-1 -right-1 bg-highlight text-highlight-foreground p-1 rounded-full"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Sparkles size={14} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full card text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-4">
              Under Construction
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">
              Something <span className="gradient-text-bright">Exciting</span> is Brewing!
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
              We are crafting high-quality insights on semiconductor technology and system solutions. Check back soon for our latest articles!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/">
              <Button variant="outline" size="lg" className="rounded-xl group hover:border-primary/50 transition-all duration-300">
                <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="hero" size="lg" className="rounded-xl shadow-lg shadow-primary/20">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
