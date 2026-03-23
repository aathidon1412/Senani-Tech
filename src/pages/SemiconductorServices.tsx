import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

import ateImg from "@/assets/semiconductor_services/ate_services.png";
import finalBoardImg from "@/assets/semiconductor_services/final_board.png";
import probeCardsImg from "@/assets/semiconductor_services/probe_cards.png";
import reliabilityImg from "@/assets/semiconductor_services/reliability_&_burn-in.png";
import icCharImg from "@/assets/semiconductor_services/ic_characterization.png";
import referenceImg from "@/assets/semiconductor_services/reference_design.png";
import turnkeyImg from "@/assets/semiconductor_services/turnkey_build.png";
import pcbImg from "@/assets/semiconductor_services/pcb.png";
import inventoryImg from "@/assets/semiconductor_services/inventory.png";
import kittingImg from "@/assets/semiconductor_services/kitting.png";
import shipmentImg from "@/assets/semiconductor_services/shipment.png";
import kitDocImg from "@/assets/semiconductor_services/kit_documentation.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "ate",           label: "ATE Services" },
  { id: "reliability",  label: "Reliability & Burn-in" },
  { id: "ic-char",      label: "IC Characterization" },
  { id: "reference",    label: "Reference Design" },
  { id: "turnkey",      label: "Turnkey Build & Kit" },
];

interface AccordionItem {
  title: string;
  intro: string;
  points: string[];
  image?: string;
}

interface Section {
  id: string;
  title: string;
  intro: string;
  image?: string;
  bullets?: string[];
  accordions?: AccordionItem[];
}

