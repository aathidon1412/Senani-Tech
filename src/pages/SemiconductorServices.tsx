import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Cpu, 
  CircuitBoard, 
  Radio, 
  Zap, 
  ArrowRight,
  Check,
  Layers,
  Activity
} from "lucide-react";

const platforms = [
  "Teradyne", "Advantest", "Nextest", "Chroma", "National Instruments"
];

const hardwareTypes = [
  { name: "Universal Probe Cards", description: "Multi-site testing capability" },
  { name: "Handler Interface Boards", description: "Device handling integration" },
  { name: "DUT Boards", description: "Device under test interfaces" },
  { name: "Load Boards", description: "Power and signal routing" },
  { name: "Socket Boards", description: "IC socket integration" },
];

const probeCardSpecs = [
  { label: "Layer Count", value: "Up to 82 layers", icon: Layers },
  { label: "Frequency", value: "20 GHz capability", icon: Radio },
  { label: "Signal Integrity", value: "Advanced TDR analysis", icon: Activity },
];

const materials = [
  "Megtron 7", "Rogers 4003C", "Isola I-Tera", "Nelco N4000-13 EP"
];

const SemiconductorServices = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const ateRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const ateInView = useInView(ateRef, { once: true, margin: "-100px" });
  const probeInView = useInView(probeRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-6">
                Semiconductor Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Advanced <span className="gradient-text-bright">ATE Solutions</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Accelerated Development • Enhanced Quality • Reduced Costs
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg">
                    Get a Quote
                    <ArrowRight size={18} />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="lg">
                  Download Capabilities
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ATE Services */}
        <section ref={ateRef} className="py-24 bg-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={ateInView ? { opacity: 1, y: 0 } : {}}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                  ATE Hardware <span className="gradient-text-bright">Services</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  We deliver comprehensive Automatic Test Equipment hardware solutions
                  supporting all major semiconductor test platforms with industry-leading
                  turnaround times.
                </p>
                
                <div className="space-y-4">
                  {hardwareTypes.map((type, index) => (
                    <motion.div
                      key={type.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={ateInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl card"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Cpu size={20} className="text-highlight" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={ateInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-2xl card"
              >
                <h3 className="text-xl font-display font-semibold mb-6">
                  Supported Platforms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-4 py-2 rounded-lg bg-primary/20 text-foreground text-sm font-medium"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-semibold mb-4">Key Differentiators</h4>
                  <ul className="space-y-3">
                    {["Rapid turnaround times", "Signal integrity expertise", "Multi-platform experience", "Design for test optimization"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check size={16} className="text-highlight" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Probe Cards Section */}
        <section ref={probeRef} className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={probeInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Advanced <span className="gradient-text-bright">Probe Cards</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                High-performance probe card solutions for the most demanding wafer test applications
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {probeCardSpecs.map((spec, index) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={probeInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl card text-center group hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <spec.icon size={24} className="text-highlight" />
                  </div>
                  <div className="text-2xl font-display font-bold gradient-text-bright mb-1">
                    {spec.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{spec.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={probeInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-2xl card"
            >
              <h3 className="text-xl font-display font-semibold mb-6">
                Advanced Materials
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {materials.map((material) => (
                  <span
                    key={material}
                    className="px-4 py-2 rounded-lg bg-accent/20 text-foreground text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                We utilize the industry's most advanced substrate materials to ensure optimal
                signal integrity, thermal performance, and reliability for your most demanding applications.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Ready to accelerate your test development?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Contact our semiconductor team to discuss your ATE requirements
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Contact Semiconductor Team
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

export default SemiconductorServices;