import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Zap, 
  Layers, 
  Code2, 
  Factory,
  ArrowRight,
  Check
} from "lucide-react";

const simulationServices = [
  {
    icon: Activity,
    title: "Signal Integrity",
    description: "Comprehensive SI analysis ensuring reliable high-speed signal transmission",
    capabilities: [
      "Pre-layout SI simulation",
      "Post-layout analysis",
      "S-parameter extraction",
      "Eye diagram analysis",
      "Crosstalk analysis",
      "Timing analysis"
    ]
  },
  {
    icon: Zap,
    title: "Power Integrity",
    description: "Power distribution network optimization for stable power delivery",
    capabilities: [
      "DC IR drop analysis",
      "AC impedance analysis",
      "Decoupling optimization",
      "PDN modeling",
      "Transient analysis",
      "Voltage regulator placement"
    ]
  }
];

const additionalServices = [
  {
    icon: Layers,
    title: "Substrate Design",
    description: "Advanced substrate and interposer design for high-density packaging"
  },
  {
    icon: Code2,
    title: "Embedded Software",
    description: "Firmware and embedded software development for your products"
  },
  {
    icon: Factory,
    title: "Manufacturing Support",
    description: "From prototype to production with quality assurance"
  }
];

const TechnologyServices = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const simRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const simInView = useInView(simRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-6">
                Technology Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Integrated <span className="gradient-text-bright">Engineering & Manufacturing</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                From simulation to prototype to validation — comprehensive technology services
                that accelerate your product development
              </p>
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Start a Project
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Simulation Services */}
        <section ref={simRef} className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={simInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Simulation <span className="gradient-text-bright">Excellence</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Industry-leading signal and power integrity analysis to ensure first-pass success
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {simulationServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={simInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className="p-8 rounded-2xl card"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                      <service.icon size={28} className="text-highlight" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {service.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                        <Check size={14} className="text-highlight flex-shrink-0" />
                        <span className="text-sm text-foreground">{cap}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Additional <span className="gradient-text-bright">Services</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl card text-center hover:-translate-y-1 transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <service.icon size={28} className="text-highlight" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Let's optimize your design
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our technology team to discuss your simulation and engineering needs
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Contact Technology Team
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

export default TechnologyServices;