const sections: Section[] = [
  {
    id: "ate",
    title: "ATE Services",
    intro:
      "Through SenaniTech's ATE board development solutions, semiconductor manufacturers gain access to expertise and resources essential for designing, developing, and manufacturing top-tier ATE boards. These boards adhere to the rigorous standards of semiconductor testing, ensuring high quality and reliability. These solutions contribute to reliable, accurate and efficient testing processes, leading to improved quality control, increased productivity and reduced time-to-market for semiconductor devices. SenaniTech Specializes in ATE hardware, facilitating accurate testing and measurement of the Device under tests performance & functionality.",
    image: ateImg,
    bullets: [
      "Universal probe cards",
      "Device interface board",
      "Handler interface boards",
      "Load boards",
      "Probe interface boards",
      "Characterization boards",
    ],
    accordions: [
      {
        title: "Final Test Board",
        intro:
          "SenaniTech provides customized solutions designed to meet specific IC testing requirements, ensuring accurate and reliable interfacing between the device under test and automated test equipment.",
        points: [
          "Experience in all major ATE platforms – Teradyne, Advantest, Nextest, Chroma, NI & other platforms.",
          "Simulation Correlation - TDR Measurement on board to verify back drill stub effect.",
          "Decoupling Scheme Recommendation to meet transient current requirement.",
          "Power Integrity – IR Drop Optimization, Site to Site correlation.",
          "Step Drilling for Test Pogo vias, via modelling for high frequency, optimized pogo footprint.",
        ],
        image: finalBoardImg,
      },
      {
        title: "Probe Cards",
        intro:
          "SenaniTech offers advanced technology and design services to create precise and durable cards suitable for wafer-level testing, ensuring high-quality and efficient testing for semiconductor wafers before they are packaged.",
        points: [
          "Blind Vias for 20GHz to eliminate stub effect.",
          "Impedance optimization for BGA Vias, BGA Breakout region, Differential Via Modelling, Die pad optimizations.",
          "Hybrid PCB Stack up with Low Dk Material for High-Speed layers Megtron7, Megtron6, Rogers 4003C, Rogers 4350B etc.",
          "Max Layer Count – 82 Layers / PCB Size/Diameter – Up to 520 mm.",
        ],
        image: probeCardsImg,
      },
    ],
  },
  {
    id: "reliability",
    title: "Reliability & Burn-in Engineering",
    intro:
      "SenaniTech is a leading provider of specialized design and manufacturing services for a wide range of Reliability PCBs specifically tailored to meet the stringent requirements of semiconductor companies.",
    image: reliabilityImg,
    bullets: [
      "HTOL",
      "HAST/THB",
      "HBM/LU Boards",
      "MCC – LC2",
      "AEHR MAX 3",
      "REL INC",
      "Delta – V (PTC)",
      "Program Cards / Coupon Boards / Adapter Boards",
    ],
  },
  {
    id: "ic-char",
    title: "IC Characterization Board",
    intro:
      "At SenaniTech, we recognize the pivotal role that characterization boards play throughout the device development, testing and validation phases. Our hardware development platform for characterization facilitates crucial evaluations, including performance assessment, vital parameter measurement, calibration and IC validation. Leveraging our expertise in hardware design, signal and power integrity simulations, intricate PCB layout and high-quality PCBA, we serve as the ideal design partner for achieving successful IC development.",
    image: icCharImg,
    bullets: [
      "Requirement Analysis",
      "Hardware Design and Prototyping",
      "Signal Integrity and Performance Optimization",
      "Software Development and Integration",
      "Testing and Validation",
      "Documentation and Support",
    ],
  },
  {
    id: "reference",
    title: "Reference Design & Development",
    intro:
      "SenaniTech provides tailored IC Reference Kit development services designed to meet specific requirements. Through our expertise in customized IC Reference Kit development, semiconductor developers can accelerate the design process, validate performance and guarantee the quality of their integrated circuits. This results in faster time-to-market and increased competitiveness within the industry.",
    image: referenceImg,
    bullets: [
      "Requirement Analysis",
      "Hardware Design and Prototyping",
      "Signal Integrity and Performance Optimization",
      "Software Development and Integration",
      "Testing and Validation",
      "Documentation and Support",
    ],
  },
  {
    id: "turnkey",
    title: "Turnkey Build & Kit Development",
    intro:
      "SenaniTech's PCB turnkey build services, inclusive of kit development, deliver seamless solutions from initial concept to final delivery. We employ state-of-the-art PCB fabrication, precise assembly techniques, efficient inventory management, meticulous kitting, comprehensive test coverage and timely shipment. This ensures optimal execution of New Product Introduction projects (NPI) and small volume proto builds.",
    image: turnkeyImg,
    accordions: [
      {
        title: "PCB Assembly",
        intro: "Precise fabrication and assembly of printed circuit boards according to specified requirements.",
        points: [],
        image: pcbImg,
      },
      {
        title: "Inventory Management",
        intro: "Efficient tracking and management of electronic components, guaranteeing their availability throughout production.",
        points: [],
        image: inventoryImg,
      },
      {
        title: "Kitting",
        intro: "Methodical compilation of all essential components into organized kits, enhancing the efficiency of the assembly process.",
        points: [],
        image: kittingImg,
      },
      {
        title: "Shipment",
        intro: "Coordination of logistics to ensure timely delivery of kits to end-users or production facilities, optimizing project timelines.",
        points: [],
        image: shipmentImg,
      },
      {
        title: "Kit Documentation",
        intro: "Thorough documentation accompanying each kit, providing comprehensive guidance and reference for assembly and usage.",
        points: [],
        image: kitDocImg,
      },
    ],
  },
];

// ─── Sub-Service Card ─────────────────────────────────────────────────────────

