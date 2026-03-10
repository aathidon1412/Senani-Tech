import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import capImg1 from "@/assets/comprehensive_capablities/1.png";
import capImg2 from "@/assets/comprehensive_capablities/2.png";
import capImg3 from "@/assets/comprehensive_capablities/3.png";
import capImg4 from "@/assets/comprehensive_capablities/4.png";
import capImg5 from "@/assets/comprehensive_capablities/5.png";
import capImg6 from "@/assets/comprehensive_capablities/6.png";
import capImg7 from "@/assets/comprehensive_capablities/7.png";

const capabilities = [
  { img: capImg1, title: "Hardware Design", description: "Schematic & PCB layout" },
  { img: capImg2, title: "Simulations", description: "SI/PI analysis" },
  { img: capImg3, title: "Embedded Software", description: "Firmware & drivers" },
  { img: capImg4, title: "FPGA Design", description: "RTL development" },
  { img: capImg5, title: "Bring-up & Validation", description: "Testing & debugging" },
  { img: capImg6, title: "Thermal Analysis", description: "Thermal management" },
  { img: capImg7, title: "Production Build", description: "Manufacturing support" },
];

const SystemsSolutions = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const capRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const capInView = useInView(capRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-highlight/10 via-background to-background" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-6">
                Systems Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                End-to-End Product{" "}
                <span className="gradient-text-bright">Lifecycle Partnership</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                From concept to production — an integrated approach that minimizes cost,
                saves time, and reduces miscommunication
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Partner With Us
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section ref={capRef} className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={capInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Comprehensive <span className="gradient-text-bright">Capabilities</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                All disciplines under one roof for seamless product development
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={capInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 rounded-2xl card hover:-translate-y-1 hover:bg-card/80 transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <img src={cap.img} alt={cap.title} className="w-full h-full object-contain" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-highlight transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-display font-bold mb-8">
                The <span className="gradient-text-bright">Integrated</span> Advantage
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Minimizes Cost", description: "Single partner, streamlined process" },
                  { label: "Saves Time", description: "Parallel development streams" },
                  { label: "Reduces Risk", description: "Seamless communication" },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl card"
                  >
                    <div className="text-2xl font-display font-bold gradient-text-bright mb-2">
                      {benefit.label}
                    </div>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to start your product journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let's discuss how our integrated approach can accelerate your development
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Start a Conversation
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SystemsSolutions;