function SubServiceCard({ item, index, isGrid }: { item: AccordionItem; index: number; isGrid?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col ${isGrid ? "h-full" : "md:flex-row h-full"}`}
    >
      {item.image && (
        <div className={`w-full flex items-center justify-center flex-shrink-0 relative overflow-hidden ${isGrid ? "h-[220px]" : "aspect-video md:aspect-auto md:w-2/5 lg:w-1/3 min-h-[200px]"}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain object-center transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
        <h4 className="text-xl font-display font-semibold text-foreground mb-3">
          {item.title}
        </h4>
        <p className="text-muted-foreground leading-relaxed mb-5">
          {item.intro}
        </p>
        {item.points && item.points.length > 0 && (
          <ul className="space-y-3 mt-auto">
            {item.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="leading-snug pt-0.5">{p}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

// ─── Content Panel ────────────────────────────────────────────────────────────

function ContentPanel({ section }: { section: Section }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      key={section.id}
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.32, ease: "easeInOut" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
          Semiconductor Services
        </span>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 leading-tight">
          {section.title}
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 mb-4 items-start">
          <p className="flex-1 text-muted-foreground leading-relaxed text-base md:text-lg">
            {section.intro}
          </p>
          {section.image && (
            <div className="w-full lg:w-5/12 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="w-full h-auto object-contain aspect-video lg:aspect-[4/3] max-h-[320px]" 
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Bullet list */}
      {section.bullets && section.bullets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 mb-8 shadow-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-wider text-primary">
            Key Capabilities
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {section.bullets.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {b}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Sub-Services Cards */}
      {section.accordions && section.accordions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-12 space-y-6"
        >
          <h3 className="font-display font-semibold text-foreground text-xl md:text-2xl mb-2">
            {section.id === "turnkey" ? "Key Elements" : "Sub-Services"}
          </h3>
          {section.id === "turnkey" ? (
            <div className="flex flex-wrap justify-center gap-6">
              {section.accordions.map((acc, i) => (
                <div key={acc.title} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <SubServiceCard item={acc} index={i} isGrid />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {section.accordions.map((acc, i) => (
                <SubServiceCard key={acc.title} item={acc} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      )}

    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SemiconductorServices = () => {
  const [activeId, setActiveId] = useState("ate");
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const activeSection = sections.find((s) => s.id === activeId)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-background to-background" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="container mx-auto px-4 relative mt-14">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full card text-sm text-muted-foreground mb-5">
                Semiconductor Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-5 leading-tight">
                <span className="gradient-text-bright">Semiconductor</span>{" "}
                Solutions
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Utilizing our semiconductor services enables our customers to tap into specialized
                expertise, cutting-edge manufacturing capabilities, and comprehensive support —
                accelerating product development and bringing innovative solutions to market.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="lg" className="gap-2">
                    Get a Quote <ArrowRight size={17} />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="lg">
                  Download Capabilities
                </Button>
              </div>
            </motion.div>

            {/* Stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-4 mt-12"
            >
              {[
                ["5+", "Service Verticals"],
                ["82", "Max PCB Layers"],
                ["20 GHz", "High-Speed Capability"],
                ["All Major", "ATE Platforms"],
              ].map(([val, label]) => (
                <div
                  key={label}
                  className="px-5 py-3 rounded-xl card text-center min-w-[110px]"
                >
                  <div className="text-xl font-display font-bold gradient-text-bright">{val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Two-column layout ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pt-16 md:pt-24 pb-28">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

            {/* ── SIDEBAR ── */}
            {/* Mobile: horizontal scrollable tabs */}
            <div className="w-full lg:hidden overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                      activeId === item.id
                        ? "bg-primary text-black border-primary"
                        : "bg-card text-muted-foreground border-border hover:bg-primary/10 hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: sticky vertical sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start">
              <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                <div className="px-4 py-3 border-b border-border/60 bg-muted/30">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Services
                  </p>
                </div>
                <nav className="p-2">
                  {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-all duration-200 group mb-0.5 ${
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                        }`}
                        style={{ transform: "scale(1)" }}
                        onMouseEnter={(e) =>
                          !isActive && ((e.currentTarget.style.transform = "scale(1.02)"))
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "scale(1)")
                        }
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.span
                            layoutId="sidebar-indicator"
                            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-primary"
                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                          />
                        )}
                        <span className="ml-1">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Sidebar footer CTA */}
                <div className="mx-3 mb-3 mt-1 p-3 rounded-lg bg-primary/5 border border-primary/15">
                  <p className="text-xs text-muted-foreground mb-2">
                    Need a custom solution?
                  </p>
                  <Link to="/contact">
                    <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                      Contact us <ArrowRight size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* ── CONTENT PANEL ── */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <ContentPanel key={activeId} section={activeSection} />
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Global CTA ────────────────────────────────────────── */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-5xl mx-auto rounded-3xl bg-primary/5 border border-primary/20 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10 shadow-sm relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Accelerate Your Development?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Get in touch with our team for a detailed consultation. See how our specialized semiconductor services and turnkey solutions can help you.
              </p>
            </div>
            <Link to="/contact" className="relative z-10 flex-shrink-0 w-full md:w-auto">
              <Button variant="hero" size="lg" className="w-full md:w-auto px-8 py-6 text-base gap-3 rounded-xl">
                Request a Quote <ArrowRight size={20} />